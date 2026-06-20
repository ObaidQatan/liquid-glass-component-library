import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";
import { useGlassSurface } from "./useGlassSurface";
import { useLiquidTransition, useGlassOverlayRootStyle } from "./useLiquidMotion";

interface SplashSlide {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  gradient: string;
}

interface MobileSplashScreenProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SplashSlide[];
  className?: string;
  getStartedText?: string;
  skipText?: string;
}

export function MobileSplashScreen({
  isOpen,
  onClose,
  slides,
  className,
  getStartedText = "Get Started",
  skipText = "Skip",
}: MobileSplashScreenProps) {
  const transition = useLiquidTransition();
  const overlayRef = useGlassOverlayRootStyle(isOpen);
  const buttonFill = useGlassSurface({ variant: "fill", opacity: 0.15 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;

  if (!isOpen) return null;

  const slide = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-[70] flex flex-col items-center justify-between",
        "bg-[#0a0a0f]",
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700",
        slide.gradient
      )}>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Skip button */}
      <div className="relative z-10 w-full max-w-lg flex justify-end p-6">
        <button
          onClick={onClose}
          className="text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
        >
          {skipText}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0.2, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            {/* Icon */}
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl glass-blur-lg glass-surface glass-border glass-highlight-strong">
              <div className="text-white/80 scale-150">{slide.icon}</div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{slide.title}</h2>
            <p className="text-sm text-white/50 leading-relaxed">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 pb-12 px-8">
        {/* Page indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentSlide
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full gap-3">
          {!isLastSlide && (
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white/50 glass-blur-sm glass-surface glass-border hover:bg-white/10 transition-colors"
            >
              Back
            </button>
          )}
          {isLastSlide ? (
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white glass-blur-sm glass-border glass-highlight"
              style={{ background: buttonFill.style.background }}
            >
              {getStartedText}
            </button>
          ) : (
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white glass-blur-sm glass-border glass-highlight"
              style={{ background: buttonFill.style.background }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
