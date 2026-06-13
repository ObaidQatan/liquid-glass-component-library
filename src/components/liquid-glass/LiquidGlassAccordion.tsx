import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
}

interface LiquidGlassAccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export function LiquidGlassAccordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen = [],
}: LiquidGlassAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <motion.div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl",
              "glass-blur-sm glass-surface glass-border",
              isOpen && "glass-highlight"
            )}
          >
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors",
                isOpen ? "text-[var(--lg-text)]" : "text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]"
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0 text-[var(--lg-text-muted)]">{item.icon}</span>
              )}
              <span className="flex-1 text-sm font-medium">{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-[var(--lg-text-muted)]"
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-sm text-[var(--lg-text-secondary)] leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
