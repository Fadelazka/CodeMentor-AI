"use client";

import { useSession } from "next-auth/react";
import { MessagesSquare, CheckCircle2, Code2, User, IdCard } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/ui/metric-card";
import { ProfileCard } from "@/components/profile/profile-card";

const FALLBACK = {
  name: "Fadhel Muhammad Azka Islamy",
  email: "fadhel@example.com",
  role: "Mahasiswa",
  nim: "V3925005",
  joinedAt: "27 Agustus 2026",
};

const STATS = [
  { label: "Total Chat", value: "1.247", icon: MessagesSquare, accent: "cyan" as const },
  { label: "Error Dipecahkan", value: "1.178", icon: CheckCircle2, accent: "green" as const },
  { label: "Bahasa Favorit", value: "Python", icon: Code2, accent: "violet" as const },
];

const DETAILS = [
  { label: "Nama Lengkap", value: FALLBACK.name },
  { label: "Email", value: FALLBACK.email },
  { label: "Role", value: FALLBACK.role },
  { label: "NIM", value: FALLBACK.nim },
  { label: "Bergabung", value: FALLBACK.joinedAt },
];

export default function ProfilPage() {
  const { data: session } = useSession();

  const name = session?.user?.name ?? FALLBACK.name;
  const email = session?.user?.email ?? FALLBACK.email;
  const role = (session?.user as { role?: string } | undefined)?.role ?? FALLBACK.role;

  const details = DETAILS.map((d) => {
    if (d.label === "Nama Lengkap") return { ...d, value: name };
    if (d.label === "Email") return { ...d, value: email };
    if (d.label === "Role") return { ...d, value: role };
    return d;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="// Profil"
        title="Profil Saya"
        description="Kelola informasi akun Anda"
      />

      <ProfileCard name={name} email={email} role={role} joinedAt={FALLBACK.joinedAt} />

      <GlassCard>
        <SectionLabel icon={IdCard}>Informasi Akun</SectionLabel>
        <dl className="divide-y divide-white/[0.06]">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {item.label}
              </dt>
              <dd className="text-sm text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </GlassCard>

      <div>
        <SectionLabel icon={User}>Statistik</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <MetricCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              accent={stat.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
