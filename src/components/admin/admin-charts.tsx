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

const axisTick = { fill: "#71717A", fontSize: 10, fontFamily: "monospace" };

const tooltipStyle = {
  background: "rgba(15,20,51,0.96)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 12,
  fontFamily: "monospace",
};

export function AdminUsageTrendChart({
  data,
}: {
  data: { bulan: string; permintaan: number; unik: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="bulan" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.12)" }} />
        <Line
          type="monotone"
          dataKey="permintaan"
          stroke="#FF3B6B"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#FF3B6B", stroke: "#05060A", strokeWidth: 2 }}
          name="Total Permintaan"
        />
        <Line
          type="monotone"
          dataKey="unik"
          stroke="#FF6B35"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#FF6B35", stroke: "#05060A", strokeWidth: 2 }}
          name="Pengguna Aktif"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AdminPerformanceChart({
  data,
}: {
  data: { label: string; nilai: number; target: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="adminNilai" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3B6B" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#FF3B6B" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="nilai" fill="url(#adminNilai)" radius={[6, 6, 0, 0]} name="Nilai aktual" maxBarSize={32} />
        <Bar dataKey="target" fill="rgba(255,255,255,0.10)" radius={[6, 6, 0, 0]} name="Target" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
