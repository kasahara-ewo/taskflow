"use client";

import { useEffect, useState } from "react";

type Stats = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
};

type Props = {
  stats: Stats;
};

export default function Header({ stats }: Props) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // マウント時にローカルストレージとシステム設定からテーマを読み込み
  useEffect(() => {
    const saved = localStorage.getItem("taskflow:theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("taskflow:theme", next ? "dark" : "light");
  };

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              ✓ TaskFlow
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              シンプルなタスク管理アプリ
            </p>
          </div>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="テーマ切り替え"
              type="button"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <StatCard label="全体" value={stats.total} color="zinc" />
          <StatCard label="未着手" value={stats.todo} color="slate" />
          <StatCard label="進行中" value={stats.inProgress} color="blue" />
          <StatCard label="完了" value={stats.done} color="emerald" />
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "zinc" | "slate" | "blue" | "emerald";
}) {
  const colorClasses = {
    zinc: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <div className={`rounded-lg px-3 py-2 ${colorClasses[color]}`}>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="text-xl sm:text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}