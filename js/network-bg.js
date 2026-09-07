(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNetwork(host) {
    var canvas = document.createElement("canvas");
    canvas.className = "network-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.insertBefore(canvas, host.firstChild);

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var mouse = { x: 0, y: 0, active: false };
    var raf = null;

    var maxParticles = parseInt(host.dataset.maxParticles || "60", 10);
    var density = parseInt(host.dataset.density || "9000", 10);
    var linkDist = parseInt(host.dataset.linkDist || "130", 10);

    function size() {
      return { w: host.clientWidth, h: host.clientHeight };
    }

    function build() {
      var s = size();
      canvas.width = s.w * dpr;
      canvas.height = s.h * dpr;
      canvas.style.width = s.w + "px";
      canvas.style.height = s.h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var area = s.w * s.h;
      var count = Math.max(14, Math.min(maxParticles, Math.floor(area / density)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * s.w,
          y: Math.random() * s.h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.7
        });
      }
    }

    function frame() {
      var s = size();
      ctx.clearRect(0, 0, s.w, s.h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > s.w) p.vx *= -1;
        if (p.y < 0 || p.y > s.h) p.vy *= -1;
      }

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i], b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.strokeStyle = "rgba(120,130,255," + (0.18 * (1 - d / linkDist)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          var mdx = particles[i].x - mouse.x, mdy = particles[i].y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          var mDist = linkDist * 1.35;
          if (md < mDist) {
            ctx.strokeStyle = "rgba(154,162,255," + (0.38 * (1 - md / mDist)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148,156,255,0.75)";
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      var rect = host.getBoundingClientRect();
      var point = e.touches && e.touches[0] ? e.touches[0] : e;
      mouse.x = point.clientX - rect.left;
      mouse.y = point.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() { mouse.active = false; }

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    host.addEventListener("touchmove", onMove, { passive: true });
    host.addEventListener("touchend", onLeave);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    });

    build();
    if (reduced) {
      frame(); // draw a single static frame, no loop
    } else {
      frame();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".network-bg").forEach(initNetwork);
  });
})();
