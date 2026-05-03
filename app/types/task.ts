/**
 * タスクの優先度
 */
export type Priority = "high" | "medium" | "low";

/**
 * タスクのステータス
 */
export type Status = "todo" | "in_progress" | "done";

/**
 * タスクのデータ構造
 */
export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string; // ISO 8601形式の日付文字列
  createdAt: string;
  updatedAt: string;
};

/**
 * 優先度の表示用ラベル
 */
export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

/**
 * ステータスの表示用ラベル
 */
export const STATUS_LABELS: Record<Status, string> = {
  todo: "未着手",
  in_progress: "進行中",
  done: "完了",
};

/**
 * フィルタ条件
 */
export type FilterOptions = {
  status?: Status | "all";
  priority?: Priority | "all";
  searchQuery?: string;
};