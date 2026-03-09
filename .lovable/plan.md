

## Four New Dashboard Intelligence Features

### A. Root Cause Clustering
Replace the flat `aiInsights` list in the AI Insights panel with grouped clusters. Each cluster has a category label, incident count, and child insights.

**Mock data** (`mock-data.ts`): Add `rootCauseClusters` array:
```ts
{ id: "rc-1", category: "Authentication Failures", severity: "critical", 
  incidentIds: ["INC-001","INC-005","INC-012"], 
  insights: ["Azure AD token service degradation...", "MFA push failures correlate..."],
  trend: "escalating" }
```
3-4 clusters covering Identity, Network, Security, Compliance patterns.

**Dashboard change**: Replace the current `aiInsights.map()` block in the AI Insights panel with clustered view. Each cluster shows category name, severity dot, incident count badge, and expandable child insights. Uses Collapsible component. Keep "Open AI Copilot" link.

---

### B. Time to Burn Indicators
Add a new widget between the stats grid and the Service Health Map showing countdown timers for critical/high incidents.

**Mock data** (`mock-data.ts`): Add `timeToBurn` array:
```ts
{ incidentId: "INC-001", title: "Azure AD Auth Failures", 
  slaBreach: { minutes: 47, total: 240 },
  capacityExhaustion: { minutes: 120, total: 480 },
  securityEscalation: { minutes: 15, total: 60 } }
```
3 critical incidents with countdown data.

**Dashboard change**: New section with 3 incident cards, each showing 3 horizontal progress bars (SLA, Capacity, Security) with remaining time, color-coded by urgency (green > 50%, warning 20-50%, critical < 20%). Uses the existing Progress component pattern.

---

### C. Persona-Based Views
Add a toggle group at the top of the dashboard (below the title) with 3 persona tabs: **All**, **Ops Lead**, **Security Lead**, **Engineering Lead**.

**Implementation**: Add `useState<string>("all")` for active persona. Each persona filters which widgets are visible and reorders stat cards:
- **Ops Lead**: Prioritizes incidents, SLA, service requests, system health
- **Security Lead**: Prioritizes security alerts, Defender status, suspicious activity alerts, root cause clusters
- **Engineering Lead**: Prioritizes system health, capacity metrics, Azure SQL, DevOps-related items

Uses `ToggleGroup` component. Persona selection wraps widget sections in conditional rendering. No new pages -- same Dashboard, different emphasis via show/hide and reorder.

---

### D. Autopilot Actions Preview
Replace the current hardcoded "AI Recommended Actions" section with a live preview pulling from the Autopilot incidents data.

**Mock data** (`mock-data.ts`): Export `autopilotPreviewActions` array:
```ts
{ id: "INC-2001", action: "Restart VPN Gateway", system: "VPN Gateway",
  confidence: 94, requiresApproval: true, approver: "Network Ops Lead",
  severity: "critical", estimatedResolution: "12 min" }
```

**Dashboard change**: Replace the static 4-action grid with cards sourced from `autopilotPreviewActions`. Each card shows: action name, system, confidence percentage bar, approval requirement badge ("Auto" vs "Approval Required"), estimated resolution time, and a "View in Autopilot" link that navigates to `/autopilot?incident=INC-2001`. The AI feels active -- confidence scores and approval gates are front and center.

---

### Files Modified

| File | Change |
|------|--------|
| `src/data/mock-data.ts` | Add `rootCauseClusters`, `timeToBurn`, `autopilotPreviewActions` exports |
| `src/pages/Dashboard.tsx` | Add persona toggle, Time to Burn section, replace AI Insights with clusters, replace Recommended Actions with Autopilot preview |

### Rendering Order (with persona = "all")
1. Title + Persona toggle
2. Stats grid
3. Time to Burn indicators (new)
4. Service Health Map
5. Incident Trend + Root Cause Clusters (replaces AI Insights)
6. Alerts + Request Volume + System Health
7. Autopilot Actions Preview (replaces AI Recommended Actions)
8. Live Activity Feed
9. Recent Incidents + Active Requests

