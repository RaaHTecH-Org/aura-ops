import {
  Settings,
  Users,
  Database,
  Shield,
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  FileText,
  Clock,
} from "lucide-react";

const connectors = [
  { name: "Microsoft Entra ID", status: "connected" as const, version: "v2.0", lastSync: "2 min ago" },
  { name: "Microsoft Graph API", status: "connected" as const, version: "v1.0", lastSync: "5 min ago" },
  { name: "Azure OpenAI", status: "connected" as const, version: "GPT-4o", lastSync: "Real-time" },
  { name: "Microsoft 365", status: "connected" as const, version: "v1.0", lastSync: "10 min ago" },
  { name: "Microsoft Defender", status: "degraded" as const, version: "v2.0", lastSync: "45 min ago" },
  { name: "ServiceNow", status: "disconnected" as const, version: "—", lastSync: "Not configured" },
];

const statusIcon = {
  connected: <CheckCircle2 className="w-4 h-4 text-success" />,
  degraded: <AlertTriangle className="w-4 h-4 text-warning" />,
  disconnected: <XCircle className="w-4 h-4 text-muted-foreground" />,
};

const roles = [
  { role: "Administrator", users: 3, permissions: "Full system access" },
  { role: "IT Operations", users: 12, permissions: "Incident & request management" },
  { role: "Security Operations", users: 5, permissions: "Security alerts & investigations" },
  { role: "Employee", users: 284, permissions: "Submit requests, view status" },
  { role: "Service Desk", users: 8, permissions: "Triage & assign incidents" },
];

const auditLog = [
  { time: "09:28 AM", user: "John Doe", action: "Updated incident INC-002 status to in-progress", type: "incident" },
  { time: "09:15 AM", user: "System", action: "Azure Defender connector health degraded", type: "system" },
  { time: "09:00 AM", user: "Sarah Chen", action: "Submitted service request SR-001", type: "request" },
  { time: "08:45 AM", user: "Admin", action: "Updated Conditional Access policy CA-007", type: "security" },
  { time: "08:30 AM", user: "System", action: "Daily compliance scan completed — 52 non-compliant devices", type: "system" },
  { time: "08:15 AM", user: "System", action: "AI model retrained on latest incident data", type: "ai" },
  { time: "07:45 AM", user: "James Wilson", action: "Escalated INC-008 to Security Operations", type: "incident" },
  { time: "07:00 AM", user: "System", action: "Scheduled maintenance window opened — Azure East US", type: "system" },
];

const workflowSettings = [
  { name: "Auto-assign critical incidents", enabled: true },
  { name: "AI-powered incident categorization", enabled: true },
  { name: "Manager auto-escalation (>8h)", enabled: true },
  { name: "Self-service password reset", enabled: true },
  { name: "Auto-close resolved incidents (72h)", enabled: false },
  { name: "ServiceNow bidirectional sync", enabled: false },
];

export default function Admin() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Administration</h1>
        <p className="text-sm text-muted-foreground mt-1">System configuration, integrations, and audit</p>
      </div>

      {/* Integration Status */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" />
          Integration Status
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {connectors.map((c) => (
            <div key={c.name} className="connector-card">
              <div className={`connector-dot-${c.status}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.version} · {c.lastSync}</p>
              </div>
              {statusIcon[c.status]}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Roles */}
        <div className="bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              User Roles
            </h2>
          </div>
          <div className="divide-y divide-border/40">
            {roles.map((r) => (
              <div key={r.role} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium">{r.role}</p>
                  <p className="text-[11px] text-muted-foreground">{r.permissions}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">{r.users} users</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Settings */}
        <div className="bg-card border border-border rounded-lg">
          <div className="section-header">
            <h2 className="section-title flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Workflow Settings
            </h2>
          </div>
          <div className="divide-y divide-border/40">
            {workflowSettings.map((s) => (
              <div key={s.name} className="px-5 py-3 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <span className="text-sm">{s.name}</span>
                <div className={`w-9 h-5 rounded-full relative transition-colors ${s.enabled ? "bg-success" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.enabled ? "left-[18px]" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-card border border-border rounded-lg">
        <div className="section-header">
          <h2 className="section-title flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Audit Log
          </h2>
          <span className="text-[11px] text-muted-foreground">Today</span>
        </div>
        <div className="divide-y divide-border/40">
          {auditLog.map((entry, i) => (
            <div key={i} className="px-5 py-3 flex items-start gap-4 hover:bg-muted/20 transition-colors">
              <span className="text-[11px] font-mono text-muted-foreground w-20 shrink-0 pt-0.5">{entry.time}</span>
              <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{entry.action}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{entry.user}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${
                entry.type === "incident" ? "bg-warning/15 text-warning" :
                entry.type === "security" ? "bg-critical/15 text-critical" :
                entry.type === "ai" ? "bg-primary/15 text-primary" :
                entry.type === "request" ? "bg-info/15 text-info" :
                "bg-muted text-muted-foreground"
              }`}>
                {entry.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
