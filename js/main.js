/* Lea River FC
   Two small jobs: the menu on narrow screens, and the countdown on the
   home page. Both are progressive enhancement — everything on the site
   is readable with JavaScript switched off. */

(function () {
  "use strict";

  /* --- Menu --- */
  var btn = document.querySelector(".nav-btn");
  var nav = document.querySelector(".nav");

  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      btn.setAttribute("aria-expanded", String(!open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (nav.getAttribute("data-open") === "true" &&
          !nav.contains(e.target) && !btn.contains(e.target)) {
        nav.setAttribute("data-open", "false");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Countdown ---
     Reads kick-off from the <time> already in the markup, so there is only
     one date to change when the fixture rolls over. Stays hidden if the
     date has passed or cannot be parsed. */
  var box = document.getElementById("count");
  var stamp = document.querySelector(".field__when time[datetime]");
  if (!box || !stamp) return;

  var kickoff = new Date(stamp.getAttribute("datetime"));
  if (isNaN(kickoff.getTime())) return;

  var d = document.getElementById("c-d");
  var h = document.getElementById("c-h");
  var m = document.getElementById("c-m");

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function tick() {
    var diff = kickoff - new Date();
    if (diff <= 0) { box.hidden = true; return; }
    var mins = Math.floor(diff / 60000);
    d.textContent = Math.floor(mins / 1440);
    h.textContent = pad(Math.floor(mins / 60) % 24);
    m.textContent = pad(mins % 60);
    box.hidden = false;
  }

  tick();
  setInterval(tick, 30000);
})();
