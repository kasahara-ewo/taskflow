import { Task } from "@/app/types/task";

/**
 * ユニークなIDを生成
 * crypto.randomUUID()が使えない環境でも動くようフォールバック付き
 */
export const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // フォールバック: タイムスタンプ + ランダム文字列
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * 現在時刻のISO 8601文字列を取得
 */
export const nowISO = (): string => {
  return new Date().toISOString();
};

/**
 * 日付を「YYYY-MM-DD」形式にフォーマット
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 日付を「YYYY/MM/DD HH:mm」形式の表示用にフォーマット
 */
export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * タスクが期限切れかどうかを判定
 * 期限なしまたは完了済みのタスクは false
 */
export const isOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.status === "done") return false;

  const due = new Date(task.dueDate);
  if (isNaN(due.getTime())) return false;

  // 今日の00:00と比較（期限日当日中はOK）
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due < today;
};

/**
 * タスクが今日が期限かどうかを判定
 */
export const isDueToday = (task: Task): boolean => {
  if (!task.dueDate || task.status === "done") return false;

  const due = new Date(task.dueDate);
  if (isNaN(due.getTime())) return false;

  const today = new Date();
  return (
    due.getFullYear() === today.getFullYear() &&
    due.getMonth() === today.getMonth() &&
    due.getDate() === today.getDate()
  );
};

/**
 * 優先度の数値化（ソート用）
 * 高い優先度ほど大きい数値
 */
export const priorityWeight = (priority: Task["priority"]): number => {
  switch (priority) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
  }
};