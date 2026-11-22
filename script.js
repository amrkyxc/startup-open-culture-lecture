/* =========================================================
   Satbayev Finance Club — open lecture landing
   ========================================================= */

/* >>> Google Форма регистрации <<< */
const REGISTRATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScL1pAco0ZeOuVj1EyYTgW5xnfCZUb_mMDqFp2DAVoLZS4p1Q/viewform";

const EVENT = {
  title: "Стартап-культура среди молодёжи",
  subtitle: "Между предпринимательскими амбициями и экономической реальностью",
  start: new Date("2026-11-24T18:30:00+05:00"),
  end: new Date("2026-11-24T20:00:00+05:00"),
  location: "Satbayev University, ул. Сатпаева, 22, Алматы, Казахстан",
  article:
    "https://digitalbusiness.kz/2026-04-15/18-letniy-paren-brosil-uchebu-v-ssha-radi-startapa-i-vernulsya-v-kazahstan/"
};

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Countdown ---------- */
const countdownEls = {
  days: $("days"),
  hours: $("hours"),
  minutes: $("minutes"),
  seconds: $("seconds")
};

function countdown() {
  const ms = EVENT.start - Date.now();

  if (ms <= 0) {
    Object.values(countdownEls).forEach((el) => {
      if (el) el.textContent = "00";
    });
    $("countdown-status").textContent =
      ms > -5400000 ? "Лекция уже началась" : "Мероприятие завершено";
    return;
  }

  const s = Math.floor(ms / 1000);
  const next = {
    days: pad(Math.floor(s / 86400)),
    hours: pad(Math.floor((s % 86400) / 3600)),
    minutes: pad(Math.floor((s % 3600) / 60)),
    seconds: pad(s % 60)
  };

  Object.keys(next).forEach((key) => {
    const el = countdownEls[key];
    if (!el) return;
    if (el.textContent === next[key]) return;
    el.textContent = next[key];

    // Soft "tick" on the changed unit (seconds change every second).
    if (!reduceMotion && key === "seconds") {
      el.classList.remove("tick");
      void el.offsetWidth;
      el.classList.add("tick");
    }
  });
}

countdown();
setInterval(countdown, 1000);

/* ---------- Google Calendar ---------- */
const calDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.title,
    dates: calDate(EVENT.start) + "/" + calDate(EVENT.end),
    details:
      EVENT.subtitle +
      "\nАудитория: TBA.\nМатериал: " +
      EVENT.article +
      "\nОрганизатор: Satbayev Finance Club",
    location: EVENT.location
  });
  return "https://calendar.google.com/calendar/render?" + params.toString();
}

const calendarLink = $("google-calendar");
if (calendarLink) calendarLink.href = googleCalendarUrl();

/* ---------- Registration links ---------- */
const isPlaceholder = REGISTRATION_URL.includes("REPLACE_ME");
const registerLinks = document.querySelectorAll("[data-register]");

registerLinks.forEach((link) => {
  if (!isPlaceholder) {
    link.href = REGISTRATION_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  link.addEventListener("click", (e) => {
    if (!isPlaceholder) return;
    e.preventDefault();
    toast("Ссылка на Google Форму ещё не добавлена. Вставьте её в script.js → REGISTRATION_URL");
    const target = $("register");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(message) {
  const el = $("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 4200);
}

/* ---------- Scroll progress + sticky header ---------- */
const progressBar = $("scroll-progress");
const header = $("site-header");
let scrollTicking = false;

function onScrollFrame() {
  const top = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;

  if (progressBar) {
    const ratio = height > 0 ? Math.min(1, Math.max(0, top / height)) : 0;
    progressBar.style.width = (ratio * 100).toFixed(2) + "%";
  }
  if (header) header.classList.toggle("scrolled", top > 12);

  scrollTicking = false;
}

function requestScrollFrame() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(onScrollFrame);
}

window.addEventListener("scroll", requestScrollFrame, { passive: true });
window.addEventListener("resize", requestScrollFrame, { passive: true });
onScrollFrame();

/* ---------- Scroll reveal ---------- */
const revealItems = document.querySelectorAll(".reveal, .reveal-scale");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

/* ---------- Stagger for card grids ---------- */
document.querySelectorAll(".topics").forEach((group) => {
  Array.from(group.children).forEach((child, i) => {
    if (child.classList.contains("reveal")) {
      child.style.transitionDelay = i * 90 + "ms";
    }
  });
});

/* ---------- Pointer tilt on cards ---------- */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", (px * 9).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

/* ---------- Hero parallax ---------- */
const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");

if (hero && heroArt && !reduceMotion) {
  const layers = Array.from(heroArt.querySelectorAll("[data-depth]"));

  hero.addEventListener(
    "pointermove",
    (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;

      heroArt.style.translate = (nx * 10).toFixed(1) + "px " + (ny * 7).toFixed(1) + "px";

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "0.05");
        layer.style.translate =
          (nx * depth * 120).toFixed(1) + "px " + (ny * depth * 80).toFixed(1) + "px";
      });
    },
    { passive: true }
  );

  hero.addEventListener("pointerleave", () => {
    heroArt.style.translate = "0px 0px";
    layers.forEach((layer) => {
      layer.style.translate = "0px 0px";
    });
  });
}

/* ---------- Footer year ---------- */
const yearEl = $("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
