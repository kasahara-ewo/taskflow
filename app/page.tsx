"use client";

import { useEffect, useState, useMemo } from "react";
import { Task, Priority, Status, FilterOptions } from "@/app/types/task";
import { loadTasks, saveTasks } from "@/app/lib/storage";
import { generateId, nowISO, priorityWeight } from "@/app/lib/utils";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";
import TaskFilter from "@/app/components/TaskFilter";
import Header from "@/app/components/Header";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({
    status: "all",
    priority: "all",
    searchQuery: "",
  });

  // 初回マウント時にlocalStorageから読み込み
  useEffect(() => {
    setTasks(loadTasks());
    setIsLoaded(true);
  }, []);

  // tasksが変わるたびにlocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  /**
   * タスク追加
   */
  const handleAddTask = (
    title: string,
    description: string,
    priority: Priority,
    dueDate: string
  ) => {
    if (!title.trim()) return;

    const now = nowISO();
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: "todo",
      dueDate: dueDate || undefined,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  /**
   * タスク更新
   */
  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: nowISO() }
          : task
      )
    );
  };

  /**
   * タスク削除
   */
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  /**
   * ステータス変更
   */
  const handleStatusChange = (id: string, status: Status) => {
    handleUpdateTask(id, { status });
  };

  /**
   * フィルタリング & ソート済みタスク
   */
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // ステータスフィルタ
        if (filter.status && filter.status !== "all" && task.status !== filter.status) {
          return false;
        }
        // 優先度フィルタ
        if (filter.priority && filter.priority !== "all" && task.priority !== filter.priority) {
          return false;
        }
        // 検索フィルタ
        if (filter.searchQuery) {
          const query = filter.searchQuery.toLowerCase();
          const inTitle = task.title.toLowerCase().includes(query);
          const inDesc = task.description?.toLowerCase().includes(query) ?? false;
          if (!inTitle && !inDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // 完了タスクは下に
        if (a.status === "done" && b.status !== "done") return 1;
        if (a.status !== "done" && b.status === "done") return -1;
        // 優先度高い順
        const pDiff = priorityWeight(b.priority) - priorityWeight(a.priority);
        if (pDiff !== 0) return pDiff;
        // 作成日新しい順
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [tasks, filter]);

  // 統計情報
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in_progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Header stats={stats} />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <TaskForm onAdd={handleAddTask} />
        <TaskFilter filter={filter} onChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        TaskFlow - Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}