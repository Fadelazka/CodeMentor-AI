"use client";
import { useEffect, useState } from "react";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";
      

import { useSession } from "next-auth/react";
import { MessagesSquare, CheckCircle2, User, IdCard } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/ui/metric-card";
import { ProfileCard } from "@/components/profile/profile-card";
import { formatDateShort } from "@/lib/utils";
import {
  PythonLogo,
  JavaScriptLogo,
  JavaLogo,
  CppLogo,
  PhpLogo,
} from "@/components/knowledge-base/language-logos";

const FALLBACK = {
  name: "Fadhel Muhammad Azka Islamy",
  email: "fadhel@example.com",
  role: "Mahasiswa",
  joinedAt: "27 Agustus 2026",
};

const LANG_META: Record<string, { label: string; Logo: React.ComponentType<{ className?: string }> }> = {
  python: { label: "Python", Logo: PythonLogo },
  javascript: { label: "JavaScript", Logo: JavaScriptLogo },
  java: { label: "Java", Logo: JavaLogo },
  cpp: { label: "C++", Logo: CppLogo },
  php: { label: "PHP", Logo: PhpLogo },
};

const DETAILS = [
  { label: "Nama Lengkap", value: FALLBACK.name },
  { label: "Email", value: FALLBACK.email },
  { label: "Role", value: FALLBACK.role },
  { label: "NIM", value: "-" },
  { label: "Bergabung", value: FALLBACK.joinedAt },
];

export default function ProfilPage() { const [isEditOpen, setIsEditOpen] = useState(false);
  const { data: session } = useSession();
  const [stats, setStats] = useState<{ totalQuestions?: number; errorsSolved?: number } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setStats({ totalQuestions: 0, errorsSolved: 0 }));
  }, []);

  const name = session?.user?.name ?? FALLBACK.name;
  const email = session?.user?.email ?? FALLBACK.email;
  const role = (session?.user as { role?: string } | undefined)?.role ?? FALLBACK.role;
  const nim = (session?.user as { nim?: string } | undefined)?.nim ?? "";
  const image = session?.user?.image ?? "";
  const favoriteLanguage = (session?.user as { favoriteLanguage?: string } | undefined)?.favoriteLanguage ?? "";
  const createdAt = (session?.user as { createdAt?: string } | undefined)?.createdAt ?? null;
  const joinedAt = createdAt ? formatDateShort(createdAt) : FALLBACK.joinedAt;
  const favMeta = favoriteLanguage ? LANG_META[favoriteLanguage] : undefined;

  const details = DETAILS.map((d) => {
    if (d.label === "Nama Lengkap") return { ...d, value: name };
    if (d.label === "Email") return { ...d, value: email };
    if (d.label === "Role") return { ...d, value: role };
    if (d.label === "NIM") return { ...d, value: nim || "-" };
    if (d.label === "Bergabung") return { ...d, value: joinedAt };
    return d;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="// Profil"
        title="Profil Saya"
        description="Kelola informasi akun Anda"
      />

      <ProfileCard name={name} email={email} role={role} image={image} joinedAt={joinedAt} onEdit={() => setIsEditOpen(true)} />

      <GlassCard>
        <SectionLabel icon={IdCard}>Informasi Akun</SectionLabel>
        <dl className="divide-y divide-slate-200 dark:divide-slate-800">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </GlassCard>

      <div>
        <SectionLabel icon={User}>Statistik</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Total Chat"
            value={String(stats?.totalQuestions ?? 0)}
            icon={MessagesSquare}
            accent="cyan"
          />
          <MetricCard
            label="Error Dipecahkan"
            value={String(stats?.errorsSolved ?? 0)}
            icon={CheckCircle2}
            accent="green"
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">Bahasa Favorit</p>
            <div className="mt-3 flex items-center gap-2">
              {favMeta ? (
                <>
                  <favMeta.Logo className="w-6 h-6" />
                  <span className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{favMeta.label}</span>
                </>
              ) : (
                <span className="font-display text-3xl font-bold tracking-tight text-slate-400 dark:text-white/40">-</span>
              )}
            </div>
            {!favMeta && <p className="mt-1 text-[11px] text-slate-500 dark:text-white/40">Belum dipilih</p>}
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={{
          name: name || '',
          email: email || '',
          nim: nim || '',
          image: image || '',
          favoriteLanguage: favoriteLanguage || '',
        }}
      />
    </div>
  );
}










