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

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

export function UsageChart({ data }: { data: { tanggal: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#33415533" vertical={false} />
        <XAxis
          dataKey="tanggal"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={{ stroke: "#33415555" }}
          tickLine={false}
        />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: 8,
            color: "#e2e8f0",
            fontSize: 12,
          }}
          cursor={{ fill: "#33415522" }}
        />
        <Bar dataKey="jumlah" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Pertanyaan" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LanguagePieChart({ data }: { data: { bahasa: string; persen: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="persen"
          nameKey="bahasa"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: 8,
            color: "#e2e8f0",
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ErrorBarChart({ data }: { data: { code: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#33415533" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="code"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={100}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: 8,
            color: "#e2e8f0",
            fontSize: 12,
          }}
          cursor={{ fill: "#33415522" }}
        />
        <Bar dataKey="jumlah" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Jumlah" maxBarSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}