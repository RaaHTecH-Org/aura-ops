

# Replace Lovable Branding with Raahtech Logo

## Changes

### 1. Set Raahtech logo as favicon
- Copy `user-uploads://sLogo.jpeg` to `public/favicon.jpeg`
- Delete existing `public/favicon.ico`
- Add `<link rel="icon" href="/favicon.jpeg" type="image/jpeg">` to `index.html`

### 2. Remove Lovable branding from `index.html`
- Replace `og:image` URL (`lovable.dev/opengraph-image-p98pqg.png`) → `/favicon.jpeg` (or remove until a proper OG image is created)
- Change `twitter:site` from `@Lovable` → `@Raahtech`
- Replace `twitter:image` URL → `/favicon.jpeg`

### 3. No changes to `vite.config.ts`
The `lovable-tagger` import is a build tool dependency, not user-facing branding. Removing it could break the build pipeline.

## Files Modified
| File | Change |
|------|--------|
| `public/favicon.jpeg` | New — copied from upload |
| `public/favicon.ico` | Deleted |
| `index.html` | Add favicon link, update OG/Twitter meta tags |

