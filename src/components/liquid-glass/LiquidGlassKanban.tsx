import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
  assignees?: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color?: string;
}

interface LiquidGlassKanbanProps {
  columns: KanbanColumn[];
  className?: string;
  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void;
}

export function LiquidGlassKanban({
  columns: initialColumns,
  className,
}: LiquidGlassKanbanProps) {
  const [columns] = useState(initialColumns);

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-72 rounded-2xl glass-blur-sm glass-surface-dark glass-border p-3"
        >
          {/* Column header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color || "rgba(255,255,255,0.3)" }}
              />
              <h4 className="text-sm font-semibold text-[var(--lg-text-secondary)]">{column.title}</h4>
              <span className="text-xs text-[var(--lg-text-muted)] bg-[var(--lg-border-subtle)] px-1.5 py-0.5 rounded-md">
                {column.tasks.length}
              </span>
            </div>
            <button className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors">
              <MoreHorizontal size={14} />
            </button>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            {column.tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className={cn(
                  "relative overflow-hidden rounded-xl cursor-pointer",
                  "glass-blur glass-surface-strong glass-border glass-highlight"
                )}
              >
                {/* Top highlight */}
                <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full" />
                {/* Reflection blob */}
                <div className="pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full glass-reflection blur-2xl" />
                {/* Sheen */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.15]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 45%, transparent 55%)",
                  }}
                />

                <div className="relative p-3">
                  {task.tag && (
                    <span
                      className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mb-2"
                      style={{
                        backgroundColor: task.tagColor ? `${task.tagColor}20` : "rgba(255,255,255,0.08)",
                        color: task.tagColor || "rgba(255,255,255,0.6)",
                      }}
                    >
                      {task.tag}
                    </span>
                  )}
                  <p className="text-sm font-medium text-[var(--lg-text-secondary)] mb-1">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-[var(--lg-text-muted)] leading-relaxed">{task.description}</p>
                  )}
                  {task.assignees && task.assignees.length > 0 && (
                    <div className="flex -space-x-1.5 mt-2">
                      {task.assignees.map((a, j) => (
                        <div
                          key={j}
                          className="h-5 w-5 rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-[var(--lg-border)] flex items-center justify-center text-[8px] font-bold text-[var(--lg-text-secondary)]"
                        >
                          {a.slice(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-1.5 mt-2 py-2 rounded-xl text-xs text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] transition-colors"
          >
            <Plus size={12} />
            Add task
          </motion.button>
        </div>
      ))}
    </div>
  );
}
