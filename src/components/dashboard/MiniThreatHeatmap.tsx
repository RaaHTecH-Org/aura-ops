import { Globe, MapPin, ArrowRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

interface RegionThreat {
  region: string;
  code: string;
  intensity: "high" | "medium" | "low";
  attempts: number;
}

const regionThreats: RegionThreat[] = [
  { region: "Eastern Europe", code: "EE", intensity: "high", attempts: 85 },
  { region: "East Asia", code: "EA", intensity: "medium", attempts: 12 },
  { region: "Western Europe", code: "WE", intensity: "low", attempts: 8 },
];

const intensityConfig = {
  high: { fill: "hsl(var(--critical))", opacity: 0.4, text: "text-critical", bg: "bg-critical/15" },
  medium: { fill: "hsl(var(--warning))", opacity: 0.3, text: "text-warning", bg: "bg-warning/15" },
  low: { fill: "hsl(var(--success))", opacity: 0.2, text: "text-success", bg: "bg-success/15" },
};

export default function MiniThreatHeatmap() {
  const totalAttempts = regionThreats.reduce((sum, r) => sum + r.attempts, 0);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-critical" />
          <h2 className="section-title">Threat Activity</h2>
        </div>
        <span className="text-[10px] bg-critical/15 text-critical px-2 py-0.5 rounded-full font-medium">
          {totalAttempts} attempts
        </span>
      </div>

      <div className="p-4">
        {/* Compact SVG World Map */}
        <div className="relative w-full overflow-hidden rounded-lg bg-secondary/20 border border-border/30">
          <svg
            viewBox="0 0 400 200"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid */}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`vg-${i}`} x1={i * 50} y1={0} x2={i * 50} y2={200} stroke="hsl(var(--border))" strokeOpacity={0.1} strokeDasharray="2 4" />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line key={`hg-${i}`} x1={0} y1={i * 50} x2={400} y2={i * 50} stroke="hsl(var(--border))" strokeOpacity={0.1} strokeDasharray="2 4" />
            ))}

            {/* Simplified continents */}
            {/* North America */}
            <path d="M50,40 L80,35 L110,40 L130,60 L120,85 L100,95 L80,100 L60,90 L45,70 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.5} />
            {/* South America */}
            <path d="M100,110 L115,105 L130,120 L125,150 L110,165 L95,155 L90,130 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.5} />
            {/* Europe - Highlighted (high threat) */}
            <path d="M195,35 L220,32 L245,40 L255,55 L250,75 L230,80 L210,75 L195,60 Z" fill={intensityConfig.high.fill} fillOpacity={intensityConfig.high.opacity} stroke="hsl(var(--critical))" strokeOpacity={0.6} strokeWidth={1} />
            {/* Africa */}
            <path d="M200,85 L225,82 L245,95 L250,130 L235,155 L210,150 L195,120 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.5} />
            {/* Asia - Highlighted (medium threat) */}
            <path d="M260,30 L300,25 L340,40 L355,65 L345,90 L315,100 L280,95 L260,70 Z" fill={intensityConfig.medium.fill} fillOpacity={intensityConfig.medium.opacity} stroke="hsl(var(--warning))" strokeOpacity={0.5} strokeWidth={0.8} />
            {/* Australia */}
            <path d="M320,130 L345,125 L360,140 L355,160 L340,165 L325,155 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.5} />

            {/* HQ Target */}
            <circle cx={115} cy={80} r={6} fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <circle cx={115} cy={80} r={2.5} fill="hsl(var(--primary))" />

            {/* Threat hotspots with pulse */}
            {/* Eastern Europe */}
            <circle cx={230} cy={55} r={8} fill="none" stroke="hsl(var(--critical))" strokeOpacity={0.3} strokeWidth={1}>
              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={230} cy={55} r={4} fill="hsl(var(--critical))" fillOpacity={0.6} />

            {/* East Asia */}
            <circle cx={310} cy={60} r={3} fill="hsl(var(--warning))" fillOpacity={0.5} />

            {/* Attack lines */}
            <line x1={230} y1={55} x2={115} y2={80} stroke="hsl(var(--critical))" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="3 3" />
            <line x1={310} y1={60} x2={115} y2={80} stroke="hsl(var(--warning))" strokeOpacity={0.2} strokeWidth={0.8} strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Top Threat Origins */}
        <div className="mt-3 space-y-2">
          {regionThreats.map((region) => {
            const cfg = intensityConfig[region.intensity];
            return (
              <div key={region.code} className="flex items-center gap-2 py-1.5">
                <MapPin className={`w-3 h-3 ${cfg.text} shrink-0`} />
                <span className="text-xs flex-1 truncate">{region.region}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium capitalize ${cfg.bg} ${cfg.text}`}>
                  {region.intensity}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{region.attempts}</span>
              </div>
            );
          })}
        </div>

        {/* View Full Map Link */}
        <Link 
          to="/?persona=security" 
          className="mt-3 flex items-center justify-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors py-2 border-t border-border/30"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>View Full Threat Map</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
