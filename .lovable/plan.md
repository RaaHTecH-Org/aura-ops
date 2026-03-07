

## Plan: Connect Digital Twin "Run Diagnostics" to Autopilot Page

### Approach

Create a mapping between Digital Twin node IDs and Autopilot incident IDs, then use `react-router-dom`'s `useNavigate` to navigate to `/autopilot?incident=INC-XXXX` when clicking "Run Diagnostics." On the Autopilot page, read the query param and auto-select the matching incident.

### Changes

**`src/pages/DigitalTwin.tsx`:**
- Add a mapping from node IDs to Autopilot incident IDs:
  - `vpn-gw` → `INC-2001` (VPN Gateway)
  - `entra-id` → `INC-2002` (Entra ID)
  - `exchange` → `INC-2003` (Exchange Online)
  - `internal-apps` / `db-cluster` → `INC-2004` (Azure Compute / CRM)
  - `defender` → `INC-2005` (Defender)
- Import `useNavigate` from `react-router-dom`
- On "Run Diagnostics" button click, navigate to `/autopilot?incident=<id>`
- If no matching autopilot incident exists for a node, disable the button or navigate to `/autopilot` without pre-selection

**`src/pages/Autopilot.tsx`:**
- Import `useSearchParams` from `react-router-dom`
- On mount, read `incident` query param
- If present, find the matching incident in `autopilotIncidents` and set it as `selected`

### Node-to-Incident Mapping

| Digital Twin Node | Autopilot Incident |
|---|---|
| `vpn-gw` | INC-2001 (Azure VPN Gateway) |
| `entra-id` | INC-2002 (Microsoft Entra ID) |
| `exchange` | INC-2003 (Exchange Online) |
| `db-cluster` | INC-2004 (Azure Compute) |
| `defender` | INC-2005 (Microsoft Defender) |
| `storage-cluster` | INC-2006 (Azure Cache) |

