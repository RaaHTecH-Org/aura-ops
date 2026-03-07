import { useState } from "react";
import { incidents, type Incident } from "@/data/mock-data";
import { Bot, Search, Filter, Plus } from "lucide-react";

const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export default function Incidents() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Incident | null>(null);

  const filtered = incidents
    .filter((i) => statusFilter === "all" || i.status === statusFilter)
    .filter(
      (i) =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const statuses = ["all", "open", "in-progress", "resolved", "closed"];

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Incident Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} incidents
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Incident
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  className={`cursor-pointer ${selected?.id === inc.id ? "bg-muted/50" : ""}`}
                  onClick={() => setSelected(inc)}
                >
                  <td className="font-mono text-xs text-muted-foreground">{inc.id}</td>
                  <td className="font-medium">{inc.title}</td>
                  <td>
                    <span className={`priority-${inc.priority} text-xs`}>
                      {inc.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${inc.status}`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="text-xs text-muted-foreground">{inc.assignedTeam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        <div className="bg-card border border-border rounded-lg p-5">
          {selected ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-muted-foreground">{selected.id}</span>
                <h3 className="text-base font-semibold mt-1">{selected.title}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <span className={`priority-${selected.priority}`}>{selected.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`status-badge status-${selected.status}`}>{selected.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System</span>
                  <span>{selected.affectedSystem}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team</span>
                  <span>{selected.assignedTeam}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{selected.description}</p>
              </div>
              {selected.resolutionNotes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                  <p className="text-sm text-success">{selected.resolutionNotes}</p>
                </div>
              )}
              <div className="ai-panel">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">AI Analysis</span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{selected.aiSummary}"
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
              Select an incident to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
