/* Lea River FC — site scripts
   Minimal, no dependencies. Everything here is progressive enhancement:
   the site is fully usable with JavaScript disabled. */

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        nav.getAttribute("data-open") === "true" &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Countdown to next match ----------
     Kick-off is read from the <time> element already in the markup, so there
     is only one place to update it. The panel stays hidden unless the maths
     works out, and the date is visible in the text above either way. */
  var box = document.getElementById("countdown");
  var stamp = document.querySelector(".hero__details time[datetime]");
  if (!box || !stamp) return;

  var kickoff = new Date(stamp.getAttribute("datetime"));
  if (isNaN(kickoff.getTime())) return;

  var dEl = document.getElementById("cd-d");
  var hEl = document.getElementById("cd-h");
  var mEl = document.getElementById("cd-m");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    var diff = kickoff - new Date();
    if (diff <= 0) {
      box.hidden = true;
      return;
    }
    var mins = Math.floor(diff / 60000);
    dEl.textContent = Math.floor(mins / 1440);
    hEl.textContent = pad(Math.floor(mins / 60) % 24);
    mEl.textContent = pad(mins % 60);
    box.hidden = false;
  }

  tick();
  setInterval(tick, 30000);
})();
