import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface LiquidGlassTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  sortable?: boolean;
}

type SortState = { key: string; direction: "asc" | "desc" } | null;

export function LiquidGlassTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  rowKey,
  onRowClick,
  sortable = true,
}: LiquidGlassTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);

  const sorted = sort
    ? [...data].sort((a, b) => {
        const aVal = String(a[sort.key] ?? "");
        const bVal = String(b[sort.key] ?? "");
        return sort.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      })
    : data;

  const toggleSort = (key: string) => {
    if (!sortable) return;
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (!sortable || sort?.key !== colKey) return <ArrowUpDown size={12} className="text-[var(--lg-text-muted)]" />;
    return sort.direction === "asc" ? (
      <ArrowUp size={12} className="text-liquid-blue" />
    ) : (
      <ArrowDown size={12} className="text-liquid-blue" />
    );
  };

  return (
    <div className={cn("overflow-hidden rounded-2xl glass-blur-sm glass-surface glass-border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--lg-border-subtle)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]",
                    col.sortable && sortable && "cursor-pointer hover:text-[var(--lg-text-secondary)] select-none"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && sortable && <SortIcon colKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <motion.tr
                key={rowKey(row)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-[var(--lg-border-subtle)] transition-colors",
                  onRowClick && "cursor-pointer hover:bg-[var(--lg-border-subtle)]",
                  i === sorted.length - 1 && "border-b-0"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-[var(--lg-text-secondary)]">
                    {col.render ? col.render(row) : String(row[col.key] ?? "-")}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
