import { serviceRequests } from "@/data/mock-data";
import { Plus, CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";

const stageColors: Record<string, string> = {
  "Manager Approval": "status-pending",
  "IT Provisioning": "status-in-progress",
  "Account Provisioning": "status-in-progress",
  "Graph API Provisioning": "status-in-progress",
  "Security Review": "status-pending",
  Closed: "status-resolved",
};

const approvalIcon = {
  pending: <Clock className="w-4 h-4 text-warning" />,
  approved: <CheckCircle className="w-4 h-4 text-success" />,
  rejected: <XCircle className="w-4 h-4 text-critical" />,
};

const requestTypes = [
  "Software Access",
  "VPN Access",
  "Device Replacement",
  "New Employee Onboarding",
  "Account Provisioning",
];

export default function ServiceRequests() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Service Request Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submit and track IT service requests
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Quick request cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {requestTypes.map((type) => (
          <button
            key={type}
            className="stat-card text-left group"
          >
            <p className="text-sm font-medium">{type}</p>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mt-2 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>

      {/* Requests table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Requestor</th>
              <th>Approval</th>
              <th>Workflow Stage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((req) => (
              <tr key={req.id}>
                <td className="font-mono text-xs text-muted-foreground">{req.id}</td>
                <td className="font-medium">{req.requestType}</td>
                <td>{req.requestor}</td>
                <td>
                  <div className="flex items-center gap-1.5">
                    {approvalIcon[req.approvalStatus]}
                    <span className="text-xs capitalize">{req.approvalStatus}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${stageColors[req.workflowStage] || ""}`}>
                    {req.workflowStage}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${req.status}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
