

## Analysis

Two distinct accessibility issues to fix:

### 1. Buttons without accessible names
Several icon-only `<button>` elements lack `aria-label`. Found in `AppLayout.tsx`:
- **Line 93-98**: Close sidebar button (X icon) — no aria-label
- **Line 182-184**: Open sidebar/menu button — no aria-label  
- **Line 211-213**: Search button — no aria-label
- **Line 229**: Mark all read button — has `title` but needs `aria-label`
- **Line 232**: Clear all button — has `title` but needs `aria-label`

### 2. Low contrast text
Several text elements use very low opacity modifiers on already-muted colors:
- **Line 176**: `text-muted-foreground/40` (copyright) — ~40% opacity on an already dim color
- **Line 146, 153**: `text-primary/40` (decorative chevrons — acceptable as decorative)
- **Line 136**: `text-primary/70` — borderline, bump to `/80`
- **Line 89**: `text-sidebar-foreground` at `10px` — very small text

## Plan

### File: `src/components/AppLayout.tsx`

**Accessible button names** — Add `aria-label` to all icon-only buttons:
- Close sidebar button → `aria-label="Close sidebar"`
- Open sidebar button → `aria-label="Open menu"`
- Search button → `aria-label="Search"`
- Mark all read → `aria-label="Mark all read"`
- Clear all → `aria-label="Clear all"`

**Contrast fixes**:
- Line 176: Change `text-muted-foreground/40` → `text-muted-foreground/70`
- Line 136: Change `text-primary/70` → `text-primary/80`
- Decorative chevrons (lines 146, 153) are non-text content — keep as-is

### Also check other files with similar patterns:
- `src/pages/DigitalTwin.tsx` line 385: icon button with `text-muted-foreground/40` — add aria-label

### File: `src/index.css`
- Bump `--muted-foreground` slightly if needed — current `215 20% 50%` is reasonable; the `/40` opacity modifier was the real problem

No visual or functional changes. Only aria attributes and slight opacity bumps on already-dim decorative text.

