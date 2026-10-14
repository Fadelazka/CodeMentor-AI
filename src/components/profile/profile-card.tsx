"use client";

import { UserCog } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";

interface ProfileCardProps {
  name: string;
  email: string;
  joinedAt: string;
  role?: string;
  image?: string;
  onEdit?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function ProfileCard({ name, email, joinedAt, role, image, onEdit }: ProfileCardProps) {
  return (
    <GlassCard>
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] p-[2px]">
          <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#05060A] font-display text-2xl font-bold text-white">
            {image ? (
              <Image src={image} alt={name} width={80} height={80} unoptimized className="h-full w-full object-cover" />
            ) : (
              getInitials(name)
            )}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-lg font-semibold tracking-tight text-white">
            {name}
          </h2>
          <p className="truncate text-sm text-zinc-400">{email}</p>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {role && (
              <span className="rounded-full border border-neon-red/25 bg-neon-red/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neon-red">
                {role}
              </span>
            )}
            <span className="font-mono text-[11px] text-zinc-500">Member sejak {joinedAt}</span>
          </div>
        </div>

        <span className="inline-flex">
          <GradientButton variant="outline" icon={UserCog} onClick={onEdit}>
            Edit Profil
          </GradientButton>
        </span>
      </div>
    </GlassCard>
  );
}
