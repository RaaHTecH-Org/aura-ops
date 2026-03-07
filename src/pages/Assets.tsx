import { assets } from "@/data/mock-data";
import { Monitor, Server, Smartphone, HardDrive, Search, Shield, Key } from "lucide-react";
import { useState } from "react";

const assetIcons: Record<string, typeof Monitor> = {
  "Windows Laptop": Monitor,
  "Azure VM": Server,
  "Mobile Device": Smartphone,
  "M365 License": Key,
  "Security Tool License": Shield,
};

const categories = ["All", ...Array.from(new Set(assets.map((a) => a.assetType)))];

function formatCheckIn(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function Assets() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = assets
    .filter((a) => category === "All" || a.assetType === category)
    .filter(
      (a) =>
        a.assetType.toLowerCase().includes(search.toLowerCase()) ||
        a.owner.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase()) ||
        a.department.toLowerCase().includes(search.toLowerCase())
    );

  const complianceStats = {
    compliant: assets.filter((a) => a.complianceState === "compliant").length,
    nonCompliant: assets.filter((a) => a.complianceState === "non-compliant").length,
    warning: assets.filter((a) => a.complianceState === "warning").length,
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Asset Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {assets.length} tracked assets · {complianceStats.compliant} compliant · {complianceStats.nonCompliant} non-compliant
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <p className="text-2xl font-semibold">{assets.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Total Assets</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-semibold text-success">{complianceStats.compliant}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Compliant</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-semibold text-critical">{complianceStats.nonCompliant}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Non-Compliant</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-semibold text-warning">{complianceStats.warning}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Warning</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors ${
                category === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Assets table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Department</th>
                <th>Status</th>
                <th>Compliance</th>
                <th>Lifecycle</th>
                <th>Location</th>
                <th>Last Check-in</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => {
                const Icon = assetIcons[asset.assetType] || HardDrive;
                return (
                  <tr key={asset.id}>
                    <td className="font-mono text-[11px] text-muted-foreground">{asset.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-sm">{asset.assetType}</span>
                      </div>
                    </td>
                    <td className="text-sm">{asset.owner}</td>
                    <td className="text-[11px] text-muted-foreground">{asset.department}</td>
                    <td>
                      <span className={`status-badge ${
                        asset.status === "active" ? "status-resolved" : asset.status === "maintenance" ? "status-pending" : "status-closed"
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${asset.complianceState === "unknown" ? "closed" : asset.complianceState}`}>
                        {asset.complianceState}
                      </span>
                    </td>
                    <td className="text-[11px] text-muted-foreground capitalize">{asset.lifecycleStage.replace('-', ' ')}</td>
                    <td className="text-[11px] text-muted-foreground">{asset.location}</td>
                    <td className="text-[11px] text-muted-foreground">{formatCheckIn(asset.lastCheckIn)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
