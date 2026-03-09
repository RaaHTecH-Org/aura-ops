import { useState } from "react";
import { Bot, ArrowRight, ChevronDown, TrendingUp, Minus, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { rootCauseClusters } from "@/data/mock-data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const trendIcon = {
  escalating: <TrendingUp className="w-3 h-3 text-critical" />,
  stable: <Minus className="w-3 h-3 text-warning" />,
  declining: <TrendingDown className="w-3 h-3 text-success" />,
};

const severityDot: Record<string, string> = {
  critical: "bg-critical shadow-[0_0_6px_hsl(var(--critical)/0.5)]",
  high: "bg-warning shadow-[0_0_6px_hsl(var(--warning)/0.5)]",
  medium: "bg-info shadow-[0_0_6px_hsl(var(--info)/0.5)]",
};

export default function RootCauseClusters() {
  const [openId, setOpenId] = useState<string | null>(rootCauseClusters[0]?.id ?? null);

  return (
    <div className="ai-panel flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-primary animate-pulse-glow" />
        <h2 className="text-sm font-semibold">Root Cause Clusters</h2>
        <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full ml-auto font-medium">
          {rootCauseClusters.length} patterns
        </span>
      </div>
      <div className="space-y-2 flex-1">
        {rootCauseClusters.map((cluster) => (
          <Collapsible
            key={cluster.id}
            open={openId === cluster.id}
            onOpenChange={(open) => setOpenId(open ? cluster.id : null)}
          >
            <CollapsibleTrigger className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors text-left group">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${severityDot[cluster.severity]}`} />
              <span className="text-xs font-medium flex-1">{cluster.category}</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">
                {cluster.incidentIds.length}
              </span>
              {trendIcon[cluster.trend]}
              <ChevronDown className="w-3 h-3 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pl-6 pr-3 pb-2 space-y-1.5">
                {cluster.insights.map((insight, i) => (
                  <p key={i} className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-2.5 py-0.5">
                    {insight}
                  </p>
                ))}
                <p className="text-[10px] text-muted-foreground/70 font-mono">
                  Linked: {cluster.incidentIds.join(", ")}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      <Link to="/copilot" className="mt-4 flex items-center gap-2 text-xs text-primary hover:underline font-medium">
        Open AI Copilot <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
