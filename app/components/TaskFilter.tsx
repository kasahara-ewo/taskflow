"use client";

import {
  FilterOptions,
  Priority,
  Status,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/app/types/task";

type Props = {
  filter: FilterOptions;
  onChange: (filter: FilterOptions) => void;
};

export default function TaskFilter({ filter, onChange }: Props) {
  const hasActiveFilter =
    (filter.status && filter.status !== "all") ||
    (filter.priority && filter.priority !== "all") ||
    (filter.searchQuery && filter.searchQuery.length > 0);

  const handleReset = () => {
    onChange({ status: "all", priority: "all", searchQuery: "" });
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={filter.searchQuery ?? ""}
            onChange={(e) =>
              onChange({ ...filter, searchQuery: e.target.value })
            }
            placeholder="🔍 タスクを検索..."
            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              ステータス
            </label>
            <select
              value={filter.status ?? "all"}
              onChange={(e) =>
                onChange({
                  ...filter,
                  status: e.target.value as Status | "all",
                })
              }
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            >
              <option value="all">すべて</option>
              {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              優先度
            </label>
            <select
              value={filter.priority ?? "all"}
              onChange={(e) =>
                onChange({
                  ...filter,
                  priority: e.target.value as Priority | "all",
                })
              }
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            >
              <option value="all">すべて</option>
              {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap"
            >
              ✕ クリア
            </button>
          )}
        </div>
      </div>
    </section>
  );
}