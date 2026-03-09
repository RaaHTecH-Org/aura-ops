import { useState } from "react";
import { Globe, ShieldAlert, MapPin, Shield, Clock, Server, Ban, AlertTriangle, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RelatedAlert {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
}

interface ThreatActor {
  ip: string;
  location: string;
  country: string;
  col: number;
  row: number;
  attempts: number;
  risk: "critical" | "high" | "medium";
  isp: string;
  asn: string;
  firstSeen: string;
  lastAttempt: string;
  relatedAlerts: RelatedAlert[];
}

const threatActors: ThreatActor[] = [
  {
    ip: "185.220.101.xx", location: "Moscow, Russia", country: "RU",
    col: 29, row: 5, attempts: 47, risk: "critical",
    isp: "Selectel Ltd", asn: "AS49505",
    firstSeen: "2024-01-15 03:42 UTC", lastAttempt: "2 min ago",
    relatedAlerts: [
      { id: "DEF-1001", title: "Brute force attack detected", severity: "critical" },
      { id: "DEF-1002", title: "Multiple failed auth attempts", severity: "high" },
    ],
  },
  {
    ip: "91.240.118.xx", location: "Kyiv, Ukraine", country: "UA",
    col: 27, row: 6, attempts: 23, risk: "high",
    isp: "Datagroup JSC", asn: "AS21497",
    firstSeen: "2024-01-16 11:20 UTC", lastAttempt: "8 min ago",
    relatedAlerts: [{ id: "DEF-1003", title: "Suspicious login pattern", severity: "high" }],
  },
  {
    ip: "194.36.189.xx", location: "Bucharest, Romania", country: "RO",
    col: 26, row: 7, attempts: 15, risk: "high",
    isp: "M247 Ltd", asn: "AS9009",
    firstSeen: "2024-01-17 08:15 UTC", lastAttempt: "15 min ago",
    relatedAlerts: [{ id: "DEF-1004", title: "Password spray attempt", severity: "high" }],
  },
  {
    ip: "45.155.205.xx", location: "Amsterdam, Netherlands", country: "NL",
    col: 22, row: 5, attempts: 8, risk: "medium",
    isp: "IPXO Limited", asn: "AS206092",
    firstSeen: "2024-01-18 14:30 UTC", lastAttempt: "32 min ago",
    relatedAlerts: [],
  },
  {
    ip: "103.75.201.xx", location: "Beijing, China", country: "CN",
    col: 37, row: 6, attempts: 12, risk: "high",
    isp: "Alibaba Cloud", asn: "AS37963",
    firstSeen: "2024-01-16 22:45 UTC", lastAttempt: "5 min ago",
    relatedAlerts: [{ id: "DEF-1005", title: "Credential stuffing detected", severity: "high" }],
  },
];

const hqLocation = { col: 9, row: 7, label: "HQ — New York" };

const riskConfig = {
  critical: { color: "text-critical", bg: "bg-critical", pulse: "animate-pulse", stroke: "hsl(var(--critical))" },
  high: { color: "text-warning", bg: "bg-warning", pulse: "", stroke: "hsl(var(--warning))" },
  medium: { color: "text-info", bg: "bg-info", pulse: "", stroke: "hsl(var(--info))" },
};

// High-detail dot-matrix world map
const worldDots: [number, number][] = [
  // Greenland
  [14,1],[15,1],[16,1],[17,1],[14,2],[15,2],[16,2],[17,2],[15,3],[16,3],
  // Iceland
  [18,2],[19,2],
  // North America — high detail
  [5,2],[6,2],[7,2],[8,2],[9,2],
  [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
  [3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
  [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],
  [5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],
  [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],
  [7,8],[8,8],[9,8],[10,8],[11,8],
  [8,9],[9,9],[10,9],[11,9],
  [9,10],[10,10],[11,10],
  // Central America
  [11,11],[12,11],[11,12],[12,12],
  // Caribbean
  [13,10],[14,10],[13,11],
  // South America
  [13,12],[14,12],[15,12],
  [12,13],[13,13],[14,13],[15,13],[16,13],
  [12,14],[13,14],[14,14],[15,14],[16,14],[17,14],
  [13,15],[14,15],[15,15],[16,15],[17,15],
  [13,16],[14,16],[15,16],[16,16],[17,16],
  [14,17],[15,17],[16,17],
  [14,18],[15,18],[16,18],
  [15,19],[16,19],
  [15,20],
  // UK / Ireland
  [20,3],[21,3],[20,4],[21,4],
  // Europe — high detail
  [22,2],[23,2],[24,2],[25,2],
  [21,3],[22,3],[23,3],[24,3],[25,3],[26,3],
  [20,4],[21,4],[22,4],[23,4],[24,4],[25,4],[26,4],[27,4],
  [21,5],[22,5],[23,5],[24,5],[25,5],[26,5],[27,5],[28,5],
  [22,6],[23,6],[24,6],[25,6],[26,6],[27,6],[28,6],
  [23,7],[24,7],[25,7],[26,7],
  // Middle East
  [28,7],[29,7],[30,7],[31,7],
  [28,8],[29,8],[30,8],[31,8],
  [29,9],[30,9],
  // Africa — high detail
  [22,8],[23,8],[24,8],[25,8],[26,8],[27,8],
  [21,9],[22,9],[23,9],[24,9],[25,9],[26,9],[27,9],[28,9],
  [21,10],[22,10],[23,10],[24,10],[25,10],[26,10],[27,10],[28,10],
  [22,11],[23,11],[24,11],[25,11],[26,11],[27,11],
  [22,12],[23,12],[24,12],[25,12],[26,12],[27,12],
  [23,13],[24,13],[25,13],[26,13],
  [24,14],[25,14],[26,14],
  [24,15],[25,15],
  // Central Asia / Russia
  [29,3],[30,3],[31,3],[32,3],[33,3],[34,3],[35,3],
  [28,4],[29,4],[30,4],[31,4],[32,4],[33,4],[34,4],[35,4],[36,4],
  [29,5],[30,5],[31,5],[32,5],[33,5],[34,5],[35,5],[36,5],
  [30,6],[31,6],[32,6],[33,6],[34,6],[35,6],[36,6],
  // East Asia — high detail
  [35,5],[36,5],[37,5],[38,5],
  [34,6],[35,6],[36,6],[37,6],[38,6],[39,6],
  [35,7],[36,7],[37,7],[38,7],[39,7],
  [36,8],[37,8],[38,8],
  // Japan / Korea
  [40,5],[40,6],[41,5],[41,6],[41,7],
  // Southeast Asia
  [37,9],[38,9],[39,9],[40,9],
  [38,10],[39,10],[40,10],[41,10],
  [39,11],[40,11],[41,11],
  // India / Subcontinent
  [32,7],[33,7],[34,7],
  [32,8],[33,8],[34,8],[35,8],
  [33,9],[34,9],[35,9],
  [34,10],[35,10],
  [34,11],
  // Indonesia / Philippines
  [40,12],[41,12],[42,12],
  [40,13],[41,13],
  // Australia — high detail
  [38,14],[39,14],[40,14],[41,14],[42,14],
  [37,15],[38,15],[39,15],[40,15],[41,15],[42,15],
  [38,16],[39,16],[40,16],[41,16],[42,16],
  [39,17],[40,17],[41,17],
  [39,18],[40,18],
  // New Zealand
  [43,17],[43,18],
];

const CELL = 18;
const RADIUS = 3;
const COLS = 46;
const ROWS = 22;

export default function ThreatMap() {
  const [selectedActor, setSelectedActor] = useState<ThreatActor | null>(null);
  const [hoveredActor, setHoveredActor] = useState<ThreatActor | null>(null);

  const handleBlockIP = (ip: string) => {
    toast.success(`Blocked IP range ${ip.replace('xx', '0/24')}`, { description: "Firewall rule created successfully" });
    setSelectedActor(null);
  };
  const handleEnableGeoFencing = (country: string) => {
    toast.success(`Geo-fencing enabled for ${country}`, { description: "All traffic from this region will be blocked" });
  };
  const handleEscalateToSOC = (ip: string) => {
    toast.info(`Escalated to SOC team`, { description: `Ticket created for IP ${ip}` });
  };

  const actorSet = new Set(threatActors.map(a => `${a.col},${a.row}`));

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-critical" />
          <h2 className="section-title">Threat Origin Map</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground font-mono">
            {threatActors.reduce((s, a) => s + a.attempts, 0)} total attempts
          </span>
          <span className="text-[10px] bg-critical/15 text-critical px-2 py-0.5 rounded-full font-medium">
            INC-008 — Active Threat
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* SVG Dot-Matrix World Map */}
        <div className="relative w-full overflow-hidden rounded-lg bg-muted/10 border border-border/20">
          <svg
            viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continent dots */}
            {worldDots.map(([c, r]) => {
              if (actorSet.has(`${c},${r}`)) return null;
              return (
                <circle
                  key={`d-${c}-${r}`}
                  cx={c * CELL + CELL / 2}
                  cy={r * CELL + CELL / 2}
                  r={RADIUS}
                  fill="hsl(var(--muted-foreground))"
                  opacity={0.12}
                />
              );
            })}

            {/* Attack lines */}
            {threatActors.map((actor) => {
              const ax = actor.col * CELL + CELL / 2;
              const ay = actor.row * CELL + CELL / 2;
              const tx = hqLocation.col * CELL + CELL / 2;
              const ty = hqLocation.row * CELL + CELL / 2;
              const cfg = riskConfig[actor.risk];
              const isHovered = hoveredActor?.ip === actor.ip;
              return (
                <line
                  key={`line-${actor.ip}`}
                  x1={ax} y1={ay} x2={tx} y2={ty}
                  stroke={cfg.stroke}
                  strokeOpacity={isHovered ? 0.5 : 0.2}
                  strokeWidth={isHovered ? 1.5 : 0.8}
                  strokeDasharray="3 3"
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Animated attack bullets */}
            {threatActors.map((actor, idx) => {
              const ax = actor.col * CELL + CELL / 2;
              const ay = actor.row * CELL + CELL / 2;
              const tx = hqLocation.col * CELL + CELL / 2;
              const ty = hqLocation.row * CELL + CELL / 2;
              const cfg = riskConfig[actor.risk];
              const dur = actor.risk === "critical" ? "1.5s" : actor.risk === "high" ? "2s" : "2.5s";
              const delay = `${idx * 0.4}s`;
              const path = `M${ax},${ay} L${tx},${ty}`;
              return (
                <g key={`bullet-${actor.ip}`}>
                  <circle r={actor.risk === "critical" ? 3.5 : 2.5} fill={cfg.stroke}>
                    <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={delay} />
                    <animate attributeName="opacity" values="1;0.6;1" dur={dur} repeatCount="indefinite" begin={delay} />
                  </circle>
                  {actor.risk === "critical" && (
                    <circle r={6} fill={cfg.stroke} opacity={0.2}>
                      <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={delay} />
                      <animate attributeName="opacity" values="0.2;0.05;0.2" dur={dur} repeatCount="indefinite" begin={delay} />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* HQ target */}
            {(() => {
              const x = hqLocation.col * CELL + CELL / 2;
              const y = hqLocation.row * CELL + CELL / 2;
              return (
                <g>
                  <circle cx={x} cy={y} r={10} fill="hsl(var(--primary))" fillOpacity={0.12} stroke="hsl(var(--primary))" strokeWidth={1.5} />
                  <circle cx={x} cy={y} r={4} fill="hsl(var(--primary))" />
                  <circle cx={x} cy={y} r={10} fill="none" stroke="hsl(var(--primary))" strokeOpacity={0.3}>
                    <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x={x} y={y - 15} textAnchor="middle" fill="hsl(var(--primary))" fontSize={9} fontWeight={600}>HQ</text>
                </g>
              );
            })()}

            {/* Threat actor points — interactive */}
            {threatActors.map((actor) => {
              const x = actor.col * CELL + CELL / 2;
              const y = actor.row * CELL + CELL / 2;
              const cfg = riskConfig[actor.risk];
              const isHovered = hoveredActor?.ip === actor.ip;
              return (
                <g
                  key={actor.ip}
                  className="cursor-pointer"
                  onClick={() => setSelectedActor(actor)}
                  onMouseEnter={() => setHoveredActor(actor)}
                  onMouseLeave={() => setHoveredActor(null)}
                >
                  <circle cx={x} cy={y} r={isHovered ? 12 : 9} fill={cfg.stroke} fillOpacity={isHovered ? 0.3 : 0.15} stroke={cfg.stroke} strokeWidth={1.5} className="transition-all duration-150" />
                  <circle cx={x} cy={y} r={3.5} fill={cfg.stroke} />
                  {actor.risk === "critical" && (
                    <circle cx={x} cy={y} r={9} fill="none" stroke={cfg.stroke} strokeOpacity={0.3}>
                      <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Hover tooltip on map */}
            {hoveredActor && (() => {
              const x = hoveredActor.col * CELL + CELL / 2;
              const y = hoveredActor.row * CELL + CELL / 2;
              const tooltipW = 90;
              const tooltipH = 32;
              const tx = Math.min(Math.max(x - tooltipW / 2, 4), COLS * CELL - tooltipW - 4);
              const ty = y - 22 - tooltipH;
              return (
                <g className="pointer-events-none">
                  <rect x={tx} y={ty} width={tooltipW} height={tooltipH} rx={4} fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.5} />
                  <text x={tx + tooltipW / 2} y={ty + 12} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={7} fontWeight={600} fontFamily="monospace">{hoveredActor.ip}</text>
                  <text x={tx + tooltipW / 2} y={ty + 22} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={6}>{hoveredActor.location} — {hoveredActor.attempts} attempts</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>HQ Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-critical" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info" />
            <span>Medium</span>
          </div>
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
              const isHovered = hoveredActor?.ip === actor.ip;
              return (
                <div
                  key={actor.ip}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-3 cursor-pointer rounded-md px-2 -mx-2 transition-colors ${isHovered ? "bg-muted/30" : "hover:bg-muted/20"}`}
                  onClick={() => setSelectedActor(actor)}
                  onMouseEnter={() => setHoveredActor(actor)}
                  onMouseLeave={() => setHoveredActor(null)}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className={`w-3.5 h-3.5 ${cfg.color} shrink-0 ${cfg.pulse}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono">{actor.ip}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium capitalize ${
                          actor.risk === "critical" ? "bg-critical/15 text-critical" :
                          actor.risk === "high" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"
                        }`}>{actor.risk}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{actor.location}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground sm:ml-auto">{actor.attempts} attempts</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedActor} onOpenChange={() => setSelectedActor(null)}>
        <DialogContent className="max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
          {selectedActor && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Shield className={`w-5 h-5 ${riskConfig[selectedActor.risk].color}`} />
                  <DialogTitle className="text-base">Threat Actor Details</DialogTitle>
                </div>
                <DialogDescription className="sr-only">
                  Detailed information about threat actor {selectedActor.ip}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="text-sm font-mono font-medium">{selectedActor.ip}</p>
                    <p className="text-xs text-muted-foreground">{selectedActor.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    selectedActor.risk === "critical" ? "bg-critical/15 text-critical" :
                    selectedActor.risk === "high" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"
                  }`}>
                    {selectedActor.risk} risk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">ISP</p>
                    <p className="text-xs font-medium">{selectedActor.isp}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">ASN</p>
                    <p className="text-xs font-mono">{selectedActor.asn}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Attack Timeline
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-muted/20 rounded">
                      <p className="text-muted-foreground text-[10px]">First Seen</p>
                      <p className="font-mono">{selectedActor.firstSeen}</p>
                    </div>
                    <div className="p-2 bg-muted/20 rounded">
                      <p className="text-muted-foreground text-[10px]">Last Attempt</p>
                      <p className="font-mono text-critical">{selectedActor.lastAttempt}</p>
                    </div>
                    <div className="p-2 bg-muted/20 rounded">
                      <p className="text-muted-foreground text-[10px]">Total Attempts</p>
                      <p className="font-mono font-semibold">{selectedActor.attempts}</p>
                    </div>
                  </div>
                </div>

                {selectedActor.relatedAlerts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3" />
                      Related Defender Alerts
                    </p>
                    <div className="space-y-2">
                      {selectedActor.relatedAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                          <ShieldAlert className={`w-4 h-4 shrink-0 ${
                            alert.severity === "critical" ? "text-critical" :
                            alert.severity === "high" ? "text-warning" : "text-info"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate">{alert.title}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{alert.id}</p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Server className="w-3 h-3" />
                    Recommended Actions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="destructive" className="h-8 text-xs" onClick={() => handleBlockIP(selectedActor.ip)}>
                      <Ban className="w-3 h-3 mr-1" /> Block IP Range
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleEnableGeoFencing(selectedActor.country)}>
                      <Globe className="w-3 h-3 mr-1" /> Enable Geo-fencing
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={() => handleEscalateToSOC(selectedActor.ip)}>
                      <AlertTriangle className="w-3 h-3 mr-1" /> Escalate to SOC
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
