import { Zap, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { autopilotPreviewActions } from "@/data/mock-data";

export default function AutopilotPreview() {
  return (
    <div className="ai-panel">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold">Autopilot Actions</h2>
        <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full ml-auto font-medium">
          {autopilotPreviewActions.length} queued
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {autopilotPreviewActions.map((item) => (
          <Link
            key={item.id}
            to={`/autopilot?incident=${item.id}`}
            className="bg-secondary/50 border border-border/50 rounded-lg p-4 hover:border-primary/20 hover:bg-secondary transition-all group block"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{item.action}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{item.system}</p>

                {/* Confidence bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Confidence</span>
                    <span className="text-[11px] font-mono font-medium text-primary">{item.confidence}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${
                    item.severity === "critical" ? "bg-critical/15 text-critical" :
                    item.severity === "high" ? "bg-warning/15 text-warning" :
                    item.severity === "medium" ? "bg-info/15 text-info" :
                    "bg-muted text-muted-foreground"
                  }`}>{item.severity}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    {item.requiresApproval
                      ? <><Lock className="w-2.5 h-2.5" /> {item.approver}</>
                      : <><ShieldCheck className="w-2.5 h-2.5 text-success" /> Auto</>
                    }
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto font-mono">~{item.estimatedResolution}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
