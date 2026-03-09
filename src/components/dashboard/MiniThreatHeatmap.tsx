import { useState } from "react";
import { Globe, ArrowRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

interface RegionThreat {
  region: string;
  intensity: "high" | "medium" | "low";
  attempts: number;
  barPct: number;
  hotspotDots: [number, number][];
}

const regionThreats: RegionThreat[] = [
  { region: "Eastern Europe", intensity: "high", attempts: 85, barPct: 100, hotspotDots: [[21,5],[22,5],[21,6],[22,6],[23,5]] },
  { region: "East Asia", intensity: "medium", attempts: 12, barPct: 14, hotspotDots: [[30,5],[31,5],[30,6]] },
  { region: "Western Europe", intensity: "low", attempts: 8, barPct: 9, hotspotDots: [[18,5],[19,5]] },
];

const intensityStyle = {
  high: { dot: "bg-critical", bar: "bg-critical/60", text: "text-critical", badge: "bg-critical/10 text-critical border-critical/20", svgFill: "hsl(var(--critical))" },
  medium: { dot: "bg-warning", bar: "bg-warning/60", text: "text-warning", badge: "bg-warning/10 text-warning border-warning/20", svgFill: "hsl(var(--warning))" },
  low: { dot: "bg-success", bar: "bg-success/50", text: "text-success", badge: "bg-success/10 text-success border-success/20", svgFill: "hsl(var(--success))" },
};

// High-detail dot-matrix world map (col, row)
const dotMap: [number, number][] = [
  // North America — detailed
  [4,1],[5,1],[6,1],[7,1],
  [3,2],[4,2],[5,2],[6,2],[7,2],[8,2],
  [2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],
  [3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],
  [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
  [5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
  [6,7],[7,7],[8,7],[9,7],
  [7,8],[8,8],[9,8],
  [8,9],[9,9],
  // Central America
  [9,10],[10,10],[9,11],
  // South America
  [10,11],[11,11],[10,12],[11,12],[12,12],
  [10,13],[11,13],[12,13],[13,13],
  [10,14],[11,14],[12,14],[13,14],
  [11,15],[12,15],[13,15],
  [11,16],[12,16],[13,16],
  [12,17],[13,17],
  [12,18],
  // Europe — detailed
  [17,2],[18,2],[19,2],[20,2],[21,2],
  [16,3],[17,3],[18,3],[19,3],[20,3],[21,3],[22,3],
  [16,4],[17,4],[18,4],[19,4],[20,4],[21,4],[22,4],[23,4],
  [17,5],[18,5],[19,5],[20,5],[21,5],[22,5],[23,5],
  [18,6],[19,6],[20,6],[21,6],[22,6],
  // Africa — detailed
  [18,7],[19,7],[20,7],[21,7],[22,7],
  [17,8],[18,8],[19,8],[20,8],[21,8],[22,8],[23,8],
  [17,9],[18,9],[19,9],[20,9],[21,9],[22,9],[23,9],
  [18,10],[19,10],[20,10],[21,10],[22,10],
  [18,11],[19,11],[20,11],[21,11],[22,11],
  [19,12],[20,12],[21,12],
  [20,13],[21,13],
  // Middle East
  [23,6],[24,6],[25,6],[23,7],[24,7],[25,7],
  // Asia — detailed
  [24,1],[25,1],[26,1],[27,1],
  [23,2],[24,2],[25,2],[26,2],[27,2],[28,2],
  [23,3],[24,3],[25,3],[26,3],[27,3],[28,3],[29,3],[30,3],
  [24,4],[25,4],[26,4],[27,4],[28,4],[29,4],[30,4],[31,4],[32,4],
  [24,5],[25,5],[26,5],[27,5],[28,5],[29,5],[30,5],[31,5],[32,5],
  [25,6],[26,6],[27,6],[28,6],[29,6],[30,6],[31,6],
  [26,7],[27,7],[28,7],[29,7],[30,7],
  [27,8],[28,8],[29,8],
  // Southeast Asia
  [30,8],[31,8],[30,9],[31,9],[32,9],
  // Japan / Korea
  [32,3],[33,3],[33,4],[33,5],
  // Australia — detailed
  [29,13],[30,13],[31,13],[32,13],[33,13],
  [29,14],[30,14],[31,14],[32,14],[33,14],
  [30,15],[31,15],[32,15],[33,15],
  [31,16],[32,16],
  // Greenland
  [12,1],[13,1],[14,1],[12,2],[13,2],[14,2],
  // Iceland
  [15,1],[16,1],
  // UK / Ireland
  [16,3],[17,3],
];

// Build hotspot set from region data
const allHotspotDots = regionThreats.flatMap(r => 
  r.hotspotDots.map(d => ({ col: d[0], row: d[1], intensity: r.intensity, region: r.region }))
);
const hotspotSet = new Set(allHotspotDots.map(h => `${h.col},${h.row}`));

const hq = { col: 7, row: 6 };
const CELL = 11;
const RADIUS = 2;
const COLS = 36;
const ROWS = 20;

export default function MiniThreatHeatmap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string; sub: string } | null>(null);
  const totalAttempts = regionThreats.reduce((sum, r) => sum + r.attempts, 0);

  const handleHotspotHover = (region: string, x: number, y: number) => {
    const r = regionThreats.find(rt => rt.region === region);
    if (r) {
      setHoveredRegion(region);
      setTooltip({ x, y: y - 14, text: r.region, sub: `${r.attempts} attempts` });
    }
  };

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
        {/* High-detail dot-matrix world map */}
        <div className="w-full overflow-hidden rounded-md bg-muted/10 border border-border/20 p-2 relative">
          <svg
            viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base continent dots */}
            {dotMap.map(([c, r]) => {
              const key = `${c},${r}`;
              if (hotspotSet.has(key)) return null;
              return (
                <circle
                  key={key}
                  cx={c * CELL + CELL / 2}
                  cy={r * CELL + CELL / 2}
                  r={RADIUS}
                  fill="hsl(var(--muted-foreground))"
                  opacity={0.18}
                />
              );
            })}

            {/* Interactive hotspot dots */}
            {allHotspotDots.map((h) => {
              const x = h.col * CELL + CELL / 2;
              const y = h.row * CELL + CELL / 2;
              const s = intensityStyle[h.intensity];
              const isHovered = hoveredRegion === h.region;
              return (
                <g 
                  key={`hs-${h.col}-${h.row}`}
                  className="cursor-pointer"
                  onMouseEnter={() => handleHotspotHover(h.region, x, y)}
                  onMouseLeave={() => { setHoveredRegion(null); setTooltip(null); }}
                >
                  <circle cx={x} cy={y} r={isHovered ? RADIUS + 2 : RADIUS + 1} fill={s.svgFill} opacity={isHovered ? 0.9 : 0.7} className="transition-all duration-150" />
                  <circle cx={x} cy={y} r={RADIUS + 6} fill="none" stroke={s.svgFill} strokeWidth={0.6} opacity={0.25}>
                    <animate attributeName="r" values={`${RADIUS + 3};${RADIUS + 8};${RADIUS + 3}`} dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* Attack lines from hotspot regions to HQ */}
            {regionThreats.map((r) => {
              const mainDot = r.hotspotDots[0];
              const sx = mainDot[0] * CELL + CELL / 2;
              const sy = mainDot[1] * CELL + CELL / 2;
              const tx = hq.col * CELL + CELL / 2;
              const ty = hq.row * CELL + CELL / 2;
              const s = intensityStyle[r.intensity];
              return (
                <g key={`atk-${r.region}`}>
                  <line x1={sx} y1={sy} x2={tx} y2={ty} stroke={s.svgFill} strokeOpacity={0.15} strokeWidth={0.8} strokeDasharray="2 3" />
                  {/* Animated bullet */}
                  <circle r={1.5} fill={s.svgFill} opacity={0.8}>
                    <animateMotion dur={r.intensity === "high" ? "2s" : "3s"} repeatCount="indefinite" path={`M${sx},${sy} L${tx},${ty}`} />
                  </circle>
                </g>
              );
            })}

            {/* HQ marker */}
            <circle cx={hq.col * CELL + CELL / 2} cy={hq.row * CELL + CELL / 2} r={RADIUS + 1.5} fill="hsl(var(--primary))" opacity={0.9} />
            <circle cx={hq.col * CELL + CELL / 2} cy={hq.row * CELL + CELL / 2} r={RADIUS + 5} fill="none" stroke="hsl(var(--primary))" strokeWidth={0.6} opacity={0.2}>
              <animate attributeName="r" values={`${RADIUS + 4};${RADIUS + 9};${RADIUS + 4}`} dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x={hq.col * CELL + CELL / 2} y={hq.row * CELL + CELL / 2 - 10} textAnchor="middle" fill="hsl(var(--primary))" fontSize={7} fontWeight={600} opacity={0.8}>HQ</text>

            {/* SVG tooltip */}
            {tooltip && (
              <g>
                <rect x={tooltip.x - 30} y={tooltip.y - 20} width={60} height={20} rx={3} fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.5} />
                <text x={tooltip.x} y={tooltip.y - 12} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={5.5} fontWeight={600}>{tooltip.text}</text>
                <text x={tooltip.x} y={tooltip.y - 5} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={4.5}>{tooltip.sub}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Interactive threat origins with hover highlight */}
        <div className="space-y-2.5">
          {regionThreats.map((region) => {
            const s = intensityStyle[region.intensity];
            const isHovered = hoveredRegion === region.region;
            return (
              <div
                key={region.region}
                className={`space-y-1 p-1.5 -m-1.5 rounded-md cursor-pointer transition-colors ${isHovered ? "bg-muted/20" : "hover:bg-muted/10"}`}
                onMouseEnter={() => setHoveredRegion(region.region)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${isHovered ? "scale-150" : ""} transition-transform`} />
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
