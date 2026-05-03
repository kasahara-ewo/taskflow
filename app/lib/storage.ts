import { Task } from "@/app/types/task";

const STORAGE_KEY = "taskflow:tasks";

/**
 * SSR対応：ブラウザ環境かどうかを判定
 */
const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

/**
 * localStorageからタスク一覧を取得
 */
export const loadTasks = (): Task[] => {
  if (!isBrowser()) return [];

  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    return parsed as Task[];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
};

/**
 * localStorageにタスク一覧を保存
 */
export const saveTasks = (tasks: Task[]): void => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

/**
 * 全タスクを削除
 */
export const clearTasks = (): void => {
  if (!isBrowser()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear tasks:", error);
  }
};