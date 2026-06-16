import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useGlassSurface } from "./useGlassSurface";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface MobileAppRatingProps {
  isOpen: boolean;
  onClose: () => void;
  onRate: (rating: number) => void;
  title?: string;
  message?: string;
  appName?: string;
  className?: string;
}

export function MobileAppRating({
  isOpen,
  onClose,
  onRate,
  title = "Rate this app",
  message = "If you enjoy using this app, please take a moment to rate it. Your feedback helps us improve!",
  appName = "Liquid Glass",
  className,
}: MobileAppRatingProps) {
  const disabledFill = useGlassSurface({ variant: "fill", opacity: 0.05 });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 glass-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={cn(
          "relative w-full max-w-sm",
          "glass-blur-xl glass-surface glass-border glass-highlight-strong",
          "rounded-2xl overflow-hidden",
          className
        )}
      >
        <GlassTopHighlight className="inset-x-0 top-0" opacity={0.25} />

        <div className="px-6 py-8 text-center">
          {/* App icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-liquid-blue to-liquid-purple">
            <Star size={28} className="text-white" />
          </div>

          <h3 className="text-lg font-semibold text-[var(--lg-text)] mb-2">{title} — {appName}</h3>
          <p className="text-sm text-[var(--lg-text-muted)] leading-relaxed mb-6">{message}</p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.85 }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="flex items-center justify-center"
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-colors",
                    star <= displayRating
                      ? "text-liquid-amber fill-liquid-amber"
                      : "text-[var(--lg-text-muted)]"
                  )}
                />
              </motion.button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-[var(--lg-text-muted)] hover:bg-[var(--lg-border-subtle)] transition-colors"
            >
              Remind Later
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (rating > 0) onRate(rating);
                onClose();
              }}
              disabled={rating === 0}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
                rating > 0
                  ? "text-white glass-blur-sm bg-liquid-blue/20 border border-liquid-blue/30"
                  : "text-white/20"
              )}
              style={rating > 0 ? undefined : { background: disabledFill.style.background }}
            >
              Submit Rating
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
