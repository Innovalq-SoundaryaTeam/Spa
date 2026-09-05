/* ============================================================
   Serenity Spa & Wellness — Client Dashboard logic
   All data is scoped to the signed-in demo user and stored in
   localStorage under ssw_bookings_<email>, ssw_receipts_<email>
   and ssw_membership_<email>.
   ============================================================ */

let CURRENT_USER = null;

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();
  CURRENT_USER = getCurrentUser();
  if (!CURRENT_USER) return;

  initSidebarNav();
  initTopbar();
  initBookingForm();
  initLogout();
  initReceiptModal();
  initProfileForm();
  applyDeepLinkPreselect();

  renderOverview();
  renderBookingsTable();
  renderMembership();
  renderReceipts();
  renderProfile();
});

/* ---------- Data helpers ---------- */
function getBookings() {
  try { return JSON.parse(localStorage.getItem(userKey(CURRENT_USER.email, "bookings"))) || []; }
  catch (e) { return []; }
}
function saveBookings(list) {
  localStorage.setItem(userKey(CURRENT_USER.email, "bookings"), JSON.stringify(list));
}
function getReceipts() {
  try { return JSON.parse(localStorage.getItem(userKey(CURRENT_USER.email, "receipts"))) || []; }
  catch (e) { return []; }
}
function saveReceipts(list) {
  localStorage.setItem(userKey(CURRENT_USER.email, "receipts"), JSON.stringify(list));
}
function getMembership() {
  try { return JSON.parse(localStorage.getItem(userKey(CURRENT_USER.email, "membership"))); }
  catch (e) { return null; }
}

/* ---------- Sidebar navigation ---------- */
function initSidebarNav() {
  const buttons = document.querySelectorAll(".dash-nav button");
  const views = document.querySelectorAll(".dash-view");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      views.forEach(v => v.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.view).classList.add("active");
      document.querySelector(".dash-sidebar").classList.remove("open");
    });
  });
  const mobileToggle = document.querySelector(".dash-mobile-toggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      document.querySelector(".dash-sidebar").classList.toggle("open");
    });
  }
}

function initTopbar() {
  document.getElementById("welcomeName").textContent = CURRENT_USER.name.split(" ")[0];
  document.getElementById("avatarInitials").textContent = CURRENT_USER.name
    .split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

function initLogout() {
  document.querySelectorAll(".js-logout").forEach(btn => {
    btn.addEventListener("click", () => {
      clearSession();
      window.location.href = "index.html";
    });
  });
}

/* ---------- Overview ---------- */
function renderOverview() {
  const bookings = getBookings();
  const upcoming = bookings.filter(b => b.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date));
  const membership = getMembership();
  const receipts = getReceipts();
  const totalSpent = receipts.reduce((sum, r) => sum + r.amount, 0);

  document.getElementById("statUpcoming").textContent = upcoming.length;
  document.getElementById("statMembership").textContent = membership
    ? `${membership.sessionsTotal - membership.sessionsUsed} left`
    : "None";
  document.getElementById("statSpent").textContent = formatINR(totalSpent);
  document.getElementById("statTotalVisits").textContent = bookings.filter(b => b.status === "completed").length;

  const nextBox = document.getElementById("nextAppointmentBox");
  if (upcoming.length) {
    const n = upcoming[0];
    nextBox.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <div class="card-tag">Next Appointment</div>
          <h3>${n.treatmentName}</h3>
          <p style="color:var(--text-muted);margin-top:6px;">with ${n.therapistName} &middot; ${formatDate(n.date)} at ${n.time}</p>
        </div>
        <button class="btn btn-outline-dark btn-sm" onclick="cancelBooking('${n.id}')">Cancel Booking</button>
      </div>`;
  } else {
    nextBox.innerHTML = `<div class="empty-state"><div class="ic">🌿</div>No upcoming appointments yet. Book your next treatment below.</div>`;
  }
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* ---------- Book Appointment ---------- */
function initBookingForm() {
  const treatmentSelect = document.getElementById("bookTreatment");
  const therapistSelect = document.getElementById("bookTherapist");
  const dateInput = document.getElementById("bookDate");
  const slotGrid = document.getElementById("slotGrid");
  const form = document.getElementById("bookingForm");
  if (!form) return;

  treatmentSelect.innerHTML = `<option value="">Select a treatment</option>` +
    TREATMENTS.map(t => `<option value="${t.id}">${t.name} — ${t.duration} — ${formatINR(t.price)}</option>`).join("");

  therapistSelect.innerHTML = `<option value="">Any available therapist</option>` +
    THERAPISTS.map(t => `<option value="${t.id}">${t.name} (${t.title})</option>`).join("");

  const today = new Date().toISOString().slice(0, 10);
  dateInput.min = today;
  dateInput.value = "";

  const slots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM", "8:00 PM"];
  slotGrid.innerHTML = slots.map(s => `<div class="slot-btn" data-slot="${s}">${s}</div>`).join("");
  let selectedSlot = null;
  slotGrid.querySelectorAll(".slot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      slotGrid.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSlot = btn.dataset.slot;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const treatmentId = treatmentSelect.value;
    const therapistId = therapistSelect.value;
    const date = dateInput.value;
    const msg = document.getElementById("bookingMsg");

    if (!treatmentId || !date || !selectedSlot) {
      msg.textContent = "Please choose a treatment, date and time slot to continue.";
      msg.className = "form-msg show error";
      return;
    }
    const treatment = TREATMENTS.find(t => t.id === treatmentId);
    const therapist = THERAPISTS.find(t => t.id === therapistId);

    const bookings = getBookings();
    const newBooking = {
      id: "bk" + Date.now(),
      treatmentId,
      treatmentName: treatment.name,
      therapistId: therapistId || "",
      therapistName: therapist ? therapist.name : "Any Available Therapist",
      date,
      time: selectedSlot,
      price: treatment.price,
      status: "upcoming",
      createdAt: new Date().toISOString().slice(0, 10)
    };
    bookings.unshift(newBooking);
    saveBookings(bookings);

    msg.textContent = `Booked! ${treatment.name} on ${formatDate(date)} at ${selectedSlot}.`;
    msg.className = "form-msg show success";
    form.reset();
    slotGrid.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("active"));
    selectedSlot = null;

    renderOverview();
    renderBookingsTable();
    showToast("Appointment booked successfully.");
  });
}

/* Pre-select treatment/therapist/plan when arriving via a "Book This Treatment" link */
function applyDeepLinkPreselect() {
  // Hash fragment, not a query string — see the note in js/main.js
  // (renderBlogPostPage) for why: it survives clean-URL server redirects.
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const treatmentId = params.get("book");
  const therapistId = params.get("therapist");
  const viewBtn = document.querySelector('.dash-nav button[data-view="view-book"]');

  if (treatmentId || therapistId) {
    if (treatmentId) document.getElementById("bookTreatment").value = treatmentId;
    if (therapistId) document.getElementById("bookTherapist").value = therapistId;
    if (viewBtn) viewBtn.click();
  }
}

/* ---------- Bookings / History table ---------- */
function renderBookingsTable() {
  const tbody = document.getElementById("bookingsTableBody");
  if (!tbody) return;
  const bookings = getBookings().sort((a, b) => b.date.localeCompare(a.date));

  if (!bookings.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="ic">📅</div>No bookings yet.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td>${b.treatmentName}</td>
      <td>${b.therapistName}</td>
      <td>${formatDate(b.date)} &middot; ${b.time}</td>
      <td class="num">${formatINR(b.price)}</td>
      <td><span class="status-pill ${b.status}">${capitalize(b.status)}</span></td>
      <td>${b.status === "upcoming" ? `<button class="link-btn danger" onclick="cancelBooking('${b.id}')">Cancel</button>` : "—"}</td>
    </tr>
  `).join("");
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function cancelBooking(id) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return;
  bookings[idx].status = "cancelled";
  saveBookings(bookings);
  renderOverview();
  renderBookingsTable();
  showToast("Booking cancelled.");
}

/* ---------- Membership ---------- */
function renderMembership() {
  const el = document.getElementById("membershipContent");
  if (!el) return;
  const membership = getMembership();

  if (!membership) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="ic">🌸</div>
        You don't have an active membership yet.<br>
        <a href="membership.html" class="btn btn-gold" style="margin-top:20px;">View Membership Plans</a>
      </div>`;
    return;
  }

  const plan = MEMBERSHIP_PLANS.find(p => p.id === membership.planId);
  const remaining = membership.sessionsTotal - membership.sessionsUsed;
  const pct = Math.round((membership.sessionsUsed / membership.sessionsTotal) * 100);

  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;align-items:flex-start;">
      <div>
        <div class="card-tag">Current Plan</div>
        <h3>${plan.name}</h3>
        <p style="color:var(--text-muted);margin-top:6px;">${formatINR(plan.price)} / month &middot; Renews ${formatDate(membership.renewDate)}</p>
      </div>
      <a href="membership.html" class="btn btn-outline-dark btn-sm">Upgrade Plan</a>
    </div>
    <div style="margin-top:26px;">
      <div style="display:flex;justify-content:space-between;font-size:0.88rem;color:var(--text-muted);">
        <span>${membership.sessionsUsed} of ${membership.sessionsTotal} sessions used this cycle</span>
        <span>${remaining} remaining</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
    </div>
    <div style="margin-top:26px;">
      <h4 style="font-size:1rem;margin-bottom:14px;color:var(--sage-900);">Plan Perks</h4>
      <ul class="plan-perks">${plan.perks.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>`;
}

/* ---------- Payment Receipts ---------- */
function renderReceipts() {
  const tbody = document.getElementById("receiptsTableBody");
  if (!tbody) return;
  const receipts = getReceipts().sort((a, b) => b.date.localeCompare(a.date));

  if (!receipts.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="ic">🧾</div>No payment receipts yet.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = receipts.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${formatDate(r.date)}</td>
      <td>${r.treatmentName}</td>
      <td class="num">${formatINR(r.amount)}</td>
      <td><button class="link-btn" onclick='openReceipt(${JSON.stringify(r)})'>View Receipt</button></td>
    </tr>
  `).join("");
}

function initReceiptModal() {
  const bg = document.getElementById("receiptModalBg");
  if (!bg) return;
  bg.addEventListener("click", (e) => { if (e.target === bg) closeReceipt(); });
}

function openReceipt(r) {
  document.getElementById("receiptId").textContent = r.id;
  document.getElementById("receiptDate").textContent = formatDate(r.date);
  document.getElementById("receiptItem").textContent = r.treatmentName;
  document.getElementById("receiptMethod").textContent = r.method;
  document.getElementById("receiptAmount").textContent = formatINR(r.amount);
  document.getElementById("receiptModalBg").classList.add("show");
}
function closeReceipt() {
  document.getElementById("receiptModalBg").classList.remove("show");
}

/* ---------- Profile ---------- */
function renderProfile() {
  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const phoneInput = document.getElementById("profilePhone");
  if (!nameInput) return;
  nameInput.value = CURRENT_USER.name;
  emailInput.value = CURRENT_USER.email;
  phoneInput.value = CURRENT_USER.phone || "";
  document.getElementById("profileJoined").textContent = "Member since " + formatDate(CURRENT_USER.joined || new Date().toISOString().slice(0,10));
}

function initProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const users = getUsers();
    const idx = users.findIndex(u => u.email === CURRENT_USER.email);
    if (idx !== -1) {
      users[idx].name = document.getElementById("profileName").value.trim() || users[idx].name;
      users[idx].phone = document.getElementById("profilePhone").value.trim();
      saveUsers(users);
      CURRENT_USER = users[idx];
      initTopbar();
    }
    showToast("Profile updated successfully.");
  });
}
