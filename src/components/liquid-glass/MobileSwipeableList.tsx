import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SwipeableItem {
  id: string;
  content: ReactNode;
  leftActions?: { icon: ReactNode; color: string; onClick: () => void }[];
  rightActions?: { icon: ReactNode; color: string; onClick: () => void }[];
}

interface MobileSwipeableListProps {
  items: SwipeableItem[];
  className?: string;
}

export function MobileSwipeableList({
  items,
  className,
}: MobileSwipeableListProps) {
  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const startX = useRef(0);
  const actionWidth = 100;

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    setSwipingId(id);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipingId) return;
    const diff = e.touches[0].clientX - startX.current;
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!swipingId) return;
    if (Math.abs(swipeOffset) > actionWidth / 2) {
      // Stay open
    } else {
      setSwipeOffset(0);
    }
    setSwipingId(null);
  };

  const closeSwipe = () => setSwipeOffset(0);

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item) => (
        <div key={item.id} className="relative overflow-hidden rounded-xl">
          {/* Background actions */}
          <div className="absolute inset-0 flex">
            {/* Left actions */}
            <div className="flex items-center">
              {item.leftActions?.map((action, i) => (
                <button
                  key={i}
                  onClick={() => { action.onClick(); closeSwipe(); }}
                  className="flex h-full items-center justify-center px-5"
                  style={{ backgroundColor: action.color }}
                >
                  {action.icon}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            {/* Right actions */}
            <div className="flex items-center flex-row-reverse">
              {item.rightActions?.map((action, i) => (
                <button
                  key={i}
                  onClick={() => { action.onClick(); closeSwipe(); }}
                  className="flex h-full items-center justify-center px-5"
                  style={{ backgroundColor: action.color }}
                >
                  {action.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Foreground card */}
          <motion.div
            onTouchStart={(e) => handleTouchStart(item.id, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            drag="x"
            dragConstraints={{ left: -120, right: 120 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 60) {
                setSwipeOffset(info.offset.x > 0 ? 100 : -100);
              } else {
                setSwipeOffset(0);
              }
              setSwipingId(null);
            }}
            className="relative z-10"
          >
            <div className={cn(
              "px-4 py-3 glass-blur-sm glass-surface glass-border"
            )}>
              {item.content}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

import { useState, useRef } from "react";
