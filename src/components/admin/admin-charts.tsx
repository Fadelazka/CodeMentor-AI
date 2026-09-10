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
  backgroundColor: "#1e293b",
  border: "none",
  borderRadius: 8,
  color: "#e2e8f0",
  fontSize: 12,
};

export function AdminUsageTrendChart({ data }: { data: { bulan: string; permintaan: number; unik: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#33415533" vertical={false} />
        <XAxis dataKey="bulan" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="permintaan" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Total Permintaan" />
        <Line type="monotone" dataKey="unik" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} name="Pengguna Aktif" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AdminPerformanceChart({ data }: { data: { label: string; nilai: number; target: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#33415533" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#33415522" }} />
        <Bar dataKey="nilai" fill="#10b981" radius={[4, 4, 0, 0]} name="Nilai aktual" maxBarSize={32} />
        <Bar dataKey="target" fill="#33415566" radius={[4, 4, 0, 0]} name="Target" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}