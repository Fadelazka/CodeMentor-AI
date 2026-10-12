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

// Brand colors per language
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

// Generate empty 14-day data with all zeros
function generateEmptyDailyData() {
  const data = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      tanggal: `${d.getDate()} ${d.toLocaleString("id-ID", { month: "short" })}`,
      jumlah: 0,
    });
  }
  return data;
}

// Generate empty language data
function generateEmptyLanguageData() {
  return [{ language: "Belum ada data", count: 1, color: "#3F3F46" }];
}

export function UsageChart({ data }: { data: { tanggal: string; jumlah: number }[] }) {
  // Always render chart - generate empty data if needed
  const chartData = (data && data.length > 0 && data.some(d => d.jumlah > 0))
    ? data
    : generateEmptyDailyData();

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">
            Penggunaan 14 Hari Terakhir
          </h3>
          <p className="text-xs text-zinc-500">
            Banyaknya pertanyaan yang dikirim
          </p>
        </div>
        <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
          +0%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF3B6B" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#FF3B6B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="tanggal" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} domain={[0, "auto"]} />
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
    </div>
  );
}

export function LanguagePieChart({ data }: { data: { bahasa: string; persen: number }[] }) {
  const chartData = (data && data.length > 0 && data.some(d => d.persen > 0))
    ? data
    : [{ language: "Belum ada data", persen: 1, color: "#3F3F46" }];

  const isPlaceholder = !data || data.length === 0 || data.every(d => d.persen === 0);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-sm font-semibold text-white mb-1">
        Bahasa yang Digunakan
      </h3>
      <p className="text-xs text-zinc-500 mb-6">
        Distribusi penggunaan
      </p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="persen"
              nameKey="bahasa"
              innerRadius={60}
              outerRadius={84}
              paddingAngle={isPlaceholder ? 0 : 2}
              stroke="none"
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={isPlaceholder ? "#3F3F46" : PIE_COLORS[i % PIE_COLORS.length]}
                  opacity={isPlaceholder ? 0.5 : 1}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-zinc-500">
            {isPlaceholder ? "0 chat" : ""}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {isPlaceholder ? (
          <span className="text-xs text-zinc-500">Belum ada data</span>
        ) : (
          data.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
              <span className="text-xs text-zinc-400">{item.bahasa}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ErrorBarChart({ data }: { data: { code: string; jumlah: number }[] }) {
  const chartData = (data && data.length > 0 && data.some(d => d.jumlah > 0))
    ? data
    : [
      { code: "—", jumlah: 0 },
      { code: "—", jumlah: 0 },
      { code: "—", jumlah: 0 },
    ];

  const isPlaceholder = !data || data.length === 0 || data.every(d => d.jumlah === 0);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-sm font-semibold text-white mb-1">
        Error Paling Sering
      </h3>
      <p className="text-xs text-zinc-500 mb-6">
        Error yang paling banyak dikonsultasikan
      </p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 24, left: 48, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
          <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} domain={[0, "auto"]} />
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

      {isPlaceholder && (
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-6 h-6 rounded bg-white/[0.04]" />
              <div className="flex-1">
                <div className="h-3 w-32 bg-white/[0.04] rounded mb-2" />
                <div className="h-2 w-full bg-white/[0.04] rounded" />
              </div>
              <div className="w-12 h-3 bg-white/[0.04] rounded" />
            </div>
          ))}
          <p className="text-xs text-zinc-600 text-center pt-2">
            Belum ada error tercatat
          </p>
        </div>
      )}
    </div>
  );
}