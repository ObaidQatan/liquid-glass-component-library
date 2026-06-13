import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Search, FolderOpen, Inbox, FileX } from "lucide-react";

interface LiquidGlassEmptyStateProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "search" | "folder" | "inbox" | "error" | "custom";
}

const variantIcons = {
  search: <Search size={40} className="text-[var(--lg-text-muted)]" />,
  folder: <FolderOpen size={40} className="text-[var(--lg-text-muted)]" />,
  inbox: <Inbox size={40} className="text-[var(--lg-text-muted)]" />,
  error: <FileX size={40} className="text-[var(--lg-text-muted)]" />,
  custom: null,
};

export function LiquidGlassEmptyState({
  className,
  icon,
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  action,
  variant = "search",
}: LiquidGlassEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--lg-border-subtle)] mb-4">
        {icon || variantIcons[variant]}
      </div>
      <h3 className="text-base font-semibold text-[var(--lg-text-secondary)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--lg-text-muted)] max-w-xs leading-relaxed mb-5">{description}</p>
      {action}
    </motion.div>
  );
}
