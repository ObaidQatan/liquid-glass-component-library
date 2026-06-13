import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface LiquidGlassPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
  showEdges?: boolean;
  siblingCount?: number;
}

export function LiquidGlassPagination({
  currentPage,
  totalPages,
  onChange,
  className,
  showEdges = true,
  siblingCount = 1,
}: LiquidGlassPaginationProps) {
  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];
    const left = Math.max(1, currentPage - siblingCount);
    const right = Math.min(totalPages, currentPage + siblingCount);

    if (showEdges && left > 1) pages.push(1);
    if (showEdges && left > 2) pages.push("ellipsis");
    for (let i = left; i <= right; i++) pages.push(i);
    if (showEdges && right < totalPages - 1) pages.push("ellipsis");
    if (showEdges && right < totalPages) pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          "glass-blur-sm glass-surface glass-border",
          "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors",
          currentPage === 1 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronLeft size={16} />
      </motion.button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-[var(--lg-text-muted)]">
            <MoreHorizontal size={16} />
          </span>
        ) : (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(page)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all",
              page === currentPage
                ? "bg-[var(--lg-border)] text-[var(--lg-text)] glass-border"
                : "glass-blur-sm glass-surface glass-border text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            )}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          "glass-blur-sm glass-surface glass-border",
          "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors",
          currentPage === totalPages && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
}
