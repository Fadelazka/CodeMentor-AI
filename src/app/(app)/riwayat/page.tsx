"use client";

import { useState } from "react";
import { Search, History, Filter, Download, Eye, Trash2 } from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { mockChatResponses } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getLanguageLabel, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function RiwayatPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [rows, setRows] = useState(mockChatResponses);

  const filtered = rows.filter((r) => {
    const matchSearch =
      r.errorCode.toLowerCase().includes(search.toLowerCase()) ||
      r.sourceCode.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === "all" || r.language === langFilter;
    return matchSearch && matchLang;
  });

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Riwayat dihapus.");
  };

  return (
    <div className="lg:pl-60">
      <div className="container-editorial py-8 lg:py-10">
        <div className="mb-8">
          <Eyebrow index="//" label="RIWAYAT" className="mb-3" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Riwayat Analisis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Semua error yang pernah Anda tanyakan, tersimpan rapi untuk dipelajari kembali.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_200px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari error, atau kata kunci dalam kode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            options={[
              { value: "all", label: "Semua Bahasa" },
              { value: "python", label: "Python" },
              { value: "javascript", label: "JavaScript" },
              { value: "java", label: "Java" },
              { value: "cpp", label: "C++" },
              { value: "php", label: "PHP" },
            ]}
          />
          <Button variant="outline">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <History className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="font-display font-semibold text-foreground">Belum ada riwayat</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Coba tanyakan error pertama Anda di halaman Chat AI.
              </p>
            </Card>
          )}

          {filtered.map((r) => (
            <Card key={r.id} className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{getLanguageLabel(r.language)}</Badge>
                    <Badge variant="danger">{r.errorCode}</Badge>
                    {r.confidence && (
                      <Badge variant={r.confidence >= 85 ? "success" : "warning"}>
                        Confidence: {r.confidence}%
                      </Badge>
                    )}
                    {r.feedback && (
                      <Badge variant={r.feedback === "helpful" ? "success" : "danger"}>
                        {r.feedback === "helpful" ? "✓ Bermanfaat" : "✗ Tidak membantu"}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
                  </div>
                  <p className="mb-3 line-clamp-2 font-mono text-xs leading-relaxed text-muted-foreground">
                    {r.sourceCode}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {r.aiResponse.slice(0, 200)}...
                  </p>
                </div>
                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <Button size="sm" variant="outline" onClick={() => toast("Buka detail analisis (demo).")}>
                    <Eye className="h-3.5 w-3.5" /> Detail
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success("Riwayat diekspor (demo).")}>
                    <Download className="h-3.5 w-3.5" /> Ekspor
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(r.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Hapus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {rows.length > 0 && filtered.length > 0 && (
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="text-muted-foreground">
              Menampilkan {filtered.length} dari {rows.length} riwayat
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline" size="sm" disabled>
                Berikutnya
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}