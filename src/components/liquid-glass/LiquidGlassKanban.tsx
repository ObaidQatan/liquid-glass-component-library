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
              <h4 className="text-sm font-semibold text-white/80">{column.title}</h4>
              <span className="text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded-md">
                {column.tasks.length}
              </span>
            </div>
            <button className="text-white/20 hover:text-white/50 transition-colors">
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
                  "p-3 rounded-xl cursor-pointer",
                  "glass-blur-sm glass-surface glass-border",
                  "hover:bg-white/10 transition-colors"
                )}
              >
                {task.tag && (
                  <span
                    className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mb-2"
                    style={{
                      backgroundColor: task.tagColor ? `${task.tagColor}20` : "rgba(255,255,255,0.05)",
                      color: task.tagColor || "rgba(255,255,255,0.5)",
                    }}
                  >
                    {task.tag}
                  </span>
                )}
                <p className="text-sm font-medium text-white/80 mb-1">{task.title}</p>
                {task.description && (
                  <p className="text-xs text-white/35 leading-relaxed">{task.description}</p>
                )}
                {task.assignees && task.assignees.length > 0 && (
                  <div className="flex -space-x-1.5 mt-2">
                    {task.assignees.map((a, j) => (
                      <div
                        key={j}
                        className="h-5 w-5 rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-[#0a0a0f] flex items-center justify-center text-[8px] font-bold text-white/60"
                      >
                        {a.slice(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Add button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-1.5 mt-2 py-2 rounded-xl text-xs text-white/30 hover:text-white/50 hover:bg-white/5 transition-colors"
          >
            <Plus size={12} />
            Add task
          </motion.button>
        </div>
      ))}
    </div>
  );
}
