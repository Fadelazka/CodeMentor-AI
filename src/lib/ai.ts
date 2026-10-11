import { prisma } from "@/lib/prisma";

export interface RagContext {
  errorCode?: string;
  language: string;
  matches: Array<{ id: string; errorCode: string; title: string; description: string; solution: string }>;
}

export async function retrieveRelevantErrors(language: string, query: string) {
  try {
    const kbEntries = await prisma.knowledgeBase.findMany({
      where: { language, isActive: true },
      take: 20,
    });

    const normalizedQuery = query.toLowerCase();

    const scored = kbEntries
      .map((entry) => {
        let score = 0;
        const haystack = `${entry.errorCode} ${entry.title} ${entry.description} ${entry.tags.join(" ")}`.toLowerCase();

        if (entry.errorCode.toLowerCase() && normalizedQuery.includes(entry.errorCode.toLowerCase()))
          score += 50;

        const qWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);
        for (const word of qWords) {
          if (haystack.includes(word)) score += 10;
        }
        if (haystack.includes("error") && normalizedQuery.includes("error")) score += 5;

        return { ...entry, score };
      })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return scored;
  } catch {
    return [];
  }
}

/**
 * Daftar model Groq yang dicoba berurutan. Groq rutin menonaktifkan model,
 * jadi kita tidak pernah mematok satu model tanpa fallback.
 */
const GROQ_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.3-70b-versatile"];

type FallbackReason = "no-key" | "unauthorized" | "api-error";

export async function generateExplainationWithGroq(payload: {
  language: string;
  sourceCode: string;
  errorMessage?: string;
  ragContext: RagContext;
}) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      explanation: buildFallbackExplanation(payload, "no-key"),
      confidence: 80,
      mock: true,
    };
  }

  const contextPrompt = payload.ragContext.matches
    .map(
      (m) =>
        `- Error: ${m.errorCode}\n  Judul: ${m.title}\n  Deskripsi: ${m.description}\n  Solusi: ${m.solution}`
    )
    .join("\n\n");

  const systemPrompt = `Kamu adalah CodeMentor AI, asisten mentor pemrograman untuk mahasiswa Indonesia.
Selalu jawab dalam Bahasa Indonesia dengan bahasa yang mudah dipahami.
Jelaskan: (1) penyebab error, (2) cara memperbaiki, (3) contoh kode yang benar, (4) materi rekomendasi.
Gunakan format Markdown. Akhiri dengan bagian "Confidence" berupa persentase (0-100).
Jika ada konteks knowledge base, prioritaskan jawaban berdasarkan itu.`;

  const userPrompt = `Bahasa pemrograman: ${payload.language}
Kode sumber:
\`\`\`${payload.language}
${payload.sourceCode}
\`\`\`
Pesan error (jika ada): ${payload.errorMessage ?? "Tidak ada, silakan analisis"}.

Konteks knowledge base yang relevan:
${contextPrompt || "Tidak ada konteks tambahan."}`;

  let lastStatus = 0;

  for (const model of GROQ_MODELS) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 1200,
        }),
      });

      if (!res.ok) {
        lastStatus = res.status;
        const errBody = await res.text().catch(() => "");
        console.error(`[ai] Groq model "${model}" gagal (HTTP ${res.status}): ${errBody.slice(0, 300)}`);
        continue;
      }

      const data = await res.json();
      const explanation: string | undefined = data.choices?.[0]?.message?.content;
      if (!explanation) {
        console.error(`[ai] Groq model "${model}" mengembalikan respons kosong.`);
        continue;
      }

      const confidenceMatch = explanation.match(/Confidence[:：]\s*(\d{1,3})%?/i);
      const confidence = confidenceMatch ? Math.min(100, parseInt(confidenceMatch[1], 10)) : 85;

      return { explanation, confidence, mock: false };
    } catch (err) {
      console.error(`[ai] Groq model "${model}" error:`, err);
    }
  }

  const reason: FallbackReason = lastStatus === 401 ? "unauthorized" : "api-error";
  return { explanation: buildFallbackExplanation(payload, reason), confidence: 80, mock: true };
}

function buildFallbackExplanation(
  payload: {
    language: string;
    sourceCode: string;
    errorMessage?: string;
    ragContext: RagContext;
  },
  reason: FallbackReason
): string {
  const note =
    reason === "no-key"
      ? "*(Jawaban ini dihasilkan dari knowledge base karena kunci API Groq belum dikonfigurasi. Konfigurasi `GROQ_API_KEY` di `.env.local` untuk jawaban AI penuh.)*"
      : reason === "unauthorized"
        ? "*(API Groq menolak permintaan: `GROQ_API_KEY` tidak valid / kedaluwarsa (401 Unauthorized). Buat kunci baru di https://console.groq.com/keys lalu perbarui `.env.local`, kemudian restart dev server.)*"
        : "*(Jawaban ini dihasilkan dari knowledge base karena panggilan ke API Groq gagal. Periksa log server untuk detail.)*";

  const top = payload.ragContext.matches[0];
  if (top) {
    return `## Error: ${top.errorCode}\n\n**Judul:** ${top.title}\n\n**Deskripsi:**\n${top.description}\n\n**Cara memperbaiki:**\n${top.solution}\n\n${note}\n\n**Confidence:** 80%`;
  }

  const errorMatch = payload.sourceCode.match(/Error[:\n].{0,80}/i);
  const guessError = errorMatch?.[0] ?? payload.errorMessage ?? "Error yang dikenal";

  return `## Analisis Error\n\n**Penyebab:**\n\nTerjadi kesalahan yang tampaknya berkaitan dengan "${guessError}". Analisis lengkap memerlukan koneksi ke API Groq atau pencocokan dengan knowledge base.\n\n**Langkah debugging:**\n1. Baca pesan error dari baris paling bawah stack trace.\n2. Periksa variabel yang terlibat di baris tersebut.\n3. Validasi input sebelum digunakan dalam operasi.\n\n${note}\n\n**Confidence:** 80%`;
}
