(() => {
  const grid = document.getElementById("plans-grid");
  const filtersEl = document.getElementById("filters");
  const searchEl = document.getElementById("search");
  const sortEl = document.getElementById("sort");
  const emptyEl = document.getElementById("empty-state");
  const compareBody = document.getElementById("compare-body");
  const dialog = document.getElementById("plan-dialog");
  const dialogContent = document.getElementById("dialog-content");
  const dialogClose = document.getElementById("dialog-close");

  let activeFilter = "all";
  let query = "";
  let sortMode = "price-asc";

  const bestFor = {
    mimo: "Credit hunters & night coding",
    minimax: "Agents + multimodal in one quota",
    "opencode-go": "Low-cost multi-model entry",
    glm: "MCP extras & GLM agent work",
    kimi: "Long sessions & HighSpeed",
    stepfun: "Flexible monthly credit spend",
    qwen: "Qwen Cloud Token Plan (multi-model credits)",
    claude: "Highest agent polish",
    cursor: "Full AI IDE experience",
    google: "Gemini + Antigravity developers",
    openai: "Codex inside ChatGPT plans",
    xai: "Grok SuperGrok standalone tiers",
    longcat: "Cheap LongCat-2.0 agent coding",
    modelark: "China Volcengine Ark coding plan",
    byteplus: "International BytePlus ModelArk coding",
    sakana: "Multi-agent Fugu orchestration",
    bailian: "Alibaba China coding subscription",
    copilot: "Cheapest mainstream IDE assist",
    windsurf: "Cascade IDE agent workflows",
    kilo: "Credit pass · 500+ models on Kilo",
    freebuff: "Fully free open-model coding agent",
    qoder: "Credit-based agentic coding suite",
    cline: "Free OSS agent · BYOK inference",
    devin: "Autonomous software engineer agent",
    commandcode: "Cheap credit buckets + model deals",
    verdent: "VS Code / desktop credits + Eco Mode",
    kiro: "AWS Kiro IDE credit tiers",
    nous: "Hermes Agent multi-model portal",
  };

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderFilters() {
    filtersEl.innerHTML = window.FILTERS.map(
      (f) => `
      <button
        type="button"
        class="filter-chip${f.id === activeFilter ? " is-active" : ""}"
        data-filter="${f.id}"
        role="tab"
        aria-selected="${f.id === activeFilter}"
      >${escapeHtml(f.label)}</button>`
    ).join("");
  }

  function filteredPlans() {
    let list = [...window.PLANS];

    if (activeFilter !== "all") {
      list = list.filter((p) => p.category.includes(activeFilter));
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => {
        const hay = [
          p.name,
          p.vendor,
          p.tagline,
          p.quotaStyle,
          ...p.models,
          ...p.tools,
          ...p.highlights,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sortMode === "name") return a.name.localeCompare(b.name);
      if (sortMode === "price-desc") return b.startingPrice - a.startingPrice;
      return a.startingPrice - b.startingPrice;
    });

    return list;
  }

  function renderCards() {
    const plans = filteredPlans();
    emptyEl.hidden = plans.length > 0;
    grid.innerHTML = plans
      .map(
        (p, i) => `
      <article
        class="plan-card"
        style="--plan-color:${p.color}; animation-delay:${i * 55}ms"
        tabindex="0"
        role="button"
        data-id="${p.id}"
        aria-label="Open details for ${escapeHtml(p.name)}"
      >
        <div class="plan-rail">
          <span class="plan-rail-label">${p.startingPrice === 0 ? "price" : "from"}</span>
          <span class="plan-rail-price">${
            p.startingPrice === 0
              ? "Free"
              : `$${
                  Number.isInteger(p.startingPrice)
                    ? p.startingPrice
                    : p.startingPrice.toFixed(2)
                }`
          }</span>
          <span class="plan-rail-unit">${escapeHtml(
            p.railUnit != null ? p.railUnit : p.startingPrice === 0 ? "" : "/mo"
          )}</span>
          <span class="plan-rail-tiers">${p.tiers.length} tier${p.tiers.length === 1 ? "" : "s"}</span>
        </div>
        <div class="plan-body">
          <div class="plan-top">
            <p class="plan-vendor">${escapeHtml(p.vendor)}</p>
            <span class="plan-badge">${escapeHtml(p.badge)}</span>
          </div>
          <h3 class="plan-name">${escapeHtml(p.name)}</h3>
          <p class="plan-tagline">${escapeHtml(p.tagline)}</p>
          <div class="plan-meta-row">
            <div class="plan-quota-pill">${escapeHtml(p.quotaStyle)}</div>
            <div class="plan-tags">
              ${p.tools
                .slice(0, 2)
                .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
                .join("")}
            </div>
          </div>
          <div class="plan-footer">
            <div class="plan-models">
              ${p.models
                .slice(0, 3)
                .map((m) => `<span class="model-chip">${escapeHtml(m)}</span>`)
                .join("")}
              ${
                p.models.length > 3
                  ? `<span class="model-chip model-more">+${p.models.length - 3}</span>`
                  : ""
              }
            </div>
            <span class="plan-cta">Open <span aria-hidden="true">→</span></span>
          </div>
        </div>
      </article>`
      )
      .join("");
  }

  function renderCompare() {
    const sorted = [...window.PLANS].sort(
      (a, b) => a.startingPrice - b.startingPrice
    );
    compareBody.innerHTML = sorted
      .map(
        (p) => `
      <tr>
        <td>
          <span class="compare-name">${escapeHtml(p.name)}</span>
          <span class="compare-vendor">${escapeHtml(p.vendor)}</span>
        </td>
        <td class="compare-price">${escapeHtml(p.priceLabel)}</td>
        <td>${escapeHtml(p.quotaStyle)}</td>
        <td>${escapeHtml(bestFor[p.id] || p.badge)}</td>
        <td><button type="button" class="compare-link" data-open="${p.id}">Details</button></td>
      </tr>`
      )
      .join("");
  }

  function openPlan(id) {
    const p = window.PLANS.find((x) => x.id === id);
    if (!p) return;

    dialogContent.innerHTML = `
      <div class="dialog-header">
        <p class="dialog-vendor">${escapeHtml(p.vendor)}</p>
        <h2>${escapeHtml(p.name)}</h2>
        <p>${escapeHtml(p.tagline)}</p>
        <div class="dialog-actions">
          <a class="btn btn-accent" href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">
            Visit official site
            <span class="btn-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="btn btn-ghost" href="${escapeHtml(p.docsUrl)}" target="_blank" rel="noopener noreferrer">
            Docs
          </a>
        </div>
      </div>

      <div class="detail-block">
        <h3>Tiers</h3>
        <div class="tier-grid">
          ${p.tiers
            .map(
              (t) => `
            <div class="tier-card${t.popular ? " is-popular" : ""}">
              ${t.popular ? `<span class="tier-popular">Popular</span>` : ""}
              <p class="tier-name">${escapeHtml(t.name)}</p>
              <p class="tier-price">
                ${escapeHtml(t.price)}<small>${escapeHtml(t.period || "")}</small>
                ${t.alt ? `<span class="tier-alt">${escapeHtml(t.alt)}</span>` : ""}
              </p>
              <p class="tier-quota">${escapeHtml(t.quota)}</p>
              <p class="tier-note">${escapeHtml(t.note)}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="detail-block">
        <h3>Models</h3>
        <div class="chip-row">
          ${p.models.map((m) => `<span class="chip">${escapeHtml(m)}</span>`).join("")}
        </div>
      </div>

      <div class="detail-block">
        <h3>Works with</h3>
        <div class="chip-row">
          ${p.tools.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>

      <div class="detail-block">
        <h3>Highlights</h3>
        <ul class="highlight-list">
          ${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>
    `;

    lockBodyScroll();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    const inner = dialog.querySelector(".dialog-inner");
    if (inner) inner.scrollTop = 0;
  }

  let scrollLocked = false;

  function lockBodyScroll() {
    if (scrollLocked) return;
    scrollLocked = true;
    document.documentElement.classList.add("is-scroll-locked");
    document.body.classList.add("is-scroll-locked");
  }

  function unlockBodyScroll() {
    if (!scrollLocked) return;
    scrollLocked = false;
    document.documentElement.classList.remove("is-scroll-locked");
    document.body.classList.remove("is-scroll-locked");
  }

  function closeDialog() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      unlockBodyScroll();
    }
  }

  function onLockTouchMove(e) {
    if (!scrollLocked) return;
    const inner = dialog.querySelector(".dialog-inner");
    if (inner && inner.contains(e.target)) return;
    e.preventDefault();
  }

  function updateCounts() {
    const countEl = document.getElementById("plan-count");
    const tierEl = document.getElementById("tier-count");
    if (countEl) countEl.textContent = String(window.PLANS.length);
    if (tierEl) {
      const tiers = window.PLANS.reduce((n, p) => n + p.tiers.length, 0);
      tierEl.textContent = String(tiers);
    }
  }

  function setupReveal() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => io.observe(n));
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    renderFilters();
    renderCards();
  });

  searchEl.addEventListener("input", () => {
    query = searchEl.value.trim();
    renderCards();
  });

  sortEl.addEventListener("change", () => {
    sortMode = sortEl.value;
    renderCards();
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".plan-card");
    if (!card) return;
    openPlan(card.dataset.id);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".plan-card");
    if (!card) return;
    e.preventDefault();
    openPlan(card.dataset.id);
  });

  compareBody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    openPlan(btn.dataset.open);
  });

  dialogClose.addEventListener("click", closeDialog);
  dialog.addEventListener("close", unlockBodyScroll);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) closeDialog();
  });
  document.addEventListener("touchmove", onLockTouchMove, { passive: false });

  renderFilters();
  renderCards();
  renderCompare();
  updateCounts();
  setupReveal();

  const syncMotionPause = () => {
    document.documentElement.classList.toggle("is-paused", document.hidden);
  };
  document.addEventListener("visibilitychange", syncMotionPause);
  syncMotionPause();
})();
