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
  Area,
  AreaChart,
} from "recharts";

// Brand colors per language (order matches dashboardStats.bahasaTerbanyak)
const PIE_COLORS = ["#FF3B6B", "#F7DF1E", "#EA2D2E", "#00599C", "#FF6B35"];

const axisTick = { fill: "#71717A", fontSize: 10, fontFamily: "monospace" };

const tooltipStyle = {
  background: "rgba(15,20,51,0.96)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 12,
  fontFamily: "monospace",
};

export function UsageChart({ data }: { data: { tanggal: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3B6B" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#FF3B6B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="tanggal" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.12)", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="jumlah"
          stroke="#FF3B6B"
          strokeWidth={2}
          fill="url(#usageFill)"
          name="Pertanyaan"
          dot={false}
          activeDot={{ r: 4, fill: "#FF3B6B", stroke: "#05060A", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LanguagePieChart({ data }: { data: { bahasa: string; persen: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="persen"
          nameKey="bahasa"
          innerRadius={54}
          outerRadius={84}
          paddingAngle={2}
          stroke="#05060A"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "monospace", color: "#A1A1AA" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ErrorBarChart({ data }: { data: { code: string; jumlah: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 24, left: 48, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
        <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="code" tick={axisTick} axisLine={false} tickLine={false} width={96} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar
          dataKey="jumlah"
          fill="#FF3B6B"
          fillOpacity={0.65}
          radius={[0, 6, 6, 0]}
          name="Jumlah"
          maxBarSize={16}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
