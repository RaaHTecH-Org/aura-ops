import { Timer, Clock, ShieldAlert, Server } from "lucide-react";
import { timeToBurn } from "@/data/mock-data";

function burnColor(remaining: number, total: number): string {
  const pct = remaining / total;
  if (pct > 0.5) return "bg-success";
  if (pct > 0.2) return "bg-warning";
  return "bg-critical";
}

function burnTextColor(remaining: number, total: number): string {
  const pct = remaining / total;
  if (pct > 0.5) return "text-success";
  if (pct > 0.2) return "text-warning";
  return "text-critical";
}

function formatTime(minutes: number): string {
  if (minutes >= 60) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  return `${minutes}m`;
}

const burnMetrics = [
  { key: "slaBreach" as const, label: "SLA Breach", icon: Clock },
  { key: "capacityExhaustion" as const, label: "Capacity", icon: Server },
  { key: "securityEscalation" as const, label: "Security Esc.", icon: ShieldAlert },
];

export default function TimeToBurn() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-warning" />
          <h2 className="section-title">Time to Burn</h2>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">Predictive countdown</span>
      </div>
      <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
        {timeToBurn.map((item) => (
          <div key={item.incidentId} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">{item.title}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{item.incidentId}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${
                item.severity === "critical" ? "bg-critical/15 text-critical" : "bg-warning/15 text-warning"
              }`}>{item.severity}</span>
            </div>
            <div className="space-y-2.5">
              {burnMetrics.map((metric) => {
                const data = item[metric.key];
                const pct = (data.minutes / data.total) * 100;
                return (
                  <div key={metric.key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <metric.icon className={`w-3 h-3 ${burnTextColor(data.minutes, data.total)}`} />
                        <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono font-medium ${burnTextColor(data.minutes, data.total)}`}>
                        {formatTime(data.minutes)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${burnColor(data.minutes, data.total)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
