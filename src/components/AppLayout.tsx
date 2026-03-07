import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Monitor,
  Bot,
  Settings,
  Menu,
  X,
  Activity,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/incidents", label: "Incidents", icon: AlertTriangle },
  { path: "/requests", label: "Service Requests", icon: FileText },
  { path: "/assets", label: "Assets", icon: Monitor },
  { path: "/copilot", label: "AI Copilot", icon: Bot },
  { path: "/admin", label: "Admin", icon: Settings },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPage = navItems.find((n) => n.path === location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-sidebar-accent-foreground leading-none tracking-tight">
              Workflow Command
            </h1>
            <p className="text-[10px] text-sidebar-foreground mt-0.5 uppercase tracking-widest">
              Center
            </p>
          </div>
          <button
            className="ml-auto lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-3 font-medium">
            Operations
          </p>
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
          <div className="pt-4 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-3 font-medium">
              Intelligence
            </p>
          </div>
          {navItems.slice(4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Architecture card */}
        <div className="mx-3 mb-3 p-3 rounded-lg border border-primary/10 bg-primary/5">
          <p className="text-[10px] uppercase tracking-widest text-primary/70 font-medium mb-2">Platform Flow</p>
          <div className="space-y-1.5">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-info shrink-0" />
              Microsoft Enterprise
            </div>
            <div className="flex justify-center">
              <ChevronRight className="w-3 h-3 text-primary/40 rotate-90" />
            </div>
            <div className="text-[11px] text-primary flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Workflow Command Center
            </div>
            <div className="flex justify-center">
              <ChevronRight className="w-3 h-3 text-primary/40 rotate-90" />
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
              AI Insights / Automation
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground" style={{ background: 'var(--gradient-primary)' }}>
              JD
            </div>
            <div>
              <p className="text-xs font-medium text-sidebar-accent-foreground">
                John Doe
              </p>
              <p className="text-[11px] text-sidebar-foreground">
                IT Operations
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-6 h-14 border-b border-border bg-card/50 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">WCC</span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="font-medium">{currentPage?.label || "Dashboard"}</span>
            </div>
            <span className="lg:hidden text-sm font-medium">Workflow Command Center</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-critical" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
