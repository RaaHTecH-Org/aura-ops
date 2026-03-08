import { Activity, ShieldAlert, AlertTriangle, Bell, CheckCircle2, Radio } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSimulation, SimNotification } from "@/hooks/use-simulation";

const severityIcon: Record<SimNotification["type"], JSX.Element> = {
  critical: <ShieldAlert className="w-3.5 h-3.5 text-critical shrink-0" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />,
  info: <Bell className="w-3.5 h-3.5 text-info shrink-0" />,
  success: <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />,
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export default function LiveActivityFeed() {
  const { notifications, isSimulating } = useSimulation();

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="section-title">Live Activity Feed</h2>
          {isSimulating && (
            <span className="flex items-center gap-1 text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full font-medium">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              Live
            </span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">
          {notifications.length} events
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="px-5 py-10 text-center text-xs text-muted-foreground">
          Enable Live Demo Mode to see real-time events
        </div>
      ) : (
        <ScrollArea className="h-[250px]">
          <div className="divide-y divide-border/40">
            {notifications.map((n) => (
              <div key={n.id} className="px-4 py-2.5 flex items-start gap-3 hover:bg-muted/20 transition-colors">
                {severityIcon[n.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed">{n.message}</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono shrink-0 mt-0.5">
                  {timeAgo(n.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
