

## Plan: Live Activity Log Widget + Simulation-Connected Digital Twin

### 1. Add Live Activity Log widget to Dashboard (`src/pages/Dashboard.tsx`)

- Import `useSimulation` hook
- Add a new card between "AI Recommended Actions" and the Recent Incidents grid
- Widget renders a scrollable list (ScrollArea, max ~250px) of `notifications` from the simulation context
- Each entry: severity icon (color-coded), message text, relative timestamp ("5s ago")
- Header shows "Live Activity Feed" with a pulsing "Live" badge when simulation is active, and event count
- Empty state: "Enable Live Demo Mode to see real-time events"
- Auto-scrolls to top as new events arrive (newest first — already the array order)

### 2. Connect simulation engine to Digital Twin (`src/pages/DigitalTwin.tsx`)

- Import `useSimulation` hook
- Map simulation event messages to node ID overrides (e.g., message containing "VPN" → `vpn-gw` degraded, "Entra" → `entra-id`, etc.)
- When `isSimulating` is true, derive a `simOverrides` map from recent notifications and merge it into the node state alongside time-travel snapshots
- When simulation is off, behavior reverts to time-travel-only mode
- Add a small indicator badge on the page showing "Live Mode Active" when simulating

### 3. Expand simulation context (`src/hooks/use-simulation.tsx`)

- Export a `serviceOverrides` computed value: `Record<string, HealthStatus>` derived from the latest notification per service keyword
- This lets Digital Twin consume structured overrides without parsing messages itself
- Mapping: "VPN" → `vpn-gw`, "Entra" → `entra-id`, "Exchange" → `exchange`, "SQL"/"DTU" → `db-cluster`, "Defender" → `defender`, "SharePoint" → `sharepoint`, "Storage"/"Cache" → `azure-east`, "Internal Apps" → `internal-apps`

### 4. Verify Digital Twin → Autopilot navigation

- Ensure "Run Diagnostics" button on degraded/incident nodes with `incidentId` navigates to `/autopilot?incident=INC-XXXX`
- Already implemented in current code — no changes needed, just verification during testing

### Technical Notes
- No new dependencies
- Uses existing `ScrollArea`, `useSimulation`, severity icon patterns from AppLayout
- Dashboard widget is read-only — displays notifications array from context
- Digital Twin merges sim overrides only when `isSimulating === true`, preserving time-travel as the default mode

