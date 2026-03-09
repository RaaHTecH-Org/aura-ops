

## Plan: Build Digital Twin & Autopilot Pages

### Summary
Create two new pages — **Digital Twin** (interactive infrastructure topology with time-travel) and **Autopilot** (AI auto-remediation workflows) — then add them to routing and navigation. The existing `ServiceHealthMap.tsx` component provides the foundational pattern for the topology graph.

---

### 1. Create `src/pages/DigitalTwin.tsx`

**Infrastructure Topology (based on ServiceHealthMap pattern):**
- SVG-based graph with 9 nodes: Azure East/West, Entra ID, VPN Gateway, Exchange, SharePoint, Defender, Azure SQL, Internal Apps
- Connection lines color-coded by health (healthy=primary, degraded=warning dashed, incident=critical dashed)
- Animated pulse rings on degraded/incident nodes
- Click node → detail panel slides in (status, incidents, affected systems, actions)
- "Run Diagnostics" button navigates to `/autopilot?incident=INC-XXXX`

**Node-to-Incident Mapping:**
- `vpn-gw` → INC-2001, `entra-id` → INC-2002, `exchange` → INC-2003, `db-cluster` → INC-2004, `defender` → INC-2005, `storage-cluster` → INC-2006

**Time-Travel Slider:**
- 24-hour timeline slider (0-23h) at bottom
- Predefined snapshots: states change at hours 0, 6, 8, 12, 18 (e.g., VPN degrades at h6, Entra incident at h8)
- Play/pause auto-advance button
- Current timestamp display

**Summary Stats Bar:**
- Total services, healthy, degraded, incidents counts — derived from current time-travel snapshot

**Health Propagation:**
- When parent node (e.g., Entra ID) is incident, dependent children show warning-style borders

---

### 2. Create `src/pages/Autopilot.tsx`

**Autopilot Incidents (6 mock incidents):**
- INC-2001: Azure VPN Gateway tunnel failure
- INC-2002: Microsoft Entra ID auth latency
- INC-2003: Exchange Online delivery delays
- INC-2004: Azure SQL high DTU
- INC-2005: Defender sensor offline
- INC-2006: Azure Cache connectivity

Each with severity, affected system, confidence score, suggested actions, runbook steps, estimated resolution time.

**Incident List:**
- Table with columns: ID, title, severity, system, confidence (progress bar), status
- Click to select → opens detail panel
- `useSearchParams` reads `?incident=INC-XXXX` on mount to auto-select

**AI Decision Pipeline Visualization:**
- 5-step horizontal workflow: Detect → Analyze → Recommend → Execute → Verify
- Each step: completed (green check), active (pulsing primary), pending (muted)
- Connected by arrows between steps

**Detail Panel:**
- Full incident info, AI analysis, confidence breakdown
- "Execute Runbook" button → animated step-by-step execution simulation with progress and checkmarks

**Summary Cards:**
- Active incidents, auto-resolved today, avg resolution time, AI confidence average

---

### 3. Modify `src/App.tsx`
- Import DigitalTwin and Autopilot
- Add routes: `/digital-twin` and `/autopilot`

### 4. Modify `src/components/AppLayout.tsx`
- Add `Network` icon import for Digital Twin, `Cpu` icon for Autopilot
- Add two nav items under "Intelligence" section:
  - `/digital-twin` → "Digital Twin"
  - `/autopilot` → "AI Autopilot"

---

### Technical Notes
- Reuses existing design patterns from `ServiceHealthMap.tsx` (SVG topology, statusConfig, detail panel)
- Uses existing CSS classes: `section-header`, `section-title`, `status-badge`, `animate-slide-in`
- Slider uses Radix `Slider` component already installed
- Mobile responsive: detail panels stack below on small screens via `useIsMobile()`
- No new dependencies needed

