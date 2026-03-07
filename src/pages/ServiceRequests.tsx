import { serviceRequests } from "@/data/mock-data";
import { Plus, CheckCircle, Clock, XCircle, ArrowRight, FileText, Wifi, Monitor, UserPlus, Key, Users } from "lucide-react";

const approvalIcon = {
  pending: <Clock className="w-3.5 h-3.5 text-warning" />,
  approved: <CheckCircle className="w-3.5 h-3.5 text-success" />,
  rejected: <XCircle className="w-3.5 h-3.5 text-critical" />,
};

const workflowStages = ["submitted", "manager-approval", "it-provisioning", "completed"] as const;
const stageLabels: Record<string, string> = {
  "submitted": "Submitted",
  "manager-approval": "Manager Approval",
  "it-provisioning": "IT Provisioning",
  "completed": "Completed",
  "closed": "Closed",
};

const catalogItems = [
  { type: "Software Access", icon: FileText, desc: "License & app access" },
  { type: "VPN Access", icon: Wifi, desc: "Remote connectivity" },
  { type: "Device Replacement", icon: Monitor, desc: "Hardware refresh" },
  { type: "New Employee Onboarding", icon: UserPlus, desc: "Full onboarding" },
  { type: "Account Provisioning", icon: Key, desc: "Account setup" },
  { type: "SharePoint / Teams Access", icon: Users, desc: "Collaboration access" },
];

function WorkflowProgress({ currentStage }: { currentStage: string }) {
  const currentIdx = workflowStages.indexOf(currentStage as any);
  const isClosed = currentStage === "closed";
  return (
    <div className="flex items-center gap-1">
      {workflowStages.map((stage, idx) => {
        const isDone = isClosed || idx < currentIdx;
        const isCurrent = !isClosed && idx === currentIdx;
        return (
          <div key={stage} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isDone ? "bg-success" : isCurrent ? "bg-primary" : "bg-muted"}`} />
            {idx < workflowStages.length - 1 && (
              <div className={`w-4 h-0.5 ${isDone ? "bg-success/50" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceRequests() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Service Request Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submit and track IT service requests · {serviceRequests.length} requests
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-primary-foreground" style={{ background: 'var(--gradient-primary)' }}>
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Service Catalog */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {catalogItems.map((item) => (
          <button key={item.type} className="stat-card text-left group">
            <item.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-medium leading-tight">{item.type}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Requests table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="section-header">
          <h2 className="section-title">All Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Requestor</th>
                <th>Department</th>
                <th>Approval</th>
                <th>Workflow</th>
                <th>Team</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((req) => (
                <tr key={req.id}>
                  <td className="font-mono text-[11px] text-muted-foreground">{req.id}</td>
                  <td className="font-medium text-sm">{req.requestType}</td>
                  <td className="text-sm">{req.requestor}</td>
                  <td className="text-[11px] text-muted-foreground">{req.department}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {approvalIcon[req.approvalStatus]}
                      <span className="text-[11px] capitalize">{req.approvalStatus}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <WorkflowProgress currentStage={req.workflowStage} />
                      <span className="text-[10px] text-muted-foreground">{stageLabels[req.workflowStage]}</span>
                    </div>
                  </td>
                  <td className="text-[11px] text-muted-foreground">{req.assignedTeam}</td>
                  <td>
                    <span className={`status-badge status-${req.status}`}>{req.status}</span>
                  </td>
                  <td className="text-[11px] text-muted-foreground">
                    {req.fulfillmentEta === "N/A" ? "—" : new Date(req.fulfillmentEta).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
