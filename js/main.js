/* Katlas pipeline: one orchestrated pass on load, then it rests.
   The fill's length is a single custom property, so the horizontal and
   vertical layouts animate off the same number. */

(function () {
  "use strict";

  var pipe = document.getElementById("pipe");
  if (!pipe) return;

  var steps = Array.prototype.slice.call(pipe.querySelectorAll(".pipe__step"));
  var offRamp = document.getElementById("pipeOff");
  var marks = steps.map(function (el) { return parseFloat(el.dataset.at); });

  function paint(p) {
    pipe.style.setProperty("--p", p);
    steps.forEach(function (el, i) {
      var at = marks[i];
      var next = i + 1 < marks.length ? marks[i + 1] : Infinity;
      el.classList.toggle("is-done", p >= at);
      el.classList.toggle("is-live", p >= at && p < Math.min(next, at + 0.14));
    });
    if (offRamp) offRamp.classList.toggle("is-on", p >= 0.72);
  }

  function rest() {
    paint(1);
    steps.forEach(function (el) { el.classList.remove("is-live"); });
    if (offRamp) offRamp.classList.add("is-on");
  }

  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (still.matches) { rest(); return; }

  var DURATION = 2600;
  var started = 0;

  function frame(now) {
    if (!started) started = now;
    var t = Math.min((now - started) / DURATION, 1);
    // Ease out: the run slows as it approaches deploy, the way a real one does.
    paint(1 - Math.pow(1 - t, 2.2));
    if (t < 1) requestAnimationFrame(frame);
    else rest();
  }

  paint(0);
  setTimeout(function () { requestAnimationFrame(frame); }, 450);
})();

/* Copy-to-clipboard on the contact rows. */
(function () {
  "use strict";

  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.dataset.copy;
      var done = function () {
        var was = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = was;
          btn.classList.remove("is-copied");
        }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done, function () {
          btn.textContent = "Copy failed";
        });
        return;
      }

      var pad = document.createElement("textarea");
      pad.value = value;
      pad.setAttribute("readonly", "");
      pad.style.position = "fixed";
      pad.style.opacity = "0";
      document.body.appendChild(pad);
      pad.select();
      try { document.execCommand("copy"); done(); }
      catch (err) { btn.textContent = "Copy failed"; }
      document.body.removeChild(pad);
    });
  });
})();
