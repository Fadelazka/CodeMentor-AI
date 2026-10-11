"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "#0A0A0A",
  border: "none",
  borderRadius: 2,
  color: "#FAFAF7",
  fontSize: 12,
  fontFamily: "monospace",
};

export function AdminUsageTrendChart({ data }: { data: { bulan: string; permintaan: number; unik: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D5D5D022" vertical={false} />
        <XAxis dataKey="bulan" tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="permintaan" stroke="#0A0A0A" strokeWidth={2.5} dot={{ r: 3 }} name="Total Permintaan" />
        <Line type="monotone" dataKey="unik" stroke="#E5484D" strokeWidth={2.5} dot={{ r: 3 }} name="Pengguna Aktif" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AdminPerformanceChart({ data }: { data: { label: string; nilai: number; target: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D5D5D022" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#888888", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#D5D5D011" }} />
        <Bar dataKey="nilai" fill="#E5484D" radius={[2, 2, 0, 0]} name="Nilai aktual" maxBarSize={32} />
        <Bar dataKey="target" fill="#888888" radius={[2, 2, 0, 0]} name="Target" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}