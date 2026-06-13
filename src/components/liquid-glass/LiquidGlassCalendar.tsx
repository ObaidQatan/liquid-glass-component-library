import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface LiquidGlassCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  highlightedDates?: Date[];
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function LiquidGlassCalendar({
  value,
  onChange,
  className,
  minDate,
  maxDate,
  highlightedDates = [],
}: LiquidGlassCalendarProps) {
  const [viewDate, setViewDate] = useState(value || new Date());
  const today = new Date();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isHighlighted = (d: number) =>
    highlightedDates.some((h) =>
      isSameDay(h, new Date(year, month, d))
    );

  const isDisabled = (d: number) => {
    const date = new Date(year, month, d);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSelected = (d: number) =>
    value && isSameDay(value, new Date(year, month, d));

  const isToday = (d: number) => isSameDay(today, new Date(year, month, d));

  return (
    <div
      className={cn(
        "w-full max-w-xs p-4 rounded-2xl",
        "glass-blur-sm glass-surface glass-border glass-highlight",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevMonth}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-white/80 transition-colors"
        >
          <ChevronLeft size={14} />
        </motion.button>
        <span className="text-sm font-semibold text-white/90">
          {MONTHS[month]} {year}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-white/80 transition-colors"
        >
          <ChevronRight size={14} />
        </motion.button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/30 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const highlighted = isHighlighted(day);
          const todayMark = isToday(day);

          return (
            <motion.button
              key={day}
              whileHover={disabled ? {} : { scale: 1.15 }}
              whileTap={disabled ? {} : { scale: 0.9 }}
              onClick={() => !disabled && onChange?.(new Date(year, month, day))}
              disabled={disabled}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                selected
                  ? "bg-liquid-blue/30 text-white"
                  : todayMark
                  ? "text-liquid-blue font-bold"
                  : disabled
                  ? "text-white/15 cursor-not-allowed"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
                highlighted && !selected && "ring-1 ring-liquid-amber/40"
              )}
            >
              {day}
              {todayMark && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-liquid-blue" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
