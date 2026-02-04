import React, { useEffect, useState } from "react";

export function StatsBox({
  stats = DEFAULT_STATS,
  className = "",
  animationDuration = 1500,
}) {
  const [counts, setCounts] = useState(
    stats.map((s) => (typeof s.value === "number" ? 0 : s.value))
  );

  useEffect(() => {
    const numericTargets = stats.map((s) =>
      typeof s.value === "number" ? s.value : null
    );
    const start = performance.now();
    let raf = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / animationDuration);
      const eased = easeOutCubic(t);

      setCounts(
        numericTargets.map((target, i) => {
          if (target === null) return stats[i].value;
          return Math.floor(target * eased);
        })
      );

      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stats, animationDuration]);

  return (
    <div
      className={`relative p-1 rounded-2xl bg-gradient-to-r from-blue-700/20 via-purple-600/20 to-cyan-500/20 shadow-2xl backdrop-blur-xl border border-white/10 mx-auto my-8 max-w-3xl ${className}`}
    >
      <div className="rounded-2xl bg-[#0b1929]/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center flex-1 space-y-2"
          >
            <div className="flex items-center justify-center gap-2">
              {getIcon(s.iconName)}
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {typeof s.value === "number" ? counts[i] : s.value}
                {s.suffix ?? ""}
              </span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base font-medium tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_STATS = [
  { label: "Participants", value: 200, suffix: "+", iconName: "users" },
  { label: "Members", value: 15, suffix: "+", iconName: "badge" },
  { label: "Active", value: "24/7", iconName: "clock" },
];

function getIcon(name) {
  const common = "w-6 h-6 sm:w-7 sm:h-7 text-[#66b2ff]";
  switch (name) {
    case "users":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={common}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-1a4 4 0 00-4-4h-1M9 20H4v-1a4 4 0 014-4h1m0 5a4 4 0 100-8 4 4 0 000 8zm8-9a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "clock":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={common}
        >
          <path
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3M12 21a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>
      );
    case "badge":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={common}
        >
          <path
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 1.5-7-4.5-3.5L9 8z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={common}
        >
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default StatsBox;
