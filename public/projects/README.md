# Project screenshots

Real 16:9 WebP captures (1440×810, quality 82) shown on the Projects page and
Featured Work section. `ProjectThumb` renders `/projects/<slug>.webp` when it
exists and falls back to a designed CSS sketch otherwise.

**Current status (July 2026):**

- **applyvibe.webp** ✅ landing hero (captured from live deploy)
- **dailyhabitz.webp** ✅ landing (captured from live deploy)
- **ghumakad.webp** ✅ landing hero (captured from live deploy)
- **safeshelf.webp** ✅ dashboard (captured from live deploy)
- **skillforge.webp** ✅ dashboard (captured from local production build)
- **iscp.webp** ❌ missing — the CloudFront deploy (dj3eozung04ja.cloudfront.net)
  is no longer reachable. Redeploy or capture from a local run, crop 16:9, save
  as WebP. Falls back to the designed sketch until then.
- **bridgecare.webp** ❌ missing — `bridgecare.vercel.app` serves a *different
  app* (someone else's "Medical Health Tracker"), so the Live link was removed
  from site-data. Deploy BridgeCare under a project-owned URL, then capture.
