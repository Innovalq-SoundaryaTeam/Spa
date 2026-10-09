/* ============================================================
   Serenity Spa & Wellness — Client Auth (demo, localStorage-based)
   No backend is involved: this simulates accounts, sessions and
   a member data set entirely in the browser for demonstration.
   ============================================================ */

const LS_USERS = "ssw_users";
const LS_SESSION = "ssw_session";

function getUsers() {
  try { return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
  catch (e) { return []; }
}
function saveUsers(users) { localStorage.setItem(LS_USERS, JSON.stringify(users)); }

function getCurrentUser() {
  const email = localStorage.getItem(LS_SESSION);
  if (!email) return null;
  return getUsers().find(u => u.email === email) || null;
}

function setSession(email) { localStorage.setItem(LS_SESSION, email); }
function clearSession() { localStorage.removeItem(LS_SESSION); }

function userKey(email, suffix) { return `ssw_${suffix}_${email}`; }

/* ---------- Seed a demo account with rich sample data ---------- */
function seedDemoAccount() {
  const users = getUsers();
  if (users.find(u => u.email === "demo@serenityspa.com")) return;

  users.push({
    name: "Demo Client",
    email: "demo@serenityspa.com",
    phone: "+91 98765 43210",
    password: "demo123",
    joined: "2024-11-02"
  });
  saveUsers(users);

  const email = "demo@serenityspa.com";
  const bookings = [
    {
      id: "bk1001",
      treatmentId: "hot-stone",
      treatmentName: "Hot Stone Massage",
      therapistId: "karan-kapoor",
      therapistName: "Karan Kapoor",
      date: futureDate(5),
      time: "3:00 PM",
      price: 3200,
      status: "upcoming",
      createdAt: pastDate(3)
    },
    {
      id: "bk1000",
      treatmentId: "swedish-60",
      treatmentName: "Swedish Massage",
      therapistId: "ananya-sharma",
      therapistName: "Ananya Sharma",
      date: pastDate(10),
      time: "11:00 AM",
      price: 2500,
      status: "completed",
      createdAt: pastDate(14)
    },
    {
      id: "bk999",
      treatmentId: "aroma-massage",
      treatmentName: "Essential Oil Aromatherapy Massage",
      therapistId: "priya-nair",
      therapistName: "Priya Nair",
      date: pastDate(24),
      time: "5:00 PM",
      price: 2900,
      status: "completed",
      createdAt: pastDate(27)
    },
    {
      id: "bk998",
      treatmentId: "deep-tissue",
      treatmentName: "Deep Tissue Massage",
      therapistId: "ananya-sharma",
      therapistName: "Ananya Sharma",
      date: pastDate(2),
      time: "1:00 PM",
      price: 2800,
      status: "cancelled",
      createdAt: pastDate(6)
    }
  ];
  localStorage.setItem(userKey(email, "bookings"), JSON.stringify(bookings));

  const receipts = [
    { id: "RCPT-88231", date: pastDate(10), treatmentName: "Swedish Massage", amount: 2500, method: "UPI" },
    { id: "RCPT-88190", date: pastDate(24), treatmentName: "Essential Oil Aromatherapy Massage", amount: 2900, method: "Credit Card" },
    { id: "RCPT-87950", date: pastDate(40), treatmentName: "Gold Rejuvenation Membership", amount: 5499, method: "UPI" }
  ];
  localStorage.setItem(userKey(email, "receipts"), JSON.stringify(receipts));

  const membership = {
    planId: "gold",
    sessionsTotal: 4,
    sessionsUsed: 2,
    renewDate: futureDate(18)
  };
  localStorage.setItem(userKey(email, "membership"), JSON.stringify(membership));
}

function futureDate(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function pastDate(days) {
  const d = new Date(); d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

/* ---------- Register ---------- */
function registerUser({ name, email, phone, password }) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "An account with this email already exists. Please login instead." };
  }
  users.push({ name, email, phone, password, joined: new Date().toISOString().slice(0, 10) });
  saveUsers(users);
  localStorage.setItem(userKey(email, "bookings"), JSON.stringify([]));
  localStorage.setItem(userKey(email, "receipts"), JSON.stringify([]));
  localStorage.setItem(userKey(email, "membership"), JSON.stringify(null));
  setSession(email);
  return { ok: true };
}

/* ---------- Login ---------- */
function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, message: "No account found with that email." };
  if (user.password !== password) return { ok: false, message: "Incorrect password. Please try again." };
  setSession(user.email);
  return { ok: true };
}

/* ---------- Forgot / reset password ----------
   No backend, so no email can actually be sent. Rather than faking a
   "check your email" message that goes nowhere, the demo is upfront about
   this and lets the visitor set a new password directly once they confirm
   the account email. */
function resetPassword({ email, newPassword }) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) return { ok: false, message: "No account found with that email." };
  users[idx].password = newPassword;
  saveUsers(users);
  return { ok: true };
}

/* ---------- Social sign-in (demo simulation) ----------
   This is a static demo site with no backend, so there is no real OAuth
   provider to hand off to. To keep the "Continue with Google/Apple"
   buttons honest rather than dead links, clicking one signs the visitor
   into a simulated account for that provider, created locally the same
   way the demo account is — no real Google/Apple account is contacted. */
function socialLogin(provider) {
  const email = provider === "google" ? "google.client@serenityspa.com" : "apple.client@serenityspa.com";
  const name = provider === "google" ? "Google Client" : "Apple Client";
  const users = getUsers();
  if (!users.find(u => u.email === email)) {
    users.push({ name, email, phone: "", password: null, joined: new Date().toISOString().slice(0, 10), provider });
    saveUsers(users);
    localStorage.setItem(userKey(email, "bookings"), JSON.stringify([]));
    localStorage.setItem(userKey(email, "receipts"), JSON.stringify([]));
    localStorage.setItem(userKey(email, "membership"), JSON.stringify(null));
  }
  setSession(email);
  return { ok: true };
}

/* ---------- Guard: redirect if dashboard accessed without session ---------- */
function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}

/* ---------- Redirect away from login page if already signed in ---------- */
function redirectIfAuthed() {
  // Preserve any deep-link hash (#book=, #therapist=, #plan=) so an already
  // logged-in client still lands on the right pre-filled booking view.
  if (getCurrentUser()) window.location.href = "dashboard.html" + window.location.hash;
}

document.addEventListener("DOMContentLoaded", seedDemoAccount);
