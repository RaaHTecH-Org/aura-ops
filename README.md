# Raahtech Workflow Command Center

AI-assisted enterprise IT operations platform purpose-built for Microsoft environments. Unifies incident management, service requests, asset tracking, and AI-driven automation into a single command center.

## Current Stage

**MVP / Demo-Ready Prototype** — fully functional UI with mock data, real-time simulation mode, and interactive visualizations. Ready for stakeholder demos and investor presentations.

## Features

| Module | Description |
|---|---|
| **Dashboard** | Operational overview with KPIs, incident trends, system health, and AI insights |
| **Incidents** | Incident triage with priority, status, AI summaries, and team assignment |
| **Service Requests** | Workflow-stage tracking, approval status, and department routing |
| **Assets** | IT asset inventory with compliance state, lifecycle stage, and location |
| **AI Copilot** | Conversational AI assistant for operational queries and recommendations |
| **Digital Twin** | Interactive infrastructure topology with 24-hour time-travel slider and health propagation |
| **AI Autopilot** | Automated incident remediation with 5-step decision pipeline and runbook execution |
| **Real-Time Simulation** | Live demo mode that generates random service health changes and notifications |
| **Notification System** | Bell icon dropdown with severity-coded alerts, timestamps, and read status |

## Architecture

```
Microsoft Enterprise (Azure, Entra ID, M365, Defender, Intune)
        ↓
Workflow Command Center (this platform)
        ↓
AI Insights & Automation (Copilot, Autopilot, Digital Twin)
```

- **Cloud**: Azure East/West US, Azure SQL, Azure Cache, Storage Clusters
- **Identity**: Microsoft Entra ID (Azure AD)
- **Productivity**: Exchange Online, SharePoint Online
- **Security**: Microsoft Defender for Endpoint
- **Network**: Azure VPN Gateway

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + custom design system (dark theme, HSL tokens)
- **Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts
- **Routing**: React Router v6
- **State**: React Query, React Context

## DevOps

- Built with [Lovable](https://lovable.dev) — AI-powered development platform
- Auto-deployed on every change
- GitHub integration for version control
- No external backend required (mock data, client-side state)

## Getting Started

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## License

Proprietary — Raahtech
