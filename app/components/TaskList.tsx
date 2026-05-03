"use client";

import { useState } from "react";
import {
  Task,
  Status,
  Priority,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/app/types/task";
import { formatDate, formatDateTime, isOverdue, isDueToday } from "@/app/lib/utils";

type Props = {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
};

export default function TaskList({
  tasks,
  onUpdate,
  onDelete,
  onStatusChange,
}: Props) {
  if (tasks.length === 0) {
    return (
      <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center shadow-sm">
        <div className="text-6xl mb-3">📋</div>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          タスクがありません
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
          上のフォームから新しいタスクを追加してみましょう
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

function TaskItem({
  task,
  onUpdate,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description ?? "");
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? formatDate(task.dueDate) : ""
  );

  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ? formatDate(task.dueDate) : "");
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`「${task.title}」を削除しますか？`)) {
      onDelete(task.id);
    }
  };

  // 優先度バッジの色
  const priorityColor: Record<Priority, string> = {
    high: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    medium: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    low: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
  };

  // ステータスバッジの色
  const statusColor: Record<Status, string> = {
    todo: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    in_progress: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    done: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-blue-500 p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="詳細メモ"
            rows={2}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                <option key={p} value={p}>
                  優先度: {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${
        task.status === "done"
          ? "border-zinc-200 dark:border-zinc-800 opacity-60"
          : overdue
          ? "border-red-300 dark:border-red-800"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() =>
            onStatusChange(
              task.id,
              task.status === "done" ? "todo" : "done"
            )
          }
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            task.status === "done"
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-zinc-300 dark:border-zinc-600 hover:border-emerald-500"
          }`}
          aria-label="完了切替"
        >
          {task.status === "done" && (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-medium leading-snug break-words ${
                task.status === "done" ? "line-through text-zinc-500" : ""
              }`}
            >
              {task.title}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                aria-label="編集"
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                aria-label="削除"
              >
                🗑️
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 whitespace-pre-wrap break-words">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <select
              value={task.status}
              onChange={(e) =>
                onStatusChange(task.id, e.target.value as Status)
              }
              className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColor[task.status]}`}
            >
              {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>

            <span
              className={`text-xs font-medium px-2 py-1 rounded-md border ${priorityColor[task.priority]}`}
            >
              優先度: {PRIORITY_LABELS[task.priority]}
            </span>

            {task.dueDate && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  overdue
                    ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                    : dueToday
                    ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                📅 {formatDate(task.dueDate)}
                {overdue && " (期限超過)"}
                {dueToday && " (今日)"}
              </span>
            )}

            <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">
              {formatDateTime(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}