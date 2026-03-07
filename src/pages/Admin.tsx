import { Settings, Users, Database, Shield, Server } from "lucide-react";

const sections = [
  { title: "User Management", desc: "Manage roles, permissions, and access", icon: Users, items: ["Employee", "IT Operations", "Administrator"] },
  { title: "System Configuration", desc: "Platform settings and integrations", icon: Settings, items: ["Microsoft Entra ID OAuth", "Azure OpenAI Connection", "Microsoft Graph API"] },
  { title: "Database", desc: "Schema management and backups", icon: Database, items: ["Incidents Table", "Service Requests Table", "Assets Table"] },
  { title: "Security", desc: "Audit logs and compliance", icon: Shield, items: ["Audit Trail", "Access Logs", "Compliance Reports"] },
];

export default function Admin() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Administration</h1>
        <p className="text-sm text-muted-foreground mt-1">System configuration and management</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="stat-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                <section.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{section.title}</h3>
                <p className="text-xs text-muted-foreground">{section.desc}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-md text-sm text-secondary-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  {item}
                  <Server className="w-3.5 h-3.5 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
