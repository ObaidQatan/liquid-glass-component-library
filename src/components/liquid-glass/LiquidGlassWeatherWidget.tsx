import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Gauge } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  location: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
  visibility: number;
  pressure: number;
  hourly: { time: string; temp: number; icon: "sun" | "cloud" | "rain" }[];
}

interface LiquidGlassWeatherWidgetProps {
  data?: WeatherData;
  className?: string;
}

const conditionConfig = {
  sunny: { icon: Sun, color: "text-liquid-amber", bg: "from-liquid-amber/10 to-transparent" },
  cloudy: { icon: Cloud, color: "text-white/60", bg: "from-white/5 to-transparent" },
  rainy: { icon: CloudRain, color: "text-liquid-blue", bg: "from-liquid-blue/10 to-transparent" },
  snowy: { icon: CloudSnow, color: "text-white/80", bg: "from-white/10 to-transparent" },
};

const hourlyIconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
};

const defaultData: WeatherData = {
  temp: 72,
  condition: "sunny",
  location: "San Francisco, CA",
  high: 78,
  low: 62,
  humidity: 45,
  wind: 8,
  visibility: 10,
  pressure: 30.12,
  hourly: [
    { time: "Now", temp: 72, icon: "sun" },
    { time: "1PM", temp: 74, icon: "sun" },
    { time: "2PM", temp: 76, icon: "cloud" },
    { time: "3PM", temp: 75, icon: "cloud" },
    { time: "4PM", temp: 73, icon: "rain" },
    { time: "5PM", temp: 70, icon: "rain" },
  ],
};

export function LiquidGlassWeatherWidget({
  data = defaultData,
  className,
}: LiquidGlassWeatherWidgetProps) {
  const config = conditionConfig[data.condition];
  const ConditionIcon = config.icon;

  return (
    <div
      className={cn(
        "w-full max-w-sm p-5 rounded-3xl overflow-hidden relative",
        "glass-blur-lg glass-surface glass-border glass-highlight-strong",
        className
      )}
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {/* Background glow */}
      <div className={cn("absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br", config.bg)} />

      {/* Main weather */}
      <div className="relative flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-white/40 mb-1">{data.location}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-light text-white/90">{data.temp}°</span>
          </div>
          <p className={cn("text-sm font-medium mt-1", config.color)}>
            {data.condition.charAt(0).toUpperCase() + data.condition.slice(1)}
          </p>
          <p className="text-xs text-white/30 mt-0.5">
            H:{data.high}°  L:{data.low}°
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ConditionIcon size={56} className={config.color} strokeWidth={1.2} />
        </motion.div>
      </div>

      {/* Hourly forecast */}
      <div className="flex justify-between mb-5 px-1">
        {data.hourly.map((h, i) => {
          const Icon = hourlyIconMap[h.icon];
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-white/30">{h.time}</span>
              <Icon size={14} className="text-white/50" />
              <span className="text-xs font-medium text-white/70">{h.temp}°</span>
            </div>
          );
        })}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-2">
        <DetailItem icon={<Droplets size={14} />} label="Humidity" value={`${data.humidity}%`} />
        <DetailItem icon={<Wind size={14} />} label="Wind" value={`${data.wind} mph`} />
        <DetailItem icon={<Eye size={14} />} label="Visibility" value={`${data.visibility} mi`} />
        <DetailItem icon={<Gauge size={14} />} label="Pressure" value={`${data.pressure}"`} />
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5">
      <span className="text-white/30">{icon}</span>
      <div>
        <p className="text-[10px] text-white/30">{label}</p>
        <p className="text-xs font-medium text-white/70">{value}</p>
      </div>
    </div>
  );
}
