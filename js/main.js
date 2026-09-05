/* ============================================================
   Serenity Spa & Wellness — Shared front-end behaviour
   Navigation, reveal animations, dynamic card rendering,
   filter tabs, accordions, and simple form feedback.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initDirToggle();
  initNavbar();
  initMobileNav();
  initActiveNavLink();
  initYear();
  initFilterTabs();
  initAccordions();
  initNewsletterForm();
  initContactForm();
  // Render dynamic content FIRST so every .reveal element (including
  // cards injected from data.js) exists in the DOM before the
  // IntersectionObserver below is wired up to watch them.
  renderFeaturedTreatments();
  renderFeaturedTreatments2();
  renderAllTreatments();
  applyTreatmentCategoryDeepLink();
  renderFeaturedTherapists();
  renderFeaturedTherapists2();
  renderAllTherapists();
  renderPlans();
  renderPlanSpotlight();
  renderTestimonials();
  renderTestimonials2();
  renderBlogPage();
  renderBlogPostPage();
  initBlogFilterTabs();
  updateNavAuthState();
  initReveal();
});

/* ---------- Theme (light/dark) toggle ----------
   The theme itself is applied as early as possible by a tiny inline
   script in each page's <head> (before first paint, to avoid a flash of
   the wrong theme) — this just wires up the toggle button and keeps it
   in sync with whatever theme is currently active. */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");

  const syncButton = (theme) => {
    if (!btn) return;
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  };

  let current = "light";
  try { current = localStorage.getItem("ssw_theme") || "light"; } catch (e) {}
  syncButton(current);

  if (!btn) return;
  btn.addEventListener("click", () => {
    current = current === "dark" ? "light" : "dark";
    if (current === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    syncButton(current);
    try { localStorage.setItem("ssw_theme", current); } catch (e) {}
  });
}

/* ---------- Direction (LTR/RTL) toggle ----------
   Same pattern as the theme toggle above: the inline head script sets
   dir="" on <html> before first paint, this just wires up the button. */
function initDirToggle() {
  const btn = document.getElementById("dirToggle");

  const syncButton = (dir) => {
    if (!btn) return;
    btn.textContent = dir === "rtl" ? "LTR" : "RTL";
    const label = dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  };

  let current = "ltr";
  try { current = localStorage.getItem("ssw_dir") || "ltr"; } catch (e) {}
  syncButton(current);

  if (!btn) return;
  btn.addEventListener("click", () => {
    current = current === "rtl" ? "ltr" : "rtl";
    document.documentElement.setAttribute("dir", current);
    syncButton(current);
    try { localStorage.setItem("ssw_dir", current); } catch (e) {}
  });
}

/* ---------- Navbar scroll state ---------- */
function initNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const isSolidPage = nav.classList.contains("force-solid");
  const onScroll = () => {
    if (window.scrollY > 40 || isSolidPage) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll);
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("mobile-open");
  });
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("mobile-open"));
  });
}

/* ---------- Highlight active nav link ---------- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------- Footer year ---------- */
function initYear() {
  document.querySelectorAll(".js-year").forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------- Currency helper ---------- */
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

/* ---------- Toast helper (used across pages) ---------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ============================================================
   Card rendering (shared across Home / Treatments / Therapists)
   ============================================================ */

function treatmentCardHTML(t) {
  return `
    <div class="card reveal" data-category="${t.category}">
      <div class="card-img">
        <img src="${t.img}" alt="${t.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="card-body">
        <span class="card-tag">${CATEGORY_LABELS[t.category]}</span>
        <h3>${t.name}</h3>
        <p style="color:var(--text-muted);font-size:0.92rem;margin-top:8px;">${t.desc}</p>
        <div class="card-meta">
          <span>⏱ ${t.duration}</span>
          <span class="card-price">${formatINR(t.price)}</span>
        </div>
        <a href="login.html#book=${t.id}" class="btn btn-outline-dark btn-block btn-sm">Book This Treatment</a>
      </div>
    </div>`;
}

function therapistCardHTML(t) {
  return `
    <div class="card therapist-card reveal">
      <div class="card-img">
        <img src="${t.img}" alt="${t.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="card-body">
        <h3>${t.name}</h3>
        <p style="color:var(--gold);font-size:0.85rem;font-weight:600;margin-top:4px;">${t.title}</p>
        <div class="therapist-exp">${t.experience}+ years experience</div>
        <div class="therapist-specialties">
          ${t.specialties.map(s => `<span class="chip">${s}</span>`).join("")}
        </div>
        <p class="bio">${t.bio}</p>
        <a href="login.html#therapist=${t.id}" class="btn btn-outline-dark btn-block btn-sm">Book with ${t.name.split(" ")[0]}</a>
      </div>
    </div>`;
}

function planCardHTML(p) {
  return `
    <div class="plan-card ${p.highlight ? "highlight" : ""} reveal">
      ${p.highlight ? '<span class="plan-badge">Most Popular</span>' : ""}
      <h3 class="plan-name">${p.name}</h3>
      <p class="plan-tagline">${p.tagline}</p>
      <div class="plan-price">${formatINR(p.price)}<span>/${p.period}</span></div>
      <div class="plan-sessions">${p.sessions} sessions / month</div>
      <ul class="plan-perks">
        ${p.perks.map(perk => `<li>${perk}</li>`).join("")}
      </ul>
      <a href="login.html#plan=${p.id}" class="btn ${p.highlight ? "btn-gold" : "btn-outline-dark"} btn-block">Choose Plan</a>
    </div>`;
}

function testimonialCardHTML(t) {
  return `
    <div class="testimonial-card reveal">
      <div class="stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-role">${t.role}</div>
    </div>`;
}

/* ---------- Home page: featured subsets ---------- */
function renderFeaturedTreatments() {
  const el = document.getElementById("featuredTreatments");
  if (!el) return;
  const featured = TREATMENTS.filter(t => t.featured).slice(0, 4);
  el.innerHTML = featured.map(treatmentCardHTML).join("");
}

function renderFeaturedTherapists() {
  const el = document.getElementById("featuredTherapists");
  if (!el) return;
  const featured = THERAPISTS.filter(t => t.featured).slice(0, 3);
  el.innerHTML = featured.map(therapistCardHTML).join("");
}

function renderTestimonials() {
  const el = document.getElementById("testimonialsGrid");
  if (!el) return;
  el.innerHTML = TESTIMONIALS.map(testimonialCardHTML).join("");
}

/* ---------- Home 2: its own featured subsets (kept distinct from Home) ---------- */
function renderFeaturedTreatments2() {
  const el = document.getElementById("featuredTreatments2");
  if (!el) return;
  const featured = TREATMENTS.filter(t => t.featured2).slice(0, 4);
  el.innerHTML = featured.map(treatmentCardHTML).join("");
}

function renderFeaturedTherapists2() {
  const el = document.getElementById("featuredTherapists2");
  if (!el) return;
  const featured = THERAPISTS.filter(t => t.featured2).slice(0, 3);
  el.innerHTML = featured.map(therapistCardHTML).join("");
}

function renderTestimonials2() {
  const el = document.getElementById("testimonialsGrid2");
  if (!el) return;
  el.innerHTML = TESTIMONIALS_2.map(testimonialCardHTML).join("");
}

/* ---------- Home 2: plan spotlight (distinct layout from the Membership grid) ---------- */
function renderPlanSpotlight() {
  const el = document.getElementById("planSpotlight");
  if (!el) return;
  const spotlight = MEMBERSHIP_PLANS.find(p => p.highlight) || MEMBERSHIP_PLANS[0];
  const others = MEMBERSHIP_PLANS.filter(p => p.id !== spotlight.id);
  el.innerHTML = `
    <div class="spotlight-main reveal">
      <span class="plan-badge">Most Popular</span>
      <h3 class="plan-name">${spotlight.name}</h3>
      <p class="plan-tagline">${spotlight.tagline}</p>
      <div class="plan-price">${formatINR(spotlight.price)}<span>/${spotlight.period}</span></div>
      <ul class="plan-perks">
        ${spotlight.perks.map(perk => `<li>${perk}</li>`).join("")}
      </ul>
      <a href="login.html#plan=${spotlight.id}" class="btn btn-gold btn-block">Choose ${spotlight.name}</a>
    </div>
    <div class="spotlight-side">
      ${others.map(p => `
        <div class="spotlight-row reveal">
          <div>
            <h4>${p.name}</h4>
            <span>${p.sessions} sessions / month</span>
          </div>
          <div class="spotlight-row-price">
            ${formatINR(p.price)}<span>/${p.period}</span>
          </div>
        </div>`).join("")}
      <a href="membership.html" class="btn btn-outline-dark btn-block">Compare All Plans</a>
    </div>`;
}

/* ---------- Treatments page: full listing grouped by category ---------- */
function renderAllTreatments() {
  const el = document.getElementById("treatmentsByCategory");
  if (!el) return;
  const cats = ["massage", "wraps", "aromatherapy"];
  el.innerHTML = cats.map(cat => {
    const items = TREATMENTS.filter(t => t.category === cat);
    return `
      <div class="category-block" data-cat-block="${cat}">
        <div class="category-head">
          <h2>${CATEGORY_LABELS[cat]}</h2>
          <span class="category-count">${items.length} treatments</span>
        </div>
        <div class="grid grid-3">
          ${items.map(treatmentCardHTML).join("")}
        </div>
      </div>`;
  }).join("");
}

function applyTreatmentsFilter(filter) {
  const tabs = document.querySelectorAll(".filter-tab");
  if (!tabs.length) return;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.filter === filter));
  document.querySelectorAll(".category-block").forEach(block => {
    const show = filter === "all" || block.dataset.catBlock === filter;
    block.style.display = show ? "" : "none";
  });
}

function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener("click", () => applyTreatmentsFilter(tab.dataset.filter));
  });
}

/* Deep link from the footer's "Treatments" column (e.g. treatments.html#category=massage)
   straight into the matching filter tab, using a hash fragment for the same reason as the
   other deep links in this file: it survives static-server "clean URL" redirects. */
function applyTreatmentCategoryDeepLink() {
  const match = window.location.hash.match(/category=([\w-]+)/);
  if (!match) return;
  const tabs = document.querySelectorAll(".filter-tab");
  const filter = match[1];
  const hasTab = [...tabs].some(t => t.dataset.filter === filter);
  if (!hasTab) return;
  applyTreatmentsFilter(filter);
  const target = document.querySelector(".filter-tabs");
  if (target) target.scrollIntoView({ block: "start" });
}

/* ---------- Therapists page: full grid ---------- */
function renderAllTherapists() {
  const el = document.getElementById("allTherapists");
  if (!el) return;
  el.innerHTML = THERAPISTS.map(therapistCardHTML).join("");
}

/* ---------- Membership page ---------- */
function renderPlans() {
  const el = document.getElementById("plansGrid");
  if (!el) return;
  el.innerHTML = MEMBERSHIP_PLANS.map(planCardHTML).join("");
}

/* ---------- Accordions (FAQ) ---------- */
function initAccordions() {
  document.querySelectorAll(".accordion-item").forEach(item => {
    const head = item.querySelector(".accordion-head");
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* ---------- Newsletter (front-end only) ---------- */
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you for subscribing! Watch your inbox for wellness tips.");
    form.reset();
  });
}

/* ---------- Contact form (front-end only) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("contactMsg");
    msg.textContent = "Thank you! Your message has been received — our team will reach out within 24 hours.";
    msg.classList.add("show", "success");
    form.reset();
  });
}

/* ---------- Nav auth-aware buttons (Login -> My Account) ---------- */
function updateNavAuthState() {
  const user = getCurrentUser();
  document.querySelectorAll(".js-auth-link").forEach(link => {
    if (user) {
      link.textContent = "My Account";
      link.href = "dashboard.html";
    } else {
      link.textContent = "Login";
      link.href = "login.html";
    }
  });
}

/* ============================================================
   Blog
   ============================================================ */

function getAuthorName(authorId) {
  const t = THERAPISTS.find(x => x.id === authorId);
  return t ? t.name : "Serenity Editorial Team";
}

function formatPostDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function blogCardHTML(p) {
  return `
    <a href="blog-post.html#post=${p.id}" class="blog-card reveal" data-category="${p.category}">
      <div class="blog-card-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="blog-card-body">
        <span class="card-tag">${BLOG_CATEGORY_LABELS[p.category]}</span>
        <h3>${p.title}</h3>
        <p class="blog-excerpt">${p.excerpt}</p>
        <div class="blog-meta"><span>${getAuthorName(p.author)}</span><span>&middot;</span><span>${formatPostDate(p.date)}</span><span>&middot;</span><span>${p.readTime}</span></div>
      </div>
    </a>`;
}

function blogFeaturedHTML(p) {
  return `
    <a href="blog-post.html#post=${p.id}" class="blog-featured reveal">
      <div class="blog-featured-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="blog-featured-body">
        <span class="card-tag">${BLOG_CATEGORY_LABELS[p.category]}</span>
        <h2>${p.title}</h2>
        <p>${p.excerpt}</p>
        <div class="blog-meta"><span>${getAuthorName(p.author)}</span><span>&middot;</span><span>${formatPostDate(p.date)}</span><span>&middot;</span><span>${p.readTime}</span></div>
        <span class="btn btn-outline-dark btn-sm" style="margin-top:20px;">Read Article</span>
      </div>
    </a>`;
}

function renderBlogPage() {
  const featuredEl = document.getElementById("blogFeatured");
  const gridEl = document.getElementById("blogGrid");
  if (!gridEl && !featuredEl) return;
  const featured = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter(p => p.id !== featured.id);
  if (featuredEl) featuredEl.innerHTML = blogFeaturedHTML(featured);
  if (gridEl) gridEl.innerHTML = rest.map(blogCardHTML).join("");
}

function initBlogFilterTabs() {
  const tabs = document.querySelectorAll(".blog-filter-tab");
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      document.querySelectorAll(".blog-card").forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* ---------- Blog article detail page ---------- */
function renderBlogPostPage() {
  const bodyEl = document.getElementById("postBody");
  if (!bodyEl) return;

  // Deep links use a hash fragment (#post=id) rather than a query string,
  // because static file servers with "clean URLs" (e.g. `serve`) redirect
  // /blog-post.html -> /blog-post and drop the query string in the process.
  // A hash fragment is never sent to the server, so it always survives.
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const requestedId = params.get("post");
  const post = BLOG_POSTS.find(p => p.id === requestedId) || BLOG_POSTS[0];

  document.title = post.title + " | Serenity Spa & Wellness";
  document.getElementById("postCategory").textContent = BLOG_CATEGORY_LABELS[post.category];
  document.getElementById("postTitle").textContent = post.title;
  document.getElementById("postMeta").innerHTML =
    `By <strong>${getAuthorName(post.author)}</strong> &middot; ${formatPostDate(post.date)} &middot; ${post.readTime}`;

  const imgEl = document.getElementById("postImg");
  imgEl.src = post.img;
  imgEl.alt = post.title;
  imgEl.onerror = () => { imgEl.style.display = "none"; };

  bodyEl.innerHTML = post.content.map(block =>
    block.type === "h" ? `<h3>${block.text}</h3>` : `<p>${block.text}</p>`
  ).join("");

  const relatedEl = document.getElementById("relatedPosts");
  if (relatedEl) {
    const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category);
    const fallback = BLOG_POSTS.filter(p => p.id !== post.id && p.category !== post.category);
    const pick = related.concat(fallback).slice(0, 3);
    relatedEl.innerHTML = pick.map(blogCardHTML).join("");
  }
}
