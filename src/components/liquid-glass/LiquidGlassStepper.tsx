import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface LiquidGlassStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function LiquidGlassStepper({
  steps,
  currentStep,
  className,
  orientation = "horizontal",
}: LiquidGlassStepperProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        isHorizontal ? "flex items-start" : "flex flex-col",
        className
      )}
    >
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div
            key={i}
            className={cn(
              "relative flex",
              isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start gap-4 flex-1"
            )}
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "absolute bg-[var(--lg-border)]",
                  isHorizontal
                    ? "top-4 left-1/2 right-0 h-px"
                    : "top-10 left-5 w-px bottom-0"
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scaleX: isHorizontal ? (isCompleted ? 1 : 0) : undefined,
                    scaleY: !isHorizontal ? (isCompleted ? 1 : 0) : undefined,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "absolute bg-liquid-blue/50 origin-left",
                    isHorizontal ? "inset-y-0 left-0" : "inset-x-0 top-0"
                  )}
                />
              </div>
            )}

            {/* Step circle */}
            <motion.div
              animate={{
                scale: isCurrent ? 1.1 : 1,
              }}
              className={cn(
                "relative z-10 flex items-center justify-center rounded-full",
                "glass-blur-sm border transition-all duration-300",
                isCompleted
                  ? "bg-liquid-blue/20 border-liquid-blue/40 text-liquid-blue"
                  : isCurrent
                  ? "bg-[var(--lg-border)] border-[var(--lg-border)] text-[var(--lg-text)]"
                  : "bg-[var(--lg-border-subtle)] border-[var(--lg-border-subtle)] text-[var(--lg-text-muted)]",
                isHorizontal ? "w-8 h-8" : "w-10 h-10 flex-shrink-0"
              )}
            >
              {/* Top highlight */}
              <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-white/20 rounded-full" />
              {isCompleted ? (
                <Check size={isHorizontal ? 14 : 16} strokeWidth={3} />
              ) : (
                step.icon || <span className="text-xs font-semibold">{i + 1}</span>
              )}
            </motion.div>

            {/* Labels */}
            <div
              className={cn(
                "mt-2 text-center",
                !isHorizontal && "mt-1 text-left flex-1"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium",
                  isCompleted || isCurrent ? "text-[var(--lg-text-secondary)]" : "text-[var(--lg-text-muted)]"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-[var(--lg-text-muted)] mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
