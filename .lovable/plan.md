

## Plan: Page Transition Animations + Mobile Responsiveness

### Part 1: Framer-Motion Entrance Animations

Install `framer-motion` and create a shared animation utilities file, then apply staggered entrance animations across all pages.

**New file: `src/lib/animations.tsx`**
- Export reusable `motion` wrapper components: `StaggerContainer`, `FadeUp`, `SlideIn`, `ScaleIn`
- Define consistent animation presets (duration, stagger delay, easing)

**Pages to update (all 7):**

| Page | Animation Treatment |
|---|---|
| **Dashboard** | Stat cards stagger in (0.05s delay each), ServiceHealthMap fades up, chart sections scale in |
| **Incidents** | Summary strip staggers, filter bar slides in, table rows stagger with 0.03s delay |
| **Service Requests** | Catalog cards stagger, stats fade up, table rows slide in |
| **Assets** | Compliance cards stagger, type filters fade in, table rows stagger |
| **Autopilot** | Status cards stagger, workflow steps animate left-to-right sequentially, table rows slide in |
| **Digital Twin** | Summary stats stagger, topology SVG fades in, detail panel slides from right |
| **AI Copilot** | Chat messages animate in individually, suggested queries stagger |

**Implementation approach:**
- Wrap page root `div` with `motion.div` for page-level fade
- Wrap grid containers with stagger parent, each child as a `motion.div` with `fadeUp` variant
- Table rows get `slideIn` with incremental delay (capped at ~10 rows to avoid slow renders)
- Detail/side panels use `slideInRight` animation via `AnimatePresence`

### Part 2: Mobile Responsiveness

**`ServiceHealthMap.tsx`:**
- Increase `paddingBottom` from 45% to 65% on mobile (`sm:pb-[45%] pb-[65%]`)
- Scale node labels to hide on very small screens or use shorter names
- Detail panel: change from `absolute right-3 w-72` to full-width bottom sheet on mobile using `useIsMobile()` hook
- Reduce node dot sizes on mobile

**`DigitalTwin.tsx`:**
- The SVG viewBox approach already scales, but the detail panel needs work
- Side panel: switch from side-by-side `flex gap-4` to stacked layout on mobile
- Time-travel controls: stack vertically on small screens (wrap slider below play buttons)
- Timeline marker labels: hide on mobile, show only key ones

**`Autopilot.tsx`:**
- Workflow steps: on mobile, show vertically stacked instead of horizontal with arrows
- Incident table + detail panel: stack vertically on mobile instead of side-by-side
- Hide less critical table columns on mobile (description, confidence bar)

**`AppLayout.tsx`:**
- Already has mobile sidebar — no changes needed

**General responsive fixes:**
- Dashboard stat grid: already uses `grid-cols-2 md:grid-cols-4 lg:grid-cols-7` — good
- Ensure all detail panels use `useIsMobile()` to switch between side panel and bottom sheet patterns

### Technical Details

- **New dependency:** `framer-motion` (latest)
- **New file:** `src/lib/animations.tsx` — shared motion components
- **Files modified:** All 7 page files + `ServiceHealthMap.tsx`
- **Hook used:** Existing `useIsMobile()` from `src/hooks/use-mobile.tsx`
- **No breaking changes** — animations are additive, responsive changes use Tailwind breakpoints

