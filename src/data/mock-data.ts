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
  updatedAt: string;
  resolutionNotes?: string;
}

export interface ServiceRequest {
  id: string;
  requestType: string;
  description: string;
  requestor: string;
  department: string;
  approvalStatus: "pending" | "approved" | "rejected";
  workflowStage: "submitted" | "manager-approval" | "it-provisioning" | "completed" | "closed";
  assignedTeam: string;
  status: "open" | "in-progress" | "fulfilled" | "closed";
  createdAt: string;
  fulfillmentEta: string;
}

export interface Asset {
  id: string;
  assetType: string;
  owner: string;
  department: string;
  status: "active" | "maintenance" | "retired";
  complianceState: "compliant" | "non-compliant" | "warning" | "unknown";
  lifecycleStage: "deployed" | "provisioning" | "decommissioning" | "end-of-life";
  location: string;
  lastCheckIn: string;
}

export const incidents: Incident[] = [
  { id: "INC-001", title: "Azure AD Authentication Failures", description: "Multiple users unable to authenticate via Azure AD SSO. Failure rate increased 340% in last 2 hours across all regions.", priority: "critical", status: "open", assignedTeam: "Identity Operations", affectedSystem: "Azure AD / Entra ID", aiSummary: "Correlation detected with Azure AD token service degradation. 87% probability of upstream Microsoft identity platform issue. Recommend enabling fallback auth and opening Microsoft support ticket.", createdAt: "2026-03-07T08:15:00Z", updatedAt: "2026-03-07T09:30:00Z" },
  { id: "INC-002", title: "VPN Gateway Connectivity Loss", description: "Site-to-site VPN tunnel dropped between HQ and Azure East US. All remote workers in NA region affected.", priority: "critical", status: "in-progress", assignedTeam: "Network Operations", affectedSystem: "Azure VPN Gateway", aiSummary: "IKE phase 2 negotiation failing. Gateway health probe shows intermittent response. Similar pattern detected in INC-045 from Feb—resolved by resetting gateway instance.", createdAt: "2026-03-07T07:45:00Z", updatedAt: "2026-03-07T09:15:00Z", resolutionNotes: "Investigating IKE negotiation logs" },
  { id: "INC-003", title: "SharePoint Online Slow Performance", description: "SharePoint document libraries loading 10-15s for APAC region users. Large file uploads timing out.", priority: "high", status: "open", assignedTeam: "Cloud Services", affectedSystem: "SharePoint Online", aiSummary: "CDN edge node in Singapore showing 4x normal latency. Microsoft health dashboard confirms regional degradation. 12 users impacted based on telemetry.", createdAt: "2026-03-07T06:30:00Z", updatedAt: "2026-03-07T08:00:00Z" },
  { id: "INC-004", title: "Email Delivery Delays — Exchange Online", description: "Exchange Online intermittent delivery delays averaging 15-45 min for external recipients.", priority: "medium", status: "open", assignedTeam: "Messaging Operations", affectedSystem: "Exchange Online", aiSummary: "Transport rule 'External DLP Scan' added March 5 is queuing 23% of outbound mail. Recommend disabling rule for immediate relief while investigating.", createdAt: "2026-03-07T05:00:00Z", updatedAt: "2026-03-07T07:30:00Z" },
  { id: "INC-005", title: "MFA Push Notification Failures", description: "Microsoft Authenticator push notifications not received by ~30% of users. TOTP codes working normally.", priority: "high", status: "in-progress", assignedTeam: "Identity Operations", affectedSystem: "Azure MFA", aiSummary: "Apple Push Notification Service showing degradation. Correlates with APNS status page. Recommend enforcing SMS fallback for affected users via Conditional Access.", createdAt: "2026-03-06T22:00:00Z", updatedAt: "2026-03-07T08:45:00Z" },
  { id: "INC-006", title: "Azure SQL Database High DTU Usage", description: "Production CRM database consistently hitting 95% DTU utilization causing timeout errors for end users.", priority: "high", status: "open", assignedTeam: "Database Operations", affectedSystem: "Azure SQL", aiSummary: "Top 3 queries consuming 68% of DTU. Query #1 (report_generation SP) lacks index on transaction_date. Estimated 40% improvement with index addition.", createdAt: "2026-03-06T18:00:00Z", updatedAt: "2026-03-07T06:00:00Z" },
  { id: "INC-007", title: "Teams Meeting Recording Failures", description: "Meeting recordings not saving to OneDrive. Affects all users in Marketing department.", priority: "medium", status: "resolved", assignedTeam: "Cloud Services", affectedSystem: "Microsoft Teams", aiSummary: "OneDrive storage quota exceeded for Marketing OU. Expanded allocation from 5TB to 10TB resolved the issue.", createdAt: "2026-03-06T14:00:00Z", updatedAt: "2026-03-07T02:00:00Z", resolutionNotes: "Expanded OneDrive storage allocation for Marketing OU" },
  { id: "INC-008", title: "Defender Alert: Suspicious Sign-in Activity", description: "Multiple sign-in attempts from unusual locations (Eastern Europe) detected for 3 executive accounts.", priority: "critical", status: "open", assignedTeam: "Security Operations", affectedSystem: "Microsoft Defender", aiSummary: "Password spray attack pattern detected targeting C-suite accounts. IP addresses match known threat actor infrastructure. IMMEDIATE: Reset passwords, revoke sessions, enforce location-based CA policy.", createdAt: "2026-03-07T09:00:00Z", updatedAt: "2026-03-07T09:30:00Z" },
  { id: "INC-009", title: "Intune Device Compliance Drift", description: "52 Windows devices showing non-compliant status after March policy update. Blocking conditional access.", priority: "medium", status: "open", assignedTeam: "Endpoint Management", affectedSystem: "Microsoft Intune", aiSummary: "New BitLocker policy requires TPM 2.0. 52 devices have TPM 1.2. Recommend creating exception group or initiating hardware refresh for affected devices.", createdAt: "2026-03-06T16:00:00Z", updatedAt: "2026-03-07T04:00:00Z" },
  { id: "INC-010", title: "Power Automate Flow Failures", description: "Automated approval workflows failing silently. 15 purchase order approvals stuck in queue.", priority: "low", status: "open", assignedTeam: "Automation Team", affectedSystem: "Power Automate", aiSummary: "SharePoint connector OAuth token expired March 6. Re-authentication required. This is a recurring issue—recommend implementing token refresh automation.", createdAt: "2026-03-06T12:00:00Z", updatedAt: "2026-03-06T18:00:00Z" },
  { id: "INC-011", title: "Azure DevOps Pipeline Timeouts", description: "CI/CD pipelines timing out during build stage. Average build time increased from 8min to 45min.", priority: "medium", status: "resolved", assignedTeam: "DevOps Engineering", affectedSystem: "Azure DevOps", aiSummary: "Self-hosted agent pool exhausted. Build queue backed up to 23 jobs. Added 3 additional agents resolved backlog.", createdAt: "2026-03-05T20:00:00Z", updatedAt: "2026-03-06T10:00:00Z", resolutionNotes: "Added 3 additional build agents to pool" },
  { id: "INC-012", title: "Conditional Access Policy Blocking Legitimate Users", description: "New CA policy blocking VPN users from accessing M365 apps. 85 support tickets in last 4 hours.", priority: "high", status: "in-progress", assignedTeam: "Identity Operations", affectedSystem: "Azure AD / Entra ID", aiSummary: "CA policy 'Require Compliant Device' not excluding VPN IP ranges in named locations. Recommend adding corporate VPN exit IPs to trusted locations immediately.", createdAt: "2026-03-07T07:00:00Z", updatedAt: "2026-03-07T09:00:00Z" },
  { id: "INC-013", title: "Outlook Desktop Client Crashes", description: "Outlook 365 desktop client crashing on launch for users with shared mailboxes. Build 16.0.17328 affected.", priority: "medium", status: "open", assignedTeam: "Desktop Support", affectedSystem: "Microsoft 365", aiSummary: "Known issue with Outlook build 16.0.17328 and shared mailbox rendering. Microsoft KB5034567 patch available. Recommend pushing update via Intune.", createdAt: "2026-03-07T06:00:00Z", updatedAt: "2026-03-07T08:00:00Z" },
  { id: "INC-014", title: "Defender Endpoint Sensor Offline", description: "18 endpoint sensors reporting offline status in Defender for Endpoint. Last check-in 12+ hours ago.", priority: "high", status: "open", assignedTeam: "Security Operations", affectedSystem: "Microsoft Defender", aiSummary: "Affected endpoints are all running Windows 10 21H2 (EOL). Sensor version requires OS update. Critical security gap—these endpoints have no EDR coverage.", createdAt: "2026-03-07T05:00:00Z", updatedAt: "2026-03-07T07:00:00Z" },
];

export const serviceRequests: ServiceRequest[] = [
  { id: "SR-001", requestType: "Software Access", description: "Request access to Power BI Pro license for quarterly reporting", requestor: "Sarah Chen", department: "Finance", approvalStatus: "pending", workflowStage: "manager-approval", assignedTeam: "License Management", status: "open", createdAt: "2026-03-07T09:00:00Z", fulfillmentEta: "2026-03-08T17:00:00Z" },
  { id: "SR-002", requestType: "VPN Access", description: "Remote VPN access for contractor — Project Mercury", requestor: "James Wilson", department: "Engineering", approvalStatus: "approved", workflowStage: "it-provisioning", assignedTeam: "Network Operations", status: "in-progress", createdAt: "2026-03-06T15:00:00Z", fulfillmentEta: "2026-03-07T12:00:00Z" },
  { id: "SR-003", requestType: "New Employee Onboarding", description: "Onboard new hire — Marketing department. Start date March 10.", requestor: "HR Portal", department: "Human Resources", approvalStatus: "approved", workflowStage: "it-provisioning", assignedTeam: "Identity Operations", status: "in-progress", createdAt: "2026-03-06T10:00:00Z", fulfillmentEta: "2026-03-09T17:00:00Z" },
  { id: "SR-004", requestType: "Device Replacement", description: "Replace damaged laptop — Surface Pro 9. Screen cracked.", requestor: "Michael Torres", department: "Sales", approvalStatus: "pending", workflowStage: "manager-approval", assignedTeam: "Desktop Support", status: "open", createdAt: "2026-03-07T08:00:00Z", fulfillmentEta: "2026-03-10T17:00:00Z" },
  { id: "SR-005", requestType: "SharePoint / Teams Access", description: "SharePoint site collection access for Project Aurora team (8 users)", requestor: "Lisa Park", department: "Product", approvalStatus: "approved", workflowStage: "it-provisioning", assignedTeam: "Cloud Services", status: "in-progress", createdAt: "2026-03-06T11:00:00Z", fulfillmentEta: "2026-03-07T15:00:00Z" },
  { id: "SR-006", requestType: "Software Access", description: "Adobe Creative Suite license request for brand redesign project", requestor: "David Kim", department: "Marketing", approvalStatus: "rejected", workflowStage: "closed", assignedTeam: "License Management", status: "closed", createdAt: "2026-03-05T09:00:00Z", fulfillmentEta: "N/A" },
  { id: "SR-007", requestType: "VPN Access", description: "Always-on VPN configuration for new remote office in Austin", requestor: "Network Team", department: "IT", approvalStatus: "pending", workflowStage: "manager-approval", assignedTeam: "Network Operations", status: "open", createdAt: "2026-03-07T07:30:00Z", fulfillmentEta: "2026-03-12T17:00:00Z" },
  { id: "SR-008", requestType: "Account Provisioning", description: "Bulk provisioning of 15 contractor accounts for Q2 project", requestor: "PMO Office", department: "Operations", approvalStatus: "approved", workflowStage: "it-provisioning", assignedTeam: "Identity Operations", status: "in-progress", createdAt: "2026-03-06T14:00:00Z", fulfillmentEta: "2026-03-08T17:00:00Z" },
  { id: "SR-009", requestType: "SharePoint / Teams Access", description: "Create new Teams channel and SharePoint site for Legal review board", requestor: "Amy Rodriguez", department: "Legal", approvalStatus: "approved", workflowStage: "completed", assignedTeam: "Cloud Services", status: "fulfilled", createdAt: "2026-03-05T10:00:00Z", fulfillmentEta: "2026-03-06T12:00:00Z" },
  { id: "SR-010", requestType: "New Employee Onboarding", description: "Onboard 3 new hires for Engineering. Start date March 12.", requestor: "HR Portal", department: "Human Resources", approvalStatus: "pending", workflowStage: "submitted", assignedTeam: "Identity Operations", status: "open", createdAt: "2026-03-07T08:30:00Z", fulfillmentEta: "2026-03-11T17:00:00Z" },
];

export const assets: Asset[] = [
  { id: "AST-001", assetType: "Windows Laptop", owner: "Sarah Chen", department: "Finance", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "HQ — Floor 3", lastCheckIn: "2026-03-07T08:30:00Z" },
  { id: "AST-002", assetType: "Azure VM", owner: "IT Operations", department: "IT", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Azure East US", lastCheckIn: "2026-03-07T09:00:00Z" },
  { id: "AST-003", assetType: "Windows Laptop", owner: "James Wilson", department: "Engineering", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "HQ — Floor 2", lastCheckIn: "2026-03-07T07:45:00Z" },
  { id: "AST-004", assetType: "Azure VM", owner: "Network Ops", department: "IT", status: "maintenance", complianceState: "warning", lifecycleStage: "deployed", location: "Azure West US", lastCheckIn: "2026-03-06T22:00:00Z" },
  { id: "AST-005", assetType: "Azure VM", owner: "DevOps", department: "Engineering", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Azure Central US", lastCheckIn: "2026-03-07T09:15:00Z" },
  { id: "AST-006", assetType: "Windows Laptop", owner: "Michael Torres", department: "Sales", status: "maintenance", complianceState: "non-compliant", lifecycleStage: "deployed", location: "HQ — Floor 1", lastCheckIn: "2026-03-05T16:00:00Z" },
  { id: "AST-007", assetType: "Security Tool License", owner: "Security Ops", department: "Security", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Cloud", lastCheckIn: "2026-03-07T09:00:00Z" },
  { id: "AST-008", assetType: "Mobile Device", owner: "Lisa Park", department: "Product", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Remote — Seattle", lastCheckIn: "2026-03-07T08:00:00Z" },
  { id: "AST-009", assetType: "M365 License", owner: "HR Department", department: "HR", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Cloud", lastCheckIn: "2026-03-07T09:00:00Z" },
  { id: "AST-010", assetType: "Windows Laptop", owner: "David Kim", department: "Marketing", status: "active", complianceState: "warning", lifecycleStage: "deployed", location: "Remote — Chicago", lastCheckIn: "2026-03-06T14:00:00Z" },
  { id: "AST-011", assetType: "Azure VM", owner: "Database Team", department: "IT", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Azure East US 2", lastCheckIn: "2026-03-07T09:10:00Z" },
  { id: "AST-012", assetType: "Mobile Device", owner: "Amy Rodriguez", department: "Legal", status: "active", complianceState: "non-compliant", lifecycleStage: "deployed", location: "HQ — Floor 4", lastCheckIn: "2026-03-04T10:00:00Z" },
  { id: "AST-013", assetType: "Security Tool License", owner: "SOC Team", department: "Security", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Cloud", lastCheckIn: "2026-03-07T09:00:00Z" },
  { id: "AST-014", assetType: "Windows Laptop", owner: "Tom Bradley", department: "Engineering", status: "retired", complianceState: "unknown", lifecycleStage: "end-of-life", location: "Storage — B2", lastCheckIn: "2026-01-15T09:00:00Z" },
  { id: "AST-015", assetType: "M365 License", owner: "Finance Team", department: "Finance", status: "active", complianceState: "compliant", lifecycleStage: "deployed", location: "Cloud", lastCheckIn: "2026-03-07T09:00:00Z" },
];

export const aiInsights = [
  "Multiple incidents appear related to Azure authentication failures across Entra ID services — possible upstream issue.",
  "3 service requests are awaiting manager approval. Average approval wait time: 14 hours.",
  "Security alerts increased 18% over the last 24 hours. Suspicious sign-in activity detected for executive accounts.",
  "VPN connectivity issues correlate with Azure gateway maintenance window scheduled for tonight.",
  "52 devices non-compliant after March policy update. Recommend exception group for TPM 1.2 hardware.",
  "Recommend proactive capacity review for Azure SQL production databases — DTU consistently above 90%.",
];

export const dashboardStats = {
  openIncidents: 14,
  criticalIncidents: 3,
  pendingRequests: 10,
  securityAlerts: 5,
  trackedAssets: 312,
  slaCompliance: 96.8,
  systemHealth: 94.2,
};

export const operationsChartData = [
  { name: "Mon", incidents: 8, requests: 12, resolved: 6 },
  { name: "Tue", incidents: 12, requests: 9, resolved: 10 },
  { name: "Wed", incidents: 15, requests: 14, resolved: 11 },
  { name: "Thu", incidents: 10, requests: 11, resolved: 13 },
  { name: "Fri", incidents: 14, requests: 10, resolved: 9 },
  { name: "Sat", incidents: 5, requests: 3, resolved: 7 },
  { name: "Sun", incidents: 3, requests: 2, resolved: 4 },
];

export const systemHealthData = [
  { name: "Azure AD", health: 72, status: "degraded" as const },
  { name: "Exchange", health: 88, status: "operational" as const },
  { name: "SharePoint", health: 91, status: "operational" as const },
  { name: "Teams", health: 99, status: "operational" as const },
  { name: "Intune", health: 85, status: "operational" as const },
  { name: "Defender", health: 78, status: "degraded" as const },
  { name: "Azure VPN", health: 65, status: "degraded" as const },
  { name: "Power Platform", health: 95, status: "operational" as const },
];

export const alertsNotifications = [
  { id: 1, type: "critical" as const, message: "Suspicious sign-in activity detected — 3 executive accounts", time: "9 min ago" },
  { id: 2, type: "warning" as const, message: "Azure VPN Gateway health probe failing intermittently", time: "23 min ago" },
  { id: 3, type: "critical" as const, message: "Azure AD token service degradation — auth failures rising", time: "1h ago" },
  { id: 4, type: "info" as const, message: "Scheduled maintenance: Azure East US — tonight 2:00 AM", time: "2h ago" },
  { id: 5, type: "warning" as const, message: "52 devices non-compliant after Intune policy update", time: "3h ago" },
  { id: 6, type: "info" as const, message: "New security baseline published by Microsoft — review required", time: "5h ago" },
];
