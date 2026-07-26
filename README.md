# Scouty

**Coding plans, clearly mapped.**

An independent guide to AI coding and token subscriptions: what they cost, how quotas work, and which tools they fit. Scouty does not sell plans. Use official provider links when you are ready to subscribe.

<p align="center">
  <img src="favicon.svg" width="72" height="72" alt="Scouty mark" />
</p>

---

## Why Scouty

Frontier labs, China-native token packs, IDE suites, and credit marketplaces all price usage differently. Five-hour windows, weekly caps, request pools, GPU time, and dollar credits are easy to mix up.

Scouty puts them in one place so you can **browse**, **filter**, and **compare** before you choose.

| What you get | What you do not get |
| --- | --- |
| Curated plan cards with tiers | Checkout or payment processing |
| Quick compare sorted by price | Guaranteed live pricing |
| Filters for IDE, free, China, agents, and more | Affiliate lock-in (informational only) |
| Official links out to vendors | Advice to buy a specific plan |

Pricing snapshot: **July 2026**. Always confirm on the provider’s official page.

---

## Features

- **Catalog** of token packs, frontier lab plans, IDE suites, agents, and credit passes
- **Filters** for category (token, IDE, free entry, China-native, agent-heavy, and more)
- **Search & sort** by price or name
- **Quick compare** table sorted lowest to highest starting price
- **Plan detail** dialog with tiers, models, tools, and highlights
- **Light atelier UI**: mint paper, emerald accents, anime wallpaper atmosphere

---

## Catalog

### Token / coding subscriptions

| Plan | Vendor |
| --- | --- |
| Xiaomi MiMo Token Plan | Xiaomi MiMo |
| MiniMax Token Plan | MiniMax |
| OpenCode Go | OpenCode / Anomaly |
| GLM Coding Plan | Zhipu · Z.ai |
| Kimi Code | Moonshot · Kimi |
| StepFun Step Plan | StepFun |
| Qwen Cloud Token Plan | Alibaba · Qwen |
| Alibaba Bailian Coding Plan | Alibaba Bailian |
| Volcengine Ark Coding Plan | ByteDance · China |
| BytePlus Coding Plan | ByteDance · Global |
| Meituan LongCat | Meituan |
| Sakana Fugu Plan | Sakana AI |

### Frontier labs

Claude · Google AI · OpenAI ChatGPT / Codex · xAI SuperGrok

### IDE suites & agents

Cursor · GitHub Copilot · Windsurf · Trae · Qoder · Amazon Kiro · Verdent · Devin · Freebuff · Ollama Cloud

### Credit / pass marketplaces

Kilo Pass · ClinePass · Command Code · Nous Portal (Hermes)

---

## Quick start

Open `index.html` in a browser, or serve the folder locally:

```bash
npx --yes serve .
```

Then visit the URL shown in the terminal (often `http://localhost:3000`).

No build step. No package install required for the site itself.

---

## Project structure

```text
.
├── index.html          # Page shell: hero, catalog, compare, FAQ
├── favicon.svg         # Brand mark
├── css/
│   └── styles.css      # Layout, theme, motion
├── js/
│   ├── plans.js        # Plan data + filter definitions
│   └── app.js          # Filter, sort, compare, dialog
├── assets/             # Wallpaper / hero imagery
└── README.md
```

### Adding a plan

1. Open `js/plans.js`
2. Append an object to `window.PLANS` (match existing shape: `id`, `name`, `vendor`, `startingPrice`, `tiers`, `url`, …)
3. Optionally add a one-line blurb in `bestFor` inside `js/app.js` for the compare table
4. Refresh the page

---

## Stack

Static site only:

- **HTML** for structure
- **CSS** for theme and motion (Young Serif + Onest)
- **Vanilla JS** for interactivity

No framework, no bundler, no backend.

---

## Disclaimer

Scouty is a curated snapshot for research. Vendors change tiers, promos, and regional pricing often. Quotas and model lists can shift without notice. This site is not affiliated with the providers listed. Always verify pricing and terms on official pages before you subscribe.

---

<p align="center">
  <sub>Scouty · Independent · Not a store</sub>
</p>
