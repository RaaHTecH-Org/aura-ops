import { assets } from "@/data/mock-data";
import { Monitor, Server, Printer, Wifi, HardDrive, Search } from "lucide-react";
import { useState } from "react";

const assetIcons: Record<string, typeof Monitor> = {
  Laptop: Monitor,
  Server: Server,
  Monitor: Monitor,
  "Network Switch": Wifi,
  "Virtual Machine": HardDrive,
  Firewall: Wifi,
  Printer: Printer,
};

export default function Assets() {
  const [search, setSearch] = useState("");
  const filtered = assets.filter(
    (a) =>
      a.assetType.toLowerCase().includes(search.toLowerCase()) ||
      a.owner.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Asset Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {assets.length} tracked assets
        </p>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((asset) => {
          const Icon = assetIcons[asset.assetType] || Monitor;
          return (
            <div key={asset.id} className="stat-card space-y-3">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-mono text-muted-foreground">{asset.id}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{asset.assetType}</p>
                <p className="text-xs text-muted-foreground">{asset.owner}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{asset.location}</span>
                <span
                  className={`status-badge ${
                    asset.status === "active"
                      ? "status-resolved"
                      : asset.status === "maintenance"
                      ? "status-pending"
                      : "status-open"
                  }`}
                >
                  {asset.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
