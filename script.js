document.addEventListener('DOMContentLoaded', function() {
  const giftButton = document.getElementById('gift-button');
  const allAudios = document.querySelectorAll('audio');

  giftButton.addEventListener('click', () => {
    giftButton.style.display = 'none';
    document.getElementById('celebration').classList.remove('hidden');

    const smokeOverlay = document.createElement('div');
    smokeOverlay.id = 'smoke-overlay';
    document.body.appendChild(smokeOverlay);

    const playAudio = (id) => {
      const audio = document.getElementById(id);
      audio.play().catch(() => {});
    };

    playAudio('confetti-audio');
    explodeConfetti();

    setTimeout(() => {
      playAudio('birthday-audio');
      const birthdayAudio = document.getElementById('birthday-audio');
      birthdayAudio.onended = () => playAudio('second-song-audio');
    }, 1500);

    playAudio('fireworks-audio');

    initializeFireworks();
    createFloatingImages();
    displayMessage();
    showResetButton();
  });

  allAudios.forEach(audio => {
    audio.muted = false;
  });
});

function getImageSize() {
  return window.innerWidth <= 768 ? 0.1 : 0.2;
}

function explodeConfetti() {
  const container = document.getElementById('container');
  const particleCount = 250;
  const particles = [];

  const overlay = document.createElement('div');
  overlay.classList.add('confetti-white-out');
  document.body.appendChild(overlay);
  
  setTimeout(() => overlay.remove(), 20000);

  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement('span');
    confetti.classList.add('confetti');

    const size = Math.random() * 8 + 4;
    const angle = Math.random() * 2 * Math.PI;
    const velocity = Math.random() * 300 + 100;
    const x = Math.cos(angle) * velocity + 'px';
    const y = Math.sin(angle) * velocity + 'px';

    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
    confetti.style.setProperty('--x', x);
    confetti.style.setProperty('--y', y);
    confetti.style.left = '50%';
    confetti.style.top = '50%';

    particles.push(confetti);
  }
  
  requestAnimationFrame(() => {
    particles.forEach(p => container.appendChild(p));
  });
  
  setTimeout(() => {
    particles.forEach(p => p.remove());
  }, 35000);
}

function createFloatingImages() {
  const container = document.getElementById('floating-images');
  const images = [
    'assets/confeti1.png',
    'assets/imagen1.png',
    'assets/confeti2.png',
    'assets/imagen2.png',
    'assets/fiesta.png',
    'assets/imagen3.png',
    'assets/globos.png',
    'assets/imagen4.png',
    'assets/pastel.png',
    'assets/imagen5.png',
    'assets/pastel2.png',
    'assets/imagen6.png',
    'assets/regalo.png',
    'assets/imagen7.png',
    'assets/regalos.png'
  ];

  const imageElements = [];
  let imageInterval = setInterval(() => {
    const img = document.createElement('img');
    const randomImage = images[Math.floor(Math.random() * images.length)];
    img.src = randomImage;

    img.onload = () => {
      const scaleFactor = getImageSize();
      img.style.left = Math.random() * 100 + 'vw';
      img.style.top = '-50px';
      img.style.width = `${img.naturalWidth * scaleFactor}px`;
      img.style.height = `${img.naturalHeight * scaleFactor}px`;
      container.appendChild(img);
      imageElements.push({
        element: img,
        removalTime: Date.now() + 10000
      });
    };
  }, 400);

  function cleanupImages() {
    const now = Date.now();
    while (imageElements.length > 0 && imageElements[0].removalTime <= now) {
      imageElements.shift().element.remove();
    }
    
    if (imageElements.length > 0) {
      requestAnimationFrame(cleanupImages);
    }
  }
  
  requestAnimationFrame(cleanupImages);
}

function initializeFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;
  let lastTimestamp = 0;
  const FPS_LIMIT = 30;
  const FRAME_DURATION = 1000 / FPS_LIMIT;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticles(x, y) {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x, y,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        life: 100
      });
    }
    particles = particles.concat(newParticles);
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const vx = Math.cos(p.angle) * p.speed;
      const vy = Math.sin(p.angle) * p.speed;

      p.x += vx;
      p.y += vy;
      p.life--;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  function animate(timestamp) {
    if (timestamp - lastTimestamp >= FRAME_DURATION) {
      updateParticles();
      drawParticles();
      lastTimestamp = timestamp;
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  let fireworksInterval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createParticles(x, y);
  }, 1000);

  animationFrameId = requestAnimationFrame(animate);
}

function displayMessage() {
  const message = document.getElementById('message');
  const h1 = message.querySelector('h1');
  const ps = message.querySelectorAll('p');

  requestAnimationFrame(() => {
    message.style.opacity = 1;
    h1.style.opacity = 1;
    ps.forEach(p => p.style.opacity = 1);
  });
}

function showResetButton() {
  setTimeout(() => {
    const resetButton = document.getElementById('reset-button');
    resetButton.style.display = 'inline-block';
    
    setTimeout(() => {
      resetButton.style.opacity = '1';
    }, 50);
    
    resetButton.addEventListener('click', () => location.reload());
  }, 50000);
}
