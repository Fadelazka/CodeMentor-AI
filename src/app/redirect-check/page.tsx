"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function RedirectCheckPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/masuk");
      return;
    }

    const role = session?.user?.role;
    router.replace(role === "ADMIN" ? "/dashboard" : "/chat");
  }, [status, session, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-muted-foreground">Menyiapkan sesi Anda...</p>
    </div>
  );
}
