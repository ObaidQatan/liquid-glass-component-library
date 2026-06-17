import { motion } from "framer-motion";
import { useTheme } from "./components/liquid-glass";
import { cn } from "./utils/cn";

export default function AnimatedBackground() {
  const { isDark } = useTheme();
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500 -z-10">
      <div className="absolute inset-0 bg-[var(--lg-bg)]" />
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[120px]",
          isDark ? "bg-liquid-blue/15" : "bg-liquid-blue/10"
        )}
      />
      <motion.div
        animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full blur-[100px]",
          isDark ? "bg-liquid-purple/15" : "bg-liquid-purple/8"
        )}
      />
      <motion.div
        animate={{ x: [0, 50, -100, 0], y: [0, -40, 80, 0], scale: [1, 1.1, 0.8, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full blur-[100px]",
          isDark ? "bg-liquid-pink/10" : "bg-liquid-pink/6"
        )}
      />
      <motion.div
        animate={{ x: [0, -60, 80, 0], y: [0, 100, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[90px]",
          isDark ? "bg-liquid-cyan/10" : "bg-liquid-cyan/6"
        )}
      />
    </div>
  );
}
