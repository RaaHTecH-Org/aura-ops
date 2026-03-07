export interface Incident {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved" | "closed";
  assignedTeam: string;
  affectedSystem: string;
  aiSummary: string;
  createdAt: string;
  resolutionNotes?: string;
}

export interface ServiceRequest {
  id: string;
  requestType: string;
  description: string;
  requestor: string;
  approvalStatus: "pending" | "approved" | "rejected";
  workflowStage: string;
  status: "open" | "in-progress" | "fulfilled" | "closed";
  createdAt: string;
}

export interface Asset {
  id: string;
  assetType: string;
  owner: string;
  status: "active" | "maintenance" | "retired";
  location: string;
}

export const incidents: Incident[] = [
  { id: "INC-001", title: "Azure AD Authentication Failures", description: "Multiple users unable to authenticate via Azure AD SSO", priority: "critical", status: "open", assignedTeam: "Identity Operations", affectedSystem: "Azure AD / Entra ID", aiSummary: "Likely Azure AD authentication configuration issue. Recommend Identity Operations team.", createdAt: "2026-03-07T08:15:00Z" },
  { id: "INC-002", title: "VPN Gateway Connectivity Loss", description: "Site-to-site VPN tunnel dropped between HQ and Azure", priority: "critical", status: "in-progress", assignedTeam: "Network Operations", affectedSystem: "Azure VPN Gateway", aiSummary: "VPN tunnel failure detected. Check IKE phase 2 negotiation and Azure gateway health.", createdAt: "2026-03-07T07:45:00Z", resolutionNotes: "Investigating IKE negotiation logs" },
  { id: "INC-003", title: "SharePoint Online Slow Performance", description: "SharePoint document libraries loading slowly for APAC region", priority: "high", status: "open", assignedTeam: "Cloud Services", affectedSystem: "SharePoint Online", aiSummary: "Performance degradation in APAC region. Possible CDN or throttling issue.", createdAt: "2026-03-07T06:30:00Z" },
  { id: "INC-004", title: "Email Delivery Delays", description: "Exchange Online intermittent delivery delays", priority: "medium", status: "open", assignedTeam: "Messaging Operations", affectedSystem: "Exchange Online", aiSummary: "Mail flow rules may be causing queuing. Review transport rules.", createdAt: "2026-03-07T05:00:00Z" },
  { id: "INC-005", title: "MFA Push Notification Failures", description: "Authenticator app push notifications not received by some users", priority: "high", status: "in-progress", assignedTeam: "Identity Operations", affectedSystem: "Azure MFA", aiSummary: "Push notification service degradation. Fallback to SMS recommended.", createdAt: "2026-03-06T22:00:00Z" },
  { id: "INC-006", title: "Azure SQL Database High DTU", description: "Production database consistently hitting 95% DTU utilization", priority: "high", status: "open", assignedTeam: "Database Operations", affectedSystem: "Azure SQL", aiSummary: "Query optimization or tier upgrade recommended. Top queries identified.", createdAt: "2026-03-06T18:00:00Z" },
  { id: "INC-007", title: "Teams Meeting Recording Failures", description: "Meeting recordings not saving to OneDrive", priority: "medium", status: "resolved", assignedTeam: "Cloud Services", affectedSystem: "Microsoft Teams", aiSummary: "Storage quota issue resolved. OneDrive capacity expanded.", createdAt: "2026-03-06T14:00:00Z", resolutionNotes: "Expanded OneDrive storage allocation" },
  { id: "INC-008", title: "Defender Alert: Suspicious Sign-in", description: "Multiple sign-in attempts from unusual location detected", priority: "critical", status: "open", assignedTeam: "Security Operations", affectedSystem: "Microsoft Defender", aiSummary: "Potential credential compromise. Recommend immediate password reset and MFA review.", createdAt: "2026-03-07T09:00:00Z" },
  { id: "INC-009", title: "Intune Device Compliance Drift", description: "50+ devices showing non-compliant status", priority: "medium", status: "open", assignedTeam: "Endpoint Management", affectedSystem: "Microsoft Intune", aiSummary: "Policy update pushed recently. Devices may need sync cycle.", createdAt: "2026-03-06T16:00:00Z" },
  { id: "INC-010", title: "Power Automate Flow Failures", description: "Automated approval workflows failing silently", priority: "low", status: "open", assignedTeam: "Automation Team", affectedSystem: "Power Automate", aiSummary: "Connector authentication expired. Re-authenticate SharePoint connector.", createdAt: "2026-03-06T12:00:00Z" },
  { id: "INC-011", title: "Azure DevOps Pipeline Timeouts", description: "CI/CD pipelines timing out during build stage", priority: "medium", status: "resolved", assignedTeam: "DevOps Engineering", affectedSystem: "Azure DevOps", aiSummary: "Agent pool capacity issue. Additional build agents provisioned.", createdAt: "2026-03-05T20:00:00Z", resolutionNotes: "Added 3 additional build agents" },
  { id: "INC-012", title: "Conditional Access Policy Block", description: "Legitimate users blocked by new CA policy", priority: "high", status: "in-progress", assignedTeam: "Identity Operations", affectedSystem: "Azure AD / Entra ID", aiSummary: "New conditional access policy too restrictive. Review named locations and exclusions.", createdAt: "2026-03-07T07:00:00Z" },
];

export const serviceRequests: ServiceRequest[] = [
  { id: "SR-001", requestType: "Software Access", description: "Request access to Power BI Pro license", requestor: "Sarah Chen", approvalStatus: "pending", workflowStage: "Manager Approval", status: "open", createdAt: "2026-03-07T09:00:00Z" },
  { id: "SR-002", requestType: "VPN Access", description: "Remote VPN access for contractor", requestor: "James Wilson", approvalStatus: "approved", workflowStage: "IT Provisioning", status: "in-progress", createdAt: "2026-03-06T15:00:00Z" },
  { id: "SR-003", requestType: "New Employee Onboarding", description: "Onboard new hire — Marketing department", requestor: "HR Portal", approvalStatus: "approved", workflowStage: "Account Provisioning", status: "in-progress", createdAt: "2026-03-06T10:00:00Z" },
  { id: "SR-004", requestType: "Device Replacement", description: "Replace damaged laptop — Surface Pro 9", requestor: "Michael Torres", approvalStatus: "pending", workflowStage: "Manager Approval", status: "open", createdAt: "2026-03-07T08:00:00Z" },
  { id: "SR-005", requestType: "Account Provisioning", description: "SharePoint site access for project team", requestor: "Lisa Park", approvalStatus: "approved", workflowStage: "Graph API Provisioning", status: "in-progress", createdAt: "2026-03-06T11:00:00Z" },
  { id: "SR-006", requestType: "Software Access", description: "Adobe Creative Suite license request", requestor: "David Kim", approvalStatus: "rejected", workflowStage: "Closed", status: "closed", createdAt: "2026-03-05T09:00:00Z" },
  { id: "SR-007", requestType: "VPN Access", description: "Always-on VPN configuration for remote office", requestor: "Network Team", approvalStatus: "pending", workflowStage: "Security Review", status: "open", createdAt: "2026-03-07T07:30:00Z" },
];

export const assets: Asset[] = [
  { id: "AST-001", assetType: "Laptop", owner: "Sarah Chen", status: "active", location: "HQ — Floor 3" },
  { id: "AST-002", assetType: "Server", owner: "IT Operations", status: "active", location: "Azure East US" },
  { id: "AST-003", assetType: "Monitor", owner: "James Wilson", status: "active", location: "HQ — Floor 2" },
  { id: "AST-004", assetType: "Network Switch", owner: "Network Ops", status: "maintenance", location: "DC — Rack 14" },
  { id: "AST-005", assetType: "Virtual Machine", owner: "DevOps", status: "active", location: "Azure West US" },
  { id: "AST-006", assetType: "Laptop", owner: "Michael Torres", status: "maintenance", location: "HQ — Floor 1" },
  { id: "AST-007", assetType: "Firewall", owner: "Security Ops", status: "active", location: "DC — Rack 01" },
  { id: "AST-008", assetType: "Printer", owner: "Facilities", status: "retired", location: "HQ — Floor 4" },
];

export const aiInsights = [
  "Multiple incidents appear related to Azure authentication failures across Entra ID services.",
  "VPN connectivity issues correlate with recent Azure gateway maintenance window.",
  "3 security alerts require immediate attention — potential credential compromise detected.",
  "5 incidents today relate to identity and access management systems.",
  "Recommend proactive capacity review for Azure SQL production databases.",
];

export const dashboardStats = {
  openIncidents: 12,
  criticalIncidents: 3,
  pendingRequests: 7,
  securityAlerts: 3,
  trackedAssets: 312,
  systemHealth: 94.2,
};
