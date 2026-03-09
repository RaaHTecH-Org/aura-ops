

## Threat Map Enhancements

### 1. Mini Threat Heatmap Widget
Create `src/components/dashboard/MiniThreatHeatmap.tsx` — a condensed geographic threat view for "All" and "Security" personas.

**Design:**
- Compact card (same height as other widgets)
- Simplified SVG world map with regional threat intensity
- Color-coded regions: green (safe), yellow (moderate), red (active threats)
- Top 3 threat origins with attempt counts
- "View Full Map" link to Security persona or ThreatMap section

**Dashboard integration:**
- Add `miniThreatHeatmap: ["all", "security"]` to `sectionVisibility`
- Place after Service Health Map row

---

### 2. Animated Attack Lines
Enhance `ThreatMap.tsx` with pulsing attack vectors:

**SVG Animation:**
```svg
<circle r="3" fill="hsl(var(--critical))">
  <animateMotion dur="2s" repeatCount="indefinite" path="M{actorX},{actorY} L{hqX},{hqY}" />
</circle>
```

- Add animated "bullet" circles that travel along attack paths
- Critical threats: faster pulse (1.5s), red bullets
- High threats: medium pulse (2s), yellow bullets
- Staggered start times to avoid synchronized motion

---

### 3. Interactive Threat Actor Detail Panel
Add click-to-expand functionality using `Dialog`:

**Click handler on threat points:**
- Clicking an actor point or table row opens detail panel
- Uses existing `Dialog` component

**Detail panel content:**
- Geolocation: City, region, ISP, AS number
- Attack timeline: First seen, last attempt, attempt frequency
- Related Defender alerts (mock 2-3 alerts)
- Recommended actions: "Block IP range", "Enable Geo-fencing", "Escalate to SOC"
- Quick action buttons with toast confirmation

**Data extension:**
```ts
interface ThreatActor {
  // existing fields...
  isp: string;
  asn: string;
  firstSeen: string;
  lastAttempt: string;
  relatedAlerts: { id: string; title: string; severity: string }[];
}
```

---

### 4. Mobile Responsiveness
Update `ThreatMap.tsx` and dashboard layout:

- Threat map SVG: `viewBox` scaling, hide labels on `sm:`
- Actor table: Stack IP/location vertically on mobile
- Mini heatmap: Single-column layout on mobile
- Detail dialog: Full-screen sheet on mobile using responsive breakpoint

---

### Files Modified

| File | Change |
|------|--------|
| `src/components/dashboard/ThreatMap.tsx` | Add animated attack lines, click handlers, detail dialog |
| `src/components/dashboard/MiniThreatHeatmap.tsx` | New condensed heatmap widget |
| `src/pages/Dashboard.tsx` | Add mini heatmap to visible sections |

