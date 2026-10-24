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
  aiLanguage?: "id" | "en";
  aiDetailLevel?: "brief" | "medium" | "detailed";
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

  const lang = payload.aiLanguage ?? "id";
  const detail = payload.aiDetailLevel ?? "medium";

  const langInstruction =
    lang === "en"
      ? "Always respond in English with clear explanations."
      : "Selalu jawab dalam Bahasa Indonesia dengan bahasa yang mudah dipahami untuk mahasiswa.";

  const detailInstruction: Record<string, string> = {
    brief:
      lang === "en"
        ? "Keep explanations concise and to the point (1-2 paragraphs at most). Focus on the fix."
        : "Jelaskan secara singkat (maksimal 1-2 paragraf) dan fokus ke solusi.",
    medium:
      lang === "en"
        ? "Provide balanced explanation: cause, fix, corrected code if needed, short recommendation."
        : "Berikan penjelasan seimbang: penyebab, solusi, kode perbaikan jika ada, rekomendasi singkat.",
    detailed:
      lang === "en"
        ? "Provide detailed explanation: root cause, step-by-step fix, complete corrected code, related concepts, and safe runnable example."
        : "Berikan penjelasan lengkap: penyebab mendalam, langkah perbaikan, kode perbaikan LENGKAP, konsep terkait, contoh siap jalan.",
  };

  // Instruksi tambahan berdasarkan preferensi AI user (hasil kuis onboarding / pengaturan).
  // brief  -> jawaban singkat & to-the-point
  // medium -> seimbang
  // detailed -> sangat detail, komprehensif, dan edukatif
  const preferenceNote =
    detail === "brief"
      ? lang === "en"
        ? "Provide a very short, to-the-point answer."
        : "Berikan jawaban yang sangat singkat dan to-the-point."
      : detail === "detailed"
        ? lang === "en"
          ? "Provide a very detailed, comprehensive, and educational explanation."
          : "Berikan penjelasan yang sangat detail, komprehensif, dan edukatif."
        : lang === "en"
          ? "Provide a balanced, easy-to-understand explanation."
          : "Berikan penjelasan yang seimbang dan mudah dipahami.";

  const sectionsEn = `IF CODE IS CORRECT (no error):
Only reply with:

✅ CODE IS CORRECT

[2-3 sentences explaining why.]

Do NOT show "Broken Code", "Corrected Code", or "Recommended Materials".

IF CODE IS WRONG (has error):
Use this exact format:

## Explanation of the Error
[Explain the cause clearly]

## Problematic Code
\`\`\`${payload.language}
[original broken code]
\`\`\`

## Corrected Code
\`\`\`${payload.language}
[complete, corrected, runnable code]
\`\`\`

## Recommended Materials
[Relevant concepts to learn]

IMPORTANT:
- Include "## Corrected Code" when code is wrong.
- Use the same programming language as the user's code (${payload.language}).
- Prioritize knowledge base context when available.
- End with "**Confidence:** <number>%".`;

  const sectionsId = `JIKA KODE SUDAH BENAR (tidak ada error):
Balas HANYA dengan format berikut:

✅ KODE INI SUDAH BENAR 100%

[Penjelasan 2-3 kalimat kenapa kode ini benar dan berjalan sesuai harapan.]

JANGAN tampilkan section "Kode yang Bermasalah".
JANGAN tampilkan section "Kode yang Sudah Dibenarkan".
JANGAN tampilkan section "Materi Rekomendasi".

JIKA KODE SALAH (ada error):
Gunakan format lengkap berikut secara persis:

## Penjelasan Error
[Jelaskan penyebab error secara singkat dan jelas]

## Kode yang Bermasalah
\`\`\`${payload.language}
[kode asli user yang bermasalah]
\`\`\`

## Kode yang Sudah Dibenarkan
\`\`\`${payload.language}
[kode yang sudah diperbaiki secara LENGKAP dan siap di-copy-paste]
\`\`\`

## Materi Rekomendasi
[Konsep atau materi yang perlu dipelajari]

ATURAN PENTING:
- Bagian "## Kode yang Sudah Dibenarkan" WAJIB SELALU ADA untuk kode yang salah.
- Kode yang sudah dibenarkan harus lengkap, benar, dan langsung siap dijalankan.
- Selalu gunakan bahasa pemrograman yang sama dengan kode user (${payload.language}).
- Prioritaskan jawaban berdasarkan konteks knowledge base bila tersedia.
- Akhiri jawaban dengan baris "**Confidence:** <angka>%".

ATURAN PANJANG JAWABAN (SANGAT PENTING):
- Jika kode user panjang atau errornya banyak (lebih dari 3), RINGKAS bagian "## Penjelasan Error" menjadi maksimal 5 poin singkat.
- JANGAN pernah memotong bagian "## Kode yang Sudah Dibenarkan". Utamakan menulis kode perbaikan LENGKAP daripada penjelasan panjang.
- Tulis heading persis seperti ini (jangan diganti, jangan diterjemahkan, jangan ditambah kata lain):
  "## Kode yang Sudah Dibenarkan"
- Posisi blok kode perbaikan HARUS di akhir jawaban, tepat sebelum baris "**Confidence:**".`;

  const systemPrompt = `Kamu adalah CodeMentor AI, asisten debugging kode.
${langInstruction}
${detailInstruction[detail]}
${preferenceNote}

${lang === "en" ? sectionsEn : sectionsId}`;

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
      const isOssModel = model.startsWith("openai/gpt-oss");
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
          // Batas lama (1200) membuat jawaban terpotong sebelum blok kode
          // perbaikan selesai ditulis. Naikkan agar kode panjang tetap utuh.
          ...(isOssModel
            ? { max_completion_tokens: 4096 }
            : { max_tokens: 4096 }),
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

      console.log(`[ai] Groq model "${model}" OK usage=${JSON.stringify(data.usage ?? {})}`);

      const confidenceMatch = explanation.match(/Confidence\D{0,12}?(\d{1,3})\s*%/i);
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
