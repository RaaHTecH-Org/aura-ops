import { useState } from "react";
import { Globe, ShieldAlert, MapPin, Shield, Clock, Server, Ban, AlertTriangle, ExternalLink, X } from "lucide-react";
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
  cx: number;
  cy: number;
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
    ip: "185.220.101.xx", 
    location: "Moscow, Russia", 
    country: "RU", 
    cx: 590, 
    cy: 145, 
    attempts: 47, 
    risk: "critical",
    isp: "Selectel Ltd",
    asn: "AS49505",
    firstSeen: "2024-01-15 03:42 UTC",
    lastAttempt: "2 min ago",
    relatedAlerts: [
      { id: "DEF-1001", title: "Brute force attack detected", severity: "critical" },
      { id: "DEF-1002", title: "Multiple failed auth attempts", severity: "high" },
    ]
  },
  { 
    ip: "91.240.118.xx", 
    location: "Kyiv, Ukraine", 
    country: "UA", 
    cx: 565, 
    cy: 155, 
    attempts: 23, 
    risk: "high",
    isp: "Datagroup JSC",
    asn: "AS21497",
    firstSeen: "2024-01-16 11:20 UTC",
    lastAttempt: "8 min ago",
    relatedAlerts: [
      { id: "DEF-1003", title: "Suspicious login pattern", severity: "high" },
    ]
  },
  { 
    ip: "194.36.189.xx", 
    location: "Bucharest, Romania", 
    country: "RO", 
    cx: 550, 
    cy: 165, 
    attempts: 15, 
    risk: "high",
    isp: "M247 Ltd",
    asn: "AS9009",
    firstSeen: "2024-01-17 08:15 UTC",
    lastAttempt: "15 min ago",
    relatedAlerts: [
      { id: "DEF-1004", title: "Password spray attempt", severity: "high" },
    ]
  },
  { 
    ip: "45.155.205.xx", 
    location: "Amsterdam, Netherlands", 
    country: "NL", 
    cx: 500, 
    cy: 140, 
    attempts: 8, 
    risk: "medium",
    isp: "IPXO Limited",
    asn: "AS206092",
    firstSeen: "2024-01-18 14:30 UTC",
    lastAttempt: "32 min ago",
    relatedAlerts: []
  },
  { 
    ip: "103.75.201.xx", 
    location: "Beijing, China", 
    country: "CN", 
    cx: 710, 
    cy: 175, 
    attempts: 12, 
    risk: "high",
    isp: "Alibaba Cloud",
    asn: "AS37963",
    firstSeen: "2024-01-16 22:45 UTC",
    lastAttempt: "5 min ago",
    relatedAlerts: [
      { id: "DEF-1005", title: "Credential stuffing detected", severity: "high" },
    ]
  },
];

const targetLocation = { label: "HQ — New York, US", cx: 260, cy: 175 };

const riskConfig = {
  critical: { color: "text-critical", bg: "bg-critical", ring: "ring-critical/30", pulse: "animate-pulse", stroke: "hsl(var(--critical))" },
  high: { color: "text-warning", bg: "bg-warning", ring: "ring-warning/30", pulse: "", stroke: "hsl(var(--warning))" },
  medium: { color: "text-info", bg: "bg-info", ring: "ring-info/30", pulse: "", stroke: "hsl(var(--info))" },
};

export default function ThreatMap() {
  const [selectedActor, setSelectedActor] = useState<ThreatActor | null>(null);

  const handleBlockIP = (ip: string) => {
    toast.success(`Blocked IP range ${ip.replace('xx', '0/24')}`, {
      description: "Firewall rule created successfully",
    });
    setSelectedActor(null);
  };

  const handleEnableGeoFencing = (country: string) => {
    toast.success(`Geo-fencing enabled for ${country}`, {
      description: "All traffic from this region will be blocked",
    });
  };

  const handleEscalateToSOC = (ip: string) => {
    toast.info(`Escalated to SOC team`, {
      description: `Ticket created for IP ${ip}`,
    });
  };

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
              <g key={`line-${actor.ip}`}>
                <line
                  x1={actor.cx}
                  y1={actor.cy}
                  x2={targetLocation.cx}
                  y2={targetLocation.cy}
                  stroke={riskConfig[actor.risk].stroke}
                  strokeOpacity={0.25}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              </g>
            ))}

            {/* Animated attack bullets */}
            {threatActors.map((actor, idx) => {
              const cfg = riskConfig[actor.risk];
              const duration = actor.risk === "critical" ? "1.5s" : actor.risk === "high" ? "2s" : "2.5s";
              const delay = `${idx * 0.3}s`;
              const path = `M${actor.cx},${actor.cy} L${targetLocation.cx},${targetLocation.cy}`;
              
              return (
                <g key={`bullet-${actor.ip}`}>
                  {/* Primary bullet */}
                  <circle r={actor.risk === "critical" ? 4 : 3} fill={cfg.stroke}>
                    <animateMotion 
                      dur={duration} 
                      repeatCount="indefinite" 
                      path={path}
                      begin={delay}
                    />
                    <animate 
                      attributeName="opacity" 
                      values="1;0.8;1" 
                      dur={duration} 
                      repeatCount="indefinite" 
                      begin={delay}
                    />
                  </circle>
                  {/* Trail glow for critical */}
                  {actor.risk === "critical" && (
                    <circle r={6} fill={cfg.stroke} opacity={0.3}>
                      <animateMotion 
                        dur={duration} 
                        repeatCount="indefinite" 
                        path={path}
                        begin={delay}
                      />
                      <animate 
                        attributeName="opacity" 
                        values="0.3;0.1;0.3" 
                        dur={duration} 
                        repeatCount="indefinite" 
                        begin={delay}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Target location (HQ) */}
            <circle cx={targetLocation.cx} cy={targetLocation.cy} r={12} fill="hsl(var(--primary))" fillOpacity={0.15} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <circle cx={targetLocation.cx} cy={targetLocation.cy} r={5} fill="hsl(var(--primary))" />
            <text x={targetLocation.cx} y={targetLocation.cy - 18} textAnchor="middle" fill="hsl(var(--primary))" fontSize={10} fontWeight={600} className="hidden sm:block">HQ</text>

            {/* Impact pulse on target */}
            <circle cx={targetLocation.cx} cy={targetLocation.cy} r={12} fill="none" stroke="hsl(var(--primary))" strokeOpacity={0.4}>
              <animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Threat actor points - clickable */}
            {threatActors.map((actor) => (
              <g 
                key={actor.ip} 
                className="cursor-pointer" 
                onClick={() => setSelectedActor(actor)}
              >
                <circle 
                  cx={actor.cx} 
                  cy={actor.cy} 
                  r={actor.risk === "critical" ? 14 : 10}
                  fill={riskConfig[actor.risk].stroke}
                  fillOpacity={0.15}
                  stroke={riskConfig[actor.risk].stroke}
                  strokeWidth={1.5}
                  className="transition-all hover:fill-opacity-30"
                />
                <circle 
                  cx={actor.cx} 
                  cy={actor.cy} 
                  r={4}
                  fill={riskConfig[actor.risk].stroke}
                />
                {actor.risk === "critical" && (
                  <circle 
                    cx={actor.cx} 
                    cy={actor.cy} 
                    r={14}
                    fill="none"
                    stroke="hsl(var(--critical))"
                    strokeOpacity={0.3}
                    strokeWidth={1}
                  >
                    <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Threat Actor Table - Mobile responsive */}
        <div className="mt-4 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3" />
            Threat Actor IPs — Password Spray Campaign
          </p>
          <div className="divide-y divide-border/40">
            {threatActors.map((actor) => {
              const cfg = riskConfig[actor.risk];
              return (
                <div 
                  key={actor.ip} 
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-3 cursor-pointer hover:bg-muted/20 rounded-md px-2 -mx-2 transition-colors"
                  onClick={() => setSelectedActor(actor)}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className={`w-3.5 h-3.5 ${cfg.color} shrink-0 ${cfg.pulse}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono">{actor.ip}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium capitalize ${
                          actor.risk === "critical" ? "bg-critical/15 text-critical" :
                          actor.risk === "high" ? "bg-warning/15 text-warning" :
                          "bg-info/15 text-info"
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

      {/* Threat Actor Detail Dialog */}
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
                {/* IP and Risk Badge */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="text-sm font-mono font-medium">{selectedActor.ip}</p>
                    <p className="text-xs text-muted-foreground">{selectedActor.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    selectedActor.risk === "critical" ? "bg-critical/15 text-critical" :
                    selectedActor.risk === "high" ? "bg-warning/15 text-warning" :
                    "bg-info/15 text-info"
                  }`}>
                    {selectedActor.risk} risk
                  </span>
                </div>

                {/* Geolocation Details */}
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

                {/* Attack Timeline */}
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

                {/* Related Defender Alerts */}
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

                {/* Recommended Actions */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Server className="w-3 h-3" />
                    Recommended Actions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="h-8 text-xs"
                      onClick={() => handleBlockIP(selectedActor.ip)}
                    >
                      <Ban className="w-3 h-3 mr-1" />
                      Block IP Range
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => handleEnableGeoFencing(selectedActor.country)}
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      Enable Geo-fencing
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="h-8 text-xs"
                      onClick={() => handleEscalateToSOC(selectedActor.ip)}
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Escalate to SOC
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
