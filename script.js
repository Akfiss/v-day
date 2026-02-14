// ===== GIF STAGES =====
const gifStages = [
  "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif", // 0 normal
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif", // 1 confused
  "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif", // 2 pleading
  "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif", // 3 sad
  "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif", // 4 sadder
  "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif", // 5 devastated
  "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif", // 6 very devastated
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif", // 7 crying runaway
];

// ===== MESSAGES =====
const noMessages = [
  "No",
  "Are you sure honey? 🤔",
  "Sayang please... 🥺",
  "If you say no, I will be really sad...",
  "I will be very sad... 😢",
  "Please??? 💔",
  "Don't do this to me...",
  "Last chance! 😭",
  "You can't catch me anyway 😜",
];

const yesTeasePokes = [
  "try saying no first... I bet you want to know what happens 😏",
  "go on, hit no... just once 👀",
  "you're missing out on something funny 😈",
  "click no, I dare you 😏",
];

const bearSpeechLines = [
  "Psst... say yes! 🤫",
  "The answer is obvious 💕",
  "Don't break my heart! 🥺",
  "I believe in you! 🧸",
  "Love is the answer! 💝",
  "You two are meant to be! ✨",
  "Say YES already! 😤💕",
  "My heart can't take it! 💓",
];

const sadEmojis = ["😢", "💔", "😭", "🥺", "😿", "💧", "🫠", "😞"];
const floatingEmojis = [
  "💕",
  "❤️",
  "🌹",
  "🧸",
  "💌",
  "🍫",
  "💗",
  "💖",
  "🦋",
  "🌸",
  "✨",
  "💝",
  "🎀",
  "💐",
];

// ===== STATE =====
let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = false;
let bearSpeechIndex = 0;
let secretBuffer = "";

// ===== DOM ELEMENTS =====
const catGif = document.getElementById("cat-gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const music = document.getElementById("bg-music");
const titleEl = document.getElementById("title");
const mainContainer = document.getElementById("main-container");

// ===== ENVELOPE INTRO =====
function openEnvelope() {
  const envelope = document.getElementById("envelope");
  const overlay = document.getElementById("envelope-overlay");

  envelope.classList.add("envelope-open");

  setTimeout(() => {
    overlay.classList.add("overlay-exit");
    // Start music
    music.volume = 0.3;
    music
      .play()
      .then(() => {
        musicPlaying = true;
        document.getElementById("music-toggle").textContent = "🔊";
      })
      .catch(() => {});
    document.getElementById("music-toggle").style.display = "";
  }, 600);

  setTimeout(() => {
    overlay.remove();
    mainContainer.style.display = "";
    mainContainer.style.animation = "cardFloat 4s ease-in-out infinite";
    startTypingEffect();
    initCountdown();
    startEmojiStorm();
    initSparkleTrail();
  }, 1100);
}

// ===== TYPING EFFECT =====
function startTypingEffect() {
  const text = "Will you be my Valentine? 💕";
  let i = 0;
  titleEl.innerHTML = '<span class="typing-cursor"></span>';

  function typeChar() {
    if (i < text.length) {
      const cursor = titleEl.querySelector(".typing-cursor");
      const span = document.createElement("span");
      span.textContent = text[i];
      titleEl.insertBefore(span, cursor);
      i++;
      setTimeout(typeChar, 60 + Math.random() * 40);
    } else {
      // Remove cursor after typing done
      setTimeout(() => {
        const cursor = titleEl.querySelector(".typing-cursor");
        if (cursor) cursor.remove();
      }, 1500);
    }
  }
  typeChar();
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const section = document.getElementById("countdown-section");
  const now = new Date();
  const currentYear = now.getFullYear();
  let vDay = new Date(currentYear, 1, 14); // Feb 14

  // If Valentine's Day has passed this year, show "Happy Valentine's Day!"
  if (now > vDay) {
    // Check if today IS Valentine's Day
    if (now.getMonth() === 1 && now.getDate() === 14) {
      section.innerHTML =
        '<p class="countdown-message">💕 Happy Valentine\'s Day! Today is the day! 💕</p>';
    } else {
      // Next year's Valentine's Day
      vDay = new Date(currentYear + 1, 1, 14);
      renderCountdown(section, vDay);
    }
  } else {
    renderCountdown(section, vDay);
  }
}

function renderCountdown(section, targetDate) {
  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      section.innerHTML =
        '<p class="countdown-message">💕 Happy Valentine\'s Day! 💕</p>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    section.innerHTML = `
            <div class="countdown">
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${mins}</span>
                    <span class="countdown-label">Mins</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${secs}</span>
                    <span class="countdown-label">Secs</span>
                </div>
            </div>
        `;
    requestAnimationFrame(update);
  }
  update();
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

    // Clean up after animation
    setTimeout(() => el.remove(), 20000);
  }

  // Initial burst
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnEmoji(), i * 300);
  }

  // Continuous spawning
  setInterval(spawnEmoji, 1200);
}

// ===== SPARKLE CURSOR TRAIL =====
function initSparkleTrail() {
  const canvas = document.getElementById("sparkle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let sparkles = [];
  let mouseX = 0,
    mouseY = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Spawn sparkles on mouse move
    for (let i = 0; i < 2; i++) {
      sparkles.push({
        x: mouseX + (Math.random() - 0.5) * 20,
        y: mouseY + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        color: `hsl(${330 + Math.random() * 40}, 100%, ${60 + Math.random() * 30}%)`,
      });
    }
  });

  function drawSparkle(s) {
    ctx.save();
    ctx.globalAlpha = s.life;
    ctx.fillStyle = s.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = s.color;

    // Draw a tiny star
    ctx.beginPath();
    const spikes = 4;
    const outerR = s.size;
    const innerR = s.size * 0.4;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const x = s.x + Math.cos(angle) * r;
      const y = s.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles = sparkles.filter((s) => s.life > 0);
    sparkles.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;
      s.size *= 0.99;
      drawSparkle(s);
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== MUSIC TOGGLE =====
function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    document.getElementById("music-toggle").textContent = "🔇";
  } else {
    music.muted = false;
    music.play();
    musicPlaying = true;
    document.getElementById("music-toggle").textContent = "🔊";
  }
}

// ===== BEAR COMPANION =====
function bearSpeak() {
  const speech = document.getElementById("bear-speech");
  speech.textContent =
    bearSpeechLines[bearSpeechIndex % bearSpeechLines.length];
  speech.classList.add("show");
  bearSpeechIndex++;

  clearTimeout(speech._timer);
  speech._timer = setTimeout(() => speech.classList.remove("show"), 3000);
}

// Auto bear speech every 15s
setInterval(() => {
  if (document.getElementById("bear")) {
    bearSpeak();
  }
}, 15000);

// ===== YES BUTTON =====
function handleYesClick() {
  if (!runawayEnabled) {
    const msg =
      yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
    yesTeasedCount++;
    showTeaseMessage(msg);
    return;
  }
  // Celebration transition
  document.body.style.transition = "opacity 0.5s ease";
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 500);
}

function showTeaseMessage(msg) {
  let toast = document.getElementById("tease-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== NO BUTTON =====
function handleNoClick() {
  noClickCount++;

  // Emoji explosion
  spawnEmojiExplosion();

  // Cycle through guilt-trip messages
  const msgIndex = Math.min(noClickCount, noMessages.length - 1);
  noBtn.textContent = noMessages[msgIndex];

  // Grow the Yes button bigger each time (wider, not taller)
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${Math.min(currentSize * 1.35, 56)}px`;
  const padY = Math.min(14 + noClickCount * 2, 30);
  const padX = Math.min(45 + noClickCount * 12, 120);
  yesBtn.style.padding = `${padY}px ${padX}px`;
  yesBtn.style.maxWidth = "90vw";

  // Shrink No button to contrast
  if (noClickCount >= 2) {
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
  }

  // Swap cat GIF through stages
  const gifIndex = Math.min(noClickCount, gifStages.length - 1);
  swapGif(gifStages[gifIndex]);

  // Bear reacts
  const sadBearLines = [
    "Nooo! 😭",
    "Why?! 💔",
    "Please reconsider! 🥺",
    "My heart! 😢",
    "STOOOOP! 😫",
  ];
  const speech = document.getElementById("bear-speech");
  speech.textContent =
    sadBearLines[Math.min(noClickCount - 1, sadBearLines.length - 1)];
  speech.classList.add("show");
  clearTimeout(speech._timer);
  speech._timer = setTimeout(() => speech.classList.remove("show"), 2500);

  // Runaway starts at last message
  if (noClickCount >= noMessages.length - 1 && !runawayEnabled) {
    enableRunaway();
    runawayEnabled = true;
  }
}

// ===== EMOJI EXPLOSION =====
function spawnEmojiExplosion() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 12; i++) {
    const el = document.createElement("span");
    el.className = "emoji-explode";
    el.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];

    const angle = (Math.PI * 2 * i) / 12;
    const distance = 150 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    el.style.left = centerX + "px";
    el.style.top = centerY + "px";
    el.style.setProperty("--tx", tx + "px");
    el.style.setProperty("--ty", ty + "px");
    el.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

// ===== GIF SWAP =====
function swapGif(src) {
  catGif.style.opacity = "0";
  setTimeout(() => {
    catGif.src = src;
    catGif.style.opacity = "1";
  }, 200);
}

// ===== RUNAWAY NO BUTTON =====
function enableRunaway() {
  // Move button to body so position:fixed works (container has transform from cardFloat animation)
  document.body.appendChild(noBtn);
  noBtn.addEventListener("mouseover", runAway);
  noBtn.addEventListener("touchstart", runAway, { passive: true });
}

function runAway() {
  const margin = 20;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;

  const randomX = Math.random() * maxX + margin / 2;
  const randomY = Math.random() * maxY + margin / 2;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = "50";
}

// ===== KEYBOARD EASTER EGG =====
document.addEventListener("keydown", (e) => {
  secretBuffer += e.key.toLowerCase();
  if (secretBuffer.length > 10) secretBuffer = secretBuffer.slice(-10);

  if (secretBuffer.includes("love")) {
    secretBuffer = "";
    // Big heart explosion
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "emoji-explode";
        heart.textContent = ["💕", "❤️", "💖", "💗", "💝", "🌹"][
          Math.floor(Math.random() * 6)
        ];
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        const tx = (Math.random() - 0.5) * 400;
        const ty = -200 - Math.random() * 300;
        heart.style.setProperty("--tx", tx + "px");
        heart.style.setProperty("--ty", ty + "px");
        heart.style.fontSize = 2 + Math.random() * 3 + "rem";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
      }, i * 50);
    }
  }
});
