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
  CheckCircle2,
  Bell,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  dashboardStats,
  aiInsights,
  incidents,
  serviceRequests,
  operationsChartData,
  systemHealthData,
  alertsNotifications,
} from "@/data/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const statCards = [
  { label: "Open Incidents", value: dashboardStats.openIncidents, icon: AlertTriangle, color: "text-warning", trend: "+3" },
  { label: "Critical Incidents", value: dashboardStats.criticalIncidents, icon: ShieldAlert, color: "text-critical", trend: "+1" },
  { label: "Pending Requests", value: dashboardStats.pendingRequests, icon: FileText, color: "text-info", trend: "-2" },
  { label: "Security Alerts", value: dashboardStats.securityAlerts, icon: Shield, color: "text-critical", trend: "+2" },
  { label: "Assets Tracked", value: dashboardStats.trackedAssets, icon: Monitor, color: "text-foreground", trend: "+5" },
  { label: "SLA Compliance", value: `${dashboardStats.slaCompliance}%`, icon: CheckCircle2, color: "text-success", trend: "-0.4%" },
  { label: "System Health", value: `${dashboardStats.systemHealth}%`, icon: Activity, color: "text-success", trend: "+1.2%" },
];

const alertIcon = {
  critical: <ShieldAlert className="w-3.5 h-3.5 text-critical shrink-0" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />,
  info: <Bell className="w-3.5 h-3.5 text-info shrink-0" />,
};

export default function Dashboard() {
  const recentIncidents = incidents.filter((i) => i.status !== "resolved" && i.status !== "closed").slice(0, 6);
  const activeRequests = serviceRequests.filter((r) => r.status === "open" || r.status === "in-progress").slice(0, 5);

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Operations Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time enterprise operations overview — AI-Assisted Enterprise Operations Platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card-glow">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-[10px] text-muted-foreground font-mono">{stat.trend}</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Operations Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title">Operations Overview — Last 7 Days</h2>
          </div>
          <div className="p-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operationsChartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 16%)" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222 41% 8%)',
                    border: '1px solid hsl(222 18% 16%)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'hsl(210 40% 93%)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'hsl(215 20% 50%)' }} />
                <Bar dataKey="incidents" fill="hsl(199 89% 48%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="requests" fill="hsl(185 80% 50%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="resolved" fill="hsl(152 69% 40%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title">Alerts & Notifications</h2>
            <span className="text-[10px] bg-critical/15 text-critical px-2 py-0.5 rounded-full font-medium">
              {alertsNotifications.filter((a) => a.type === "critical").length} critical
            </span>
          </div>
          <div className="divide-y divide-border/40">
            {alertsNotifications.map((alert) => (
              <div key={alert.id} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                {alertIcon[alert.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title">Recent Incidents</h2>
            <Link to="/incidents" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                <span className="text-[11px] font-mono text-muted-foreground w-16 shrink-0">{inc.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{inc.title}</p>
                  <p className="text-[11px] text-muted-foreground">{inc.affectedSystem}</p>
                </div>
                <span className={`status-badge status-${inc.status}`}>{inc.status}</span>
                <span className={`text-[11px] priority-${inc.priority} w-14 text-right`}>{inc.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="ai-panel">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-primary animate-pulse-glow" />
            <h2 className="text-sm font-semibold">AI Insights</h2>
            <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full ml-auto font-medium">
              Live
            </span>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3 py-1">
                "{insight}"
              </div>
            ))}
          </div>
          <Link to="/copilot" className="mt-5 flex items-center gap-2 text-xs text-primary hover:underline">
            Open AI Copilot <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Requests */}
        <div className="bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title">Active Requests</h2>
            <Link to="/requests" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {activeRequests.map((req) => (
              <div key={req.id} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                <span className="text-[11px] font-mono text-muted-foreground w-14 shrink-0">{req.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{req.requestType}</p>
                  <p className="text-[11px] text-muted-foreground">{req.requestor} — {req.department}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {req.workflowStage.replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Microsoft Environment Health */}
        <div className="bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title">Microsoft Environment Health</h2>
          </div>
          <div className="p-5 space-y-3">
            {systemHealthData.map((sys) => (
              <div key={sys.name} className="flex items-center gap-3">
                <span className="text-xs w-24 shrink-0">{sys.name}</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      sys.health >= 90 ? "bg-success" : sys.health >= 75 ? "bg-warning" : "bg-critical"
                    }`}
                    style={{ width: `${sys.health}%` }}
                  />
                </div>
                <span className={`text-[11px] font-mono w-10 text-right ${
                  sys.health >= 90 ? "text-success" : sys.health >= 75 ? "text-warning" : "text-critical"
                }`}>
                  {sys.health}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
