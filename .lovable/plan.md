

## Plan: Real-Time Simulation, Notification Panel & README Update

### 1. Create `src/hooks/use-simulation.tsx` — Real-Time Simulation Engine

A React context/hook that runs a global simulation loop (toggleable via a button in the header):

- **SimulationProvider** wraps the app, providing state via context
- Maintains a list of **live notifications** (type, message, timestamp, severity, read status)
- When simulation is ON, runs a `setInterval` (every 5-8 seconds) that randomly:
  - Changes a service health status (from a pool of realistic events)
  - Generates a matching notification (e.g., "VPN Gateway degraded — packet loss detected")
  - Plays a toast via Sonner for critical/warning events
- Exposes: `notifications[]`, `unreadCount`, `isSimulating`, `toggleSimulation`, `markAllRead`, `clearNotifications`
- Pre-seeds with the existing `alertsNotifications` from mock-data on mount

### 2. Modify `src/components/AppLayout.tsx` — Notification Dropdown & Sim Toggle

**Header Bell Icon → Popover Dropdown:**
- Replace the static bell button with a `Popover` (from existing `@radix-ui/react-popover`)
- Dropdown panel shows:
  - Header: "Notifications" title + "Mark all read" button
  - Scrollable list of notifications with: severity icon (color-coded), message, relative timestamp
  - Unread items have a subtle highlight
  - Empty state if no notifications
- Badge shows `unreadCount` from simulation context

**Simulation Toggle:**
- Add a small toggle button in header (e.g., `Radio`/`Activity` icon) with tooltip "Live Demo Mode"
- When active, pulses green; inactive shows muted

### 3. Modify `src/App.tsx` — Wrap with SimulationProvider

Wrap the app content with the `SimulationProvider` so all pages can access simulation state.

### 4. Rewrite `README.md`

Replace boilerplate with project-specific content:
- **Project name**: Raahtech Workflow Command Center
- **Purpose**: AI-assisted enterprise IT operations platform for Microsoft environments
- **Features list**: Dashboard, Incidents, Service Requests, Assets, AI Copilot, Digital Twin (time-travel topology), AI Autopilot (auto-remediation), Real-time simulation mode, Notification system
- **Tech stack**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts, Radix UI
- **Architecture**: Microsoft-centric (Azure, Entra ID, M365, Defender, Intune)
- **Current stage**: MVP / Demo-ready prototype with mock data
- **DevOps**: Built with Lovable, auto-deployed, GitHub integration

