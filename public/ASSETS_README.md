# Cartoon Asset Pack — Yogesh Portfolio

Add these files to `public/` and set their paths in `src/lib/site-data.ts` (under `site.assets`) to enable the cartoon visuals.

## Style guidelines

- **Premium vector + subtle 3D shading**
- Clean outlines, soft gradients (pink/purple used lightly)
- Works on both light and dark backgrounds
- Modern, tech-product illustration vibe — not childish

---

## Required assets

| File | Size | Purpose | site-data key |
|------|------|---------|---------------|
| `hero-cartoon.png` | Transparent PNG (+ SVG if possible) | Main hero illustration — half/3/4 body, laptop/code/camera optional | `heroCartoon: "/hero-cartoon.png"` |
| `avatar.png` | **512×512** PNG | Head/shoulders circular avatar for header, command palette | `avatar: "/avatar.png"` |

---

## Optional stickers (3 mini poses)

| File | Concept | site-data key |
|------|---------|---------------|
| `sticker-building.png` | Gear/tool icon — "Building" | `stickerBuilding: "/sticker-building.png"` |
| `sticker-friendly.png` | Friendly pose — contact "Let's build something" | `stickerContact: "/sticker-friendly.png"` |
| `sticker-404.png` | Fun pose — 404 page | `sticker404: "/sticker-404.png"` |

**Sticker ideas:** Working (laptop), Building (gear), After dark (camera/moon).

---

## Favicon & app icon

These live in `src/app/`:

- `icon.tsx` — generates favicon (currently YK monogram with pink/purple gradient)
- `apple-icon.tsx` — 180×180 for iOS home screen (optional)
- `opengraph-image.tsx` — 1200×630 OG banner (LinkedIn preview)

**OG banner tip:** Cartoon + name + role + subtle pink dot. Keep it clean, not cluttered.

---

## Placement (already wired)

1. **Home hero** — `heroCartoon` replaces HeroBlob when set; subtle pink/purple glow
2. **Header** — `avatar` replaces YK monogram when set
3. **Command palette** — `avatar` in footer when set
4. **Now building card** — `stickerBuilding` in top-right corner
5. **Contact form** — `stickerContact` in top-right; heading "Let's build something"
6. **404 page** — `sticker404` above "Looks like this page didn't deploy 😄"

---

## Enabling assets

In `src/lib/site-data.ts`:

```ts
assets: {
    heroCartoon: "/hero-cartoon.png",
    avatar: "/avatar.png",
    stickerBuilding: "/sticker-building.png",
    stickerContact: "/sticker-friendly.png",
    sticker404: "/sticker-404.png",
},
```

Leave any path as `""` to keep that slot hidden.
