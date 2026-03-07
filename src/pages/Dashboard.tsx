import {
  AlertTriangle,
  ShieldAlert,
  FileText,
  Monitor,
  Shield,
  Activity,
  Bot,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardStats, aiInsights, incidents } from "@/data/mock-data";

const statCards = [
  { label: "Open Incidents", value: dashboardStats.openIncidents, icon: AlertTriangle, color: "text-warning" },
  { label: "Critical Incidents", value: dashboardStats.criticalIncidents, icon: ShieldAlert, color: "text-critical" },
  { label: "Pending Requests", value: dashboardStats.pendingRequests, icon: FileText, color: "text-info" },
  { label: "Security Alerts", value: dashboardStats.securityAlerts, icon: Shield, color: "text-critical" },
  { label: "Assets Tracked", value: dashboardStats.trackedAssets, icon: Monitor, color: "text-foreground" },
  { label: "System Health", value: `${dashboardStats.systemHealth}%`, icon: Activity, color: "text-success" },
];

export default function Dashboard() {
  const recentIncidents = incidents.filter((i) => i.status !== "resolved" && i.status !== "closed").slice(0, 5);

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Operations Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time enterprise operations overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <TrendingUp className="w-3 h-3 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Recent Incidents</h2>
            <Link
              to="/incidents"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <span className="text-xs font-mono text-muted-foreground w-16">{inc.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{inc.title}</p>
                  <p className="text-xs text-muted-foreground">{inc.affectedSystem}</p>
                </div>
                <span className={`status-badge status-${inc.status}`}>
                  {inc.status}
                </span>
                <span className={`text-xs priority-${inc.priority}`}>
                  {inc.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="ai-panel">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-primary animate-pulse-glow" />
            <h2 className="text-sm font-semibold">AI Insights</h2>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3 py-1"
              >
                "{insight}"
              </div>
            ))}
          </div>
          <Link
            to="/copilot"
            className="mt-4 flex items-center gap-2 text-xs text-primary hover:underline"
          >
            Open AI Copilot <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
