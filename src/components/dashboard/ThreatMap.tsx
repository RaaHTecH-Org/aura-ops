import { Globe, ShieldAlert, MapPin } from "lucide-react";

interface ThreatActor {
  ip: string;
  location: string;
  country: string;
  cx: number;
  cy: number;
  attempts: number;
  risk: "critical" | "high" | "medium";
}

const threatActors: ThreatActor[] = [
  { ip: "185.220.101.xx", location: "Moscow, Russia", country: "RU", cx: 590, cy: 145, attempts: 47, risk: "critical" },
  { ip: "91.240.118.xx", location: "Kyiv, Ukraine", country: "UA", cx: 565, cy: 155, attempts: 23, risk: "high" },
  { ip: "194.36.189.xx", location: "Bucharest, Romania", country: "RO", cx: 550, cy: 165, attempts: 15, risk: "high" },
  { ip: "45.155.205.xx", location: "Amsterdam, Netherlands", country: "NL", cx: 500, cy: 140, attempts: 8, risk: "medium" },
  { ip: "103.75.201.xx", location: "Beijing, China", country: "CN", cx: 710, cy: 175, attempts: 12, risk: "high" },
];

const targetLocation = { label: "HQ — New York, US", cx: 260, cy: 175 };

const riskConfig = {
  critical: { color: "text-critical", bg: "bg-critical", ring: "ring-critical/30", pulse: "animate-pulse" },
  high: { color: "text-warning", bg: "bg-warning", ring: "ring-warning/30", pulse: "" },
  medium: { color: "text-info", bg: "bg-info", ring: "ring-info/30", pulse: "" },
};

export default function ThreatMap() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-critical" />
          <h2 className="section-title">Threat Origin Map</h2>
        </div>
        <span className="text-[10px] bg-critical/15 text-critical px-2 py-0.5 rounded-full font-medium">
          INC-008 — Active Threat
        </span>
      </div>

      <div className="p-4">
        {/* SVG World Map */}
        <div className="relative w-full overflow-hidden rounded-lg bg-secondary/30 border border-border/30">
          <svg
            viewBox="0 0 900 450"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid lines */}
            {Array.from({ length: 13 }, (_, i) => (
              <line key={`vg-${i}`} x1={i * 75} y1={0} x2={i * 75} y2={450} stroke="hsl(var(--border))" strokeOpacity={0.15} strokeDasharray="2 4" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`hg-${i}`} x1={0} y1={i * 75} x2={900} y2={i * 75} stroke="hsl(var(--border))" strokeOpacity={0.15} strokeDasharray="2 4" />
            ))}

            {/* Simplified continent outlines */}
            {/* North America */}
            <path d="M120,80 L180,70 L240,75 L290,100 L310,140 L300,180 L280,200 L250,210 L220,220 L200,260 L180,280 L160,260 L140,220 L120,200 L100,160 L90,120 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />
            {/* South America */}
            <path d="M230,280 L260,270 L290,290 L310,320 L300,360 L280,390 L260,400 L240,380 L220,340 L210,310 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />
            {/* Europe */}
            <path d="M440,80 L480,75 L520,80 L560,90 L580,110 L570,140 L550,160 L520,170 L490,165 L470,150 L450,130 L440,110 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />
            {/* Africa */}
            <path d="M460,180 L510,175 L550,190 L570,220 L560,280 L540,330 L510,360 L480,350 L460,310 L450,260 L440,220 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />
            {/* Asia */}
            <path d="M580,60 L650,55 L720,70 L770,100 L780,140 L760,180 L730,200 L700,210 L660,200 L620,180 L590,150 L580,110 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />
            {/* Australia */}
            <path d="M720,300 L770,290 L810,310 L820,340 L800,370 L760,375 L730,360 L710,330 Z" fill="hsl(var(--muted))" fillOpacity={0.15} stroke="hsl(var(--border))" strokeOpacity={0.3} strokeWidth={0.8} />

            {/* Attack lines from threat actors to target */}
            {threatActors.map((actor) => (
              <g key={actor.ip}>
                <line
                  x1={actor.cx}
                  y1={actor.cy}
                  x2={targetLocation.cx}
                  y2={targetLocation.cy}
                  stroke={actor.risk === "critical" ? "hsl(var(--critical))" : actor.risk === "high" ? "hsl(var(--warning))" : "hsl(var(--info))"}
                  strokeOpacity={0.4}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              </g>
            ))}

            {/* Target location (HQ) */}
            <circle cx={targetLocation.cx} cy={targetLocation.cy} r={8} fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <circle cx={targetLocation.cx} cy={targetLocation.cy} r={3} fill="hsl(var(--primary))" />
            <text x={targetLocation.cx} y={targetLocation.cy - 14} textAnchor="middle" fill="hsl(var(--primary))" fontSize={9} fontWeight={600}>HQ</text>

            {/* Threat actor points */}
            {threatActors.map((actor) => (
              <g key={actor.ip}>
                <circle cx={actor.cx} cy={actor.cy} r={actor.risk === "critical" ? 10 : 7}
                  fill={actor.risk === "critical" ? "hsl(var(--critical))" : actor.risk === "high" ? "hsl(var(--warning))" : "hsl(var(--info))"}
                  fillOpacity={0.2}
                  stroke={actor.risk === "critical" ? "hsl(var(--critical))" : actor.risk === "high" ? "hsl(var(--warning))" : "hsl(var(--info))"}
                  strokeWidth={1.5}
                />
                <circle cx={actor.cx} cy={actor.cy} r={3}
                  fill={actor.risk === "critical" ? "hsl(var(--critical))" : actor.risk === "high" ? "hsl(var(--warning))" : "hsl(var(--info))"}
                />
                {actor.risk === "critical" && (
                  <circle cx={actor.cx} cy={actor.cy} r={14}
                    fill="none"
                    stroke="hsl(var(--critical))"
                    strokeOpacity={0.3}
                    strokeWidth={1}
                  >
                    <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Threat Actor Table */}
        <div className="mt-4 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3" />
            Threat Actor IPs — Password Spray Campaign
          </p>
          <div className="divide-y divide-border/40">
            {threatActors.map((actor) => {
              const cfg = riskConfig[actor.risk];
              return (
                <div key={actor.ip} className="flex items-center gap-3 py-2">
                  <MapPin className={`w-3.5 h-3.5 ${cfg.color} shrink-0 ${cfg.pulse}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono">{actor.ip}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium capitalize ${
                        actor.risk === "critical" ? "bg-critical/15 text-critical" :
                        actor.risk === "high" ? "bg-warning/15 text-warning" :
                        "bg-info/15 text-info"
                      }`}>{actor.risk}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{actor.location}</p>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">{actor.attempts} attempts</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
