import { Shield, Ban, Globe, AlertTriangle, Clock } from "lucide-react";
import { useSecurityAudit, type AuditEntry } from "@/hooks/use-security-audit";

const actionConfig: Record<AuditEntry["action"], { icon: typeof Ban; label: string; color: string }> = {
  block_ip: { icon: Ban, label: "IP Blocked", color: "text-critical" },
  geo_fence: { icon: Globe, label: "Geo-fence Enabled", color: "text-warning" },
  escalate_soc: { icon: AlertTriangle, label: "Escalated to SOC", color: "text-info" },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export default function SecurityAuditLog() {
  const entries = useSecurityAudit();

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h2 className="section-title">Security Actions</h2>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">
          {entries.length} action{entries.length !== 1 ? "s" : ""} logged
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="p-6 text-center">
          <Shield className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">No actions taken yet</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">
            Block IPs, enable geo-fencing, or escalate threats to see them here
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/40 max-h-64 overflow-y-auto">
          {entries.map((entry) => {
            const cfg = actionConfig[entry.action];
            const Icon = cfg.icon;
            return (
              <div key={entry.id} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/20 transition-colors">
                <div className={`mt-0.5 p-1.5 rounded-md bg-secondary/40 ${cfg.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{entry.target}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{entry.detail}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground/60">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{timeAgo(entry.timestamp)}</span>
                    <span className="mx-1">·</span>
                    <span>{entry.actor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
