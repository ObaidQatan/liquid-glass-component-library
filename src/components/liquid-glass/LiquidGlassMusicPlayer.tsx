import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react";
import { useState } from "react";

interface LiquidGlassMusicPlayerProps {
  className?: string;
  title?: string;
  artist?: string;
  coverUrl?: string;
  duration?: number; // seconds
  currentTime?: number;
}

export function LiquidGlassMusicPlayer({
  className,
  title = "Midnight City",
  artist = "M83",
  coverUrl,
  duration = 243,
  currentTime: initialTime = 87,
}: LiquidGlassMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(70);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div
      className={cn(
        "w-full max-w-sm p-5 rounded-3xl",
        "glass-blur-lg glass-surface glass-border glass-highlight-strong",
        className
      )}
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Cover */}
      <div className="relative mx-auto mb-5 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-liquid-purple/40 via-liquid-blue/30 to-liquid-pink/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[var(--lg-border)] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/20" />
            </div>
          </div>
        )}
        {/* Glass overlay on cover */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
      </div>

      {/* Track info */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[var(--lg-text)] truncate">{title}</h3>
          <p className="text-sm text-[var(--lg-text-muted)] truncate">{artist}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={cn(
            "flex-shrink-0 mt-1 transition-colors",
            liked ? "text-liquid-rose" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
          )}
        >
          <Heart size={20} className={liked ? "fill-liquid-rose" : ""} />
        </motion.button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div
          className="relative h-1 rounded-full bg-[var(--lg-border)] cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            setCurrentTime(Math.floor(pct * duration));
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-liquid-blue to-liquid-purple"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[var(--lg-text-muted)] tabular-nums">{formatTime(currentTime)}</span>
          <span className="text-[10px] text-[var(--lg-text-muted)] tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors">
          <Shuffle size={16} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors">
          <SkipBack size={22} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--lg-border)] glass-border"
        >
          {isPlaying ? (
            <Pause size={20} className="text-[var(--lg-text)]" />
          ) : (
            <Play size={20} className="text-[var(--lg-text)] ml-0.5" />
          )}
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors">
          <SkipForward size={22} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors">
          <Repeat size={16} />
        </motion.button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <Volume2 size={14} className="text-[var(--lg-text-muted)] flex-shrink-0" />
        <div
          className="relative flex-1 h-1 rounded-full bg-[var(--lg-border)] cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            setVolume(Math.round(pct * 100));
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--lg-border)]"
            style={{ width: `${volume}%` }}
          />
        </div>
      </div>
    </div>
  );
}
