import { Globe, ArrowRight, ShieldAlert, Activity } from "lucide-react";
import { Link } from "react-router-dom";

interface RegionThreat {
  region: string;
  intensity: "high" | "medium" | "low";
  attempts: number;
  barPct: number;
}

const regionThreats: RegionThreat[] = [
  { region: "Eastern Europe", intensity: "high", attempts: 85, barPct: 100 },
  { region: "East Asia", intensity: "medium", attempts: 12, barPct: 14 },
  { region: "Western Europe", intensity: "low", attempts: 8, barPct: 9 },
];

const intensityStyle = {
  high: { dot: "bg-critical", bar: "bg-critical/60", text: "text-critical", badge: "bg-critical/10 text-critical border-critical/20" },
  medium: { dot: "bg-warning", bar: "bg-warning/60", text: "text-warning", badge: "bg-warning/10 text-warning border-warning/20" },
  low: { dot: "bg-success", bar: "bg-success/50", text: "text-success", badge: "bg-success/10 text-success border-success/20" },
};

// Dot-matrix world map coordinates (col, row) — simplified but recognizable
const dotMap: [number, number][] = [
  // North America
  [3,2],[4,2],[5,2],[3,3],[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[7,4],
  [4,5],[5,5],[6,5],[7,5],[5,6],[6,6],[7,6],[6,7],[7,7],
  // Central America
  [6,8],[7,8],
  // South America
  [7,9],[8,9],[7,10],[8,10],[9,10],[7,11],[8,11],[9,11],[8,12],[9,12],[8,13],[9,13],[8,14],
  // Europe
  [14,2],[15,2],[16,2],[17,2],[14,3],[15,3],[16,3],[17,3],[18,3],
  [14,4],[15,4],[16,4],[17,4],[18,4],[15,5],[16,5],[17,5],
  // Africa
  [14,6],[15,6],[16,6],[14,7],[15,7],[16,7],[17,7],
  [14,8],[15,8],[16,8],[17,8],[15,9],[16,9],[17,9],
  [15,10],[16,10],[16,11],
  // Asia
  [19,2],[20,2],[21,2],[22,2],[23,2],
  [19,3],[20,3],[21,3],[22,3],[23,3],[24,3],[25,3],
  [19,4],[20,4],[21,4],[22,4],[23,4],[24,4],[25,4],[26,4],
  [20,5],[21,5],[22,5],[23,5],[24,5],[25,5],
  [21,6],[22,6],[23,6],[24,6],
  // Australia
  [24,10],[25,10],[26,10],[24,11],[25,11],[26,11],[25,12],
];

// Threat hotspots overlay — dots that glow
const hotspots: { col: number; row: number; intensity: "high" | "medium" | "low" }[] = [
  { col: 17, row: 3, intensity: "high" },
  { col: 18, row: 4, intensity: "high" },
  { col: 24, row: 4, intensity: "medium" },
  { col: 23, row: 5, intensity: "medium" },
];

// HQ dot
const hq = { col: 5, row: 5 };

const CELL = 14;
const RADIUS = 2.5;
const COLS = 29;
const ROWS = 16;

export default function MiniThreatHeatmap() {
  const totalAttempts = regionThreats.reduce((sum, r) => sum + r.attempts, 0);

  const hotspotSet = new Set(hotspots.map(h => `${h.col},${h.row}`));
  const hotspotMap = Object.fromEntries(hotspots.map(h => [`${h.col},${h.row}`, h.intensity]));

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-critical" />
          <h2 className="section-title">Threat Activity</h2>
        </div>
        <span className="text-[10px] bg-critical/10 text-critical px-2 py-0.5 rounded-full font-mono font-medium">
          {totalAttempts} attempts
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Dot-matrix world map */}
        <div className="w-full overflow-hidden rounded-md bg-muted/10 border border-border/20 p-2">
          <svg
            viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base dots — continent shapes */}
            {dotMap.map(([c, r]) => {
              const key = `${c},${r}`;
              const isHotspot = hotspotSet.has(key);
              if (isHotspot) return null; // rendered separately
              return (
                <circle
                  key={key}
                  cx={c * CELL + CELL / 2}
                  cy={r * CELL + CELL / 2}
                  r={RADIUS}
                  fill="hsl(var(--muted-foreground))"
                  opacity={0.2}
                />
              );
            })}

            {/* Hotspot dots with glow */}
            {hotspots.map((h) => {
              const x = h.col * CELL + CELL / 2;
              const y = h.row * CELL + CELL / 2;
              const color = h.intensity === "high"
                ? "hsl(var(--critical))"
                : h.intensity === "medium"
                ? "hsl(var(--warning))"
                : "hsl(var(--success))";
              return (
                <g key={`hs-${h.col}-${h.row}`}>
                  <circle cx={x} cy={y} r={RADIUS + 1} fill={color} opacity={0.7} />
                  <circle cx={x} cy={y} r={RADIUS + 5} fill="none" stroke={color} strokeWidth={0.8} opacity={0.3}>
                    <animate attributeName="r" values={`${RADIUS + 3};${RADIUS + 8};${RADIUS + 3}`} dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* HQ marker */}
            <circle cx={hq.col * CELL + CELL / 2} cy={hq.row * CELL + CELL / 2} r={RADIUS + 1.5} fill="hsl(var(--primary))" opacity={0.9} />
            <circle cx={hq.col * CELL + CELL / 2} cy={hq.row * CELL + CELL / 2} r={RADIUS + 5} fill="none" stroke="hsl(var(--primary))" strokeWidth={0.8} opacity={0.25}>
              <animate attributeName="r" values={`${RADIUS + 4};${RADIUS + 9};${RADIUS + 4}`} dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Threat origins — clean bar layout */}
        <div className="space-y-2.5">
          {regionThreats.map((region) => {
            const s = intensityStyle[region.intensity];
            return (
              <div key={region.region} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <span className="text-xs">{region.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium capitalize ${s.badge}`}>
                      {region.intensity}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{region.attempts}</span>
                  </div>
                </div>
                <div className="h-1 bg-secondary/40 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.bar} transition-all`} style={{ width: `${region.barPct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Map Link */}
        <Link
          to="/?persona=security"
          className="flex items-center justify-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors pt-3 border-t border-border/30"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>View Full Threat Map</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
