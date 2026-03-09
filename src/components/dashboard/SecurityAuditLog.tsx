import { Shield, Ban, Globe, AlertTriangle, Clock, Download, Trash2 } from "lucide-react";
import { useSecurityAudit, clearAuditEntries, type AuditEntry } from "@/hooks/use-security-audit";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const actionConfig: Record<AuditEntry["action"], { icon: typeof Ban; label: string; color: string }> = {
  block_ip: { icon: Ban, label: "IP Blocked", color: "text-critical" },
  geo_fence: { icon: Globe, label: "Geo-fence Enabled", color: "text-warning" },
  escalate_soc: { icon: AlertTriangle, label: "Escalated to SOC", color: "text-info" },
};

const actionLabels: Record<AuditEntry["action"], string> = {
  block_ip: "IP Blocked",
  geo_fence: "Geo-fence Enabled",
  escalate_soc: "Escalated to SOC",
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function exportAuditLog(entries: AuditEntry[]) {
  const header = "Timestamp,Action,Target,Detail,Actor";
  const rows = entries.map((e) =>
    `"${e.timestamp.toISOString()}","${actionLabels[e.action]}","${e.target}","${e.detail}","${e.actor}"`
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `security-audit-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Audit log exported", { description: `${entries.length} entries saved as CSV` });
}

export default function SecurityAuditLog() {
  const entries = useSecurityAudit();

  const handleClear = () => {
    const count = entries.length;
    clearAuditEntries();
    toast.success("Audit log cleared", { description: `${count} entries removed` });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h2 className="section-title">Security Actions</h2>
        </div>
        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] gap-1" onClick={() => exportAuditLog(entries)}>
                <Download className="w-3 h-3" /> Export
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] gap-1 text-muted-foreground hover:text-critical" onClick={handleClear}>
                <Trash2 className="w-3 h-3" /> Clear
              </Button>
            </>
          )}
          <span className="text-[10px] text-muted-foreground font-mono">
            {entries.length} action{entries.length !== 1 ? "s" : ""} logged
          </span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {entries.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 text-center"
          >
            <Shield className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No actions taken yet</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">
              Block IPs, enable geo-fencing, or escalate threats to see them here
            </p>
          </motion.div>
        ) : (
          <div className="divide-y divide-border/40 max-h-64 overflow-y-auto">
            <AnimatePresence initial={false}>
              {entries.map((entry, idx) => {
                const cfg = actionConfig[entry.action];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    exit={{ opacity: 0, height: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: idx < 3 ? idx * 0.05 : 0 }}
                    className="px-4 py-3 flex items-start gap-3 hover:bg-muted/20 transition-colors overflow-hidden"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: idx < 3 ? idx * 0.05 + 0.1 : 0.1 }}
                      className={`mt-0.5 p-1.5 rounded-md bg-secondary/40 ${cfg.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.div>
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
