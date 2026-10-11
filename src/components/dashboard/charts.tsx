"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0A0A0A", "#6B6B6B", "#A0A0A0", "#D5D5D0", "#E5484D"];
const COLORS_DARK = ["#FAFAF7", "#888888", "#666666", "#444444", "#E5484D"];

function useIsDark() {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function UsageChart({ data }: { data: { tanggal: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D5D5D022" vertical={false} />
        <XAxis dataKey="tanggal" tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "#0A0A0A",
            border: "none",
            borderRadius: 2,
            color: "#FAFAF7",
            fontSize: 12,
            fontFamily: "monospace",
          }}
          cursor={{ fill: "#D5D5D011" }}
        />
        <Bar dataKey="jumlah" fill="#0A0A0A" radius={[2, 2, 0, 0]} name="Pertanyaan" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LanguagePieChart({ data }: { data: { bahasa: string; persen: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="persen" nameKey="bahasa" innerRadius={50} outerRadius={80} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#0A0A0A",
            border: "none",
            borderRadius: 2,
            color: "#FAFAF7",
            fontSize: 12,
            fontFamily: "monospace",
          }}
        />
        <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ErrorBarChart({ data }: { data: { code: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D5D5D022" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="code" tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} width={100} />
        <Tooltip
          contentStyle={{
            background: "#0A0A0A",
            border: "none",
            borderRadius: 2,
            color: "#FAFAF7",
            fontSize: 12,
            fontFamily: "monospace",
          }}
          cursor={{ fill: "#D5D5D011" }}
        />
        <Bar dataKey="jumlah" fill="#E5484D" radius={[0, 2, 2, 0]} name="Jumlah" maxBarSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}