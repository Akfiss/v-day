// ===== STATE =====
let musicPlaying = false;
const floatingEmojis = [
  "💕",
  "❤️",
  "🌹",
  "💗",
  "💖",
  "🦋",
  "🌸",
  "✨",
  "💝",
  "🎀",
  "💐",
  "🧸",
];

// ===== ON LOAD =====
window.addEventListener("load", () => {
  launchConfetti();
  startHeartRain();
  startEmojiStorm();
  revealLoveMessages();
  scheduleFireworks();

  // Autoplay music
  const music = document.getElementById("bg-music");
  music.volume = 0.3;
  music
    .play()
    .then(() => {
      musicPlaying = true;
      document.getElementById("music-toggle").textContent = "🔊";
    })
    .catch(() => {});
});

// ===== CONFETTI (Enhanced with heart shapes) =====
function launchConfetti() {
  const colors = [
    "#ff69b4",
    "#ff1493",
    "#ff85a2",
    "#ffb3c1",
    "#ff0000",
    "#ff6347",
    "#fff",
    "#ffdf00",
    "#c44dff",
  ];
  const duration = 6000;
  const end = Date.now() + duration;

  // Big initial burst
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { x: 0.5, y: 0.3 },
    colors,
    shapes: ["circle", "square"],
    scalar: 1.2,
  });

  // Continuous side cannons
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 50,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors,
      shapes: ["circle", "square"],
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors,
      shapes: ["circle", "square"],
    });
  }, 250);
}

// ===== HEART RAIN (Canvas) =====
function startHeartRain() {
  const canvas = document.getElementById("heart-rain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const hearts = [];
  const heartColors = [
    "#ff69b4",
    "#ff1493",
    "#ff85a2",
    "#ffb3c1",
    "#c44dff",
    "#ff6b9d",
  ];

  function spawnHeart() {
    hearts.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: 8 + Math.random() * 16,
      speed: 1 + Math.random() * 2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      opacity: 0.3 + Math.random() * 0.5,
    });
  }

  function drawHeart(x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, -size, -size, -size * 0.4, 0, size * 0.5);
    ctx.bezierCurveTo(size, -size * 0.4, size * 0.5, -size, 0, -size * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((h, i) => {
      h.y += h.speed;
      h.x += Math.sin(h.wobble) * 0.8;
      h.wobble += h.wobbleSpeed;
      h.rotation += h.rotSpeed;

      drawHeart(h.x, h.y, h.size, h.rotation, h.color, h.opacity);

      // Remove if off screen
      if (h.y > canvas.height + 30) {
        hearts.splice(i, 1);
      }
    });

    requestAnimationFrame(animate);
  }

  // Spawn hearts periodically
  setInterval(spawnHeart, 200);
  // Initial burst
  for (let i = 0; i < 20; i++) {
    const h = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 8 + Math.random() * 16,
      speed: 1 + Math.random() * 2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      opacity: 0.3 + Math.random() * 0.5,
    };
    hearts.push(h);
  }

  animate();
}

// ===== FLOATING EMOJI STORM =====
function startEmojiStorm() {
  const container = document.getElementById("emoji-bg");
  if (!container) return;

  function spawnEmoji() {
    const el = document.createElement("span");
    el.className = "emoji-float";
    el.textContent =
      floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 1 + Math.random() * 1.5 + "rem";
    el.style.animationDuration = 8 + Math.random() * 10 + "s";
    el.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnEmoji(), i * 400);
  }
  setInterval(spawnEmoji, 1500);
}

// ===== SEQUENTIAL LOVE MESSAGES =====
function revealLoveMessages() {
  const messages = document.querySelectorAll(".love-msg");
  messages.forEach((msg, i) => {
    setTimeout(
      () => {
        msg.classList.add("visible");
      },
      2000 + i * 1500,
    ); // Start after 2s, 1.5s apart
  });
}

// ===== FIREWORKS (Recurring confetti bursts) =====
function scheduleFireworks() {
  setInterval(() => {
    const x = 0.2 + Math.random() * 0.6;
    const y = 0.2 + Math.random() * 0.4;

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { x, y },
      colors: ["#ff69b4", "#c44dff", "#ff1493", "#ffdf00", "#fff"],
      shapes: ["circle"],
      scalar: 1.1,
      gravity: 0.8,
      drift: 0,
    });
  }, 5000); // Every 5 seconds
}

// ===== MUSIC TOGGLE =====
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    document.getElementById("music-toggle").textContent = "🔇";
  } else {
    music.play();
    musicPlaying = true;
    document.getElementById("music-toggle").textContent = "🔊";
  }
}
