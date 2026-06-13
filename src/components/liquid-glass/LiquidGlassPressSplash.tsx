import { motion } from "framer-motion";

interface LiquidGlassPressSplashProps {
  press: { isPressed: boolean; x: number; y: number };
  size?: number;
  tint?: "light" | "dark";
  className?: string;
  duration?: number;
}

export function LiquidGlassPressSplash({
  press,
  size = 140,
  tint = "light",
  className,
  duration = 0.55,
}: LiquidGlassPressSplashProps) {
  const splashBackground =
    tint === "light"
      ? "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 26%, rgba(255,255,255,0.06) 50%, transparent 72%)"
      : "radial-gradient(circle at 35% 35%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.16) 26%, rgba(0,0,0,0.04) 50%, transparent 72%)";

  return (
    <motion.div
      className={`pointer-events-none absolute mix-blend-soft-light ${className || ""}`}
      initial={false}
      animate={{
        opacity: press.isPressed ? [0.52, 0] : 0,
        scale: press.isPressed ? [0, 1.6] : 0,
        borderRadius: press.isPressed
          ? [
              "45% 55% 50% 50% / 55% 45% 50% 50%",
              "55% 45% 52% 48% / 48% 52% 45% 55%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
            ]
          : "50%",
      }}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        left: `${press.x}%`,
        top: `${press.y}%`,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: splashBackground,
        filter: "blur(1.5px)",
      }}
    />
  );
}
