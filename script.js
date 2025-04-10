document.getElementById('gift-button').addEventListener('click', () => {
  document.getElementById('gift-button').style.display = 'none';
  document.getElementById('celebration').classList.remove('hidden');

  const smokeOverlay = document.createElement('div');
  smokeOverlay.id = 'smoke-overlay';
  document.body.appendChild(smokeOverlay);

  const confettiAudio = document.getElementById('confetti-audio');
  confettiAudio.play();
  explodeConfetti();

  setTimeout(() => {
    const birthdayAudio = document.getElementById('birthday-audio');
    birthdayAudio.play();

    birthdayAudio.onended = function () {
      const secondSongAudio = document.getElementById('second-song-audio');
      secondSongAudio.play();
    };
  }, 1500);

  const fireworksAudio = document.getElementById('fireworks-audio');
  fireworksAudio.play();

  launchFireworks();
  createFloatingImages();
  displayMessage();
  showResetButton();
});

function explodeConfetti() {
  const container = document.getElementById('container');

  const overlay = document.createElement('div');
  overlay.classList.add('confetti-white-out'); 
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 20000); 


  const particles = 250;
  for (let i = 0; i < particles; i++) {
    const confetti = document.createElement('span');
    confetti.classList.add('confetti');

    const size = Math.random() * 8 + 4;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
    confetti.style.left = '50%';
    confetti.style.top = '50%';

    const angle = Math.random() * 2 * Math.PI;
    const velocity = Math.random() * 300 + 100;
    const x = Math.cos(angle) * velocity + 'px';
    const y = Math.sin(angle) * velocity + 'px';

    confetti.style.setProperty('--x', x);
    confetti.style.setProperty('--y', y);

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 35000); 
  }
}

function createFloatingImages() {
  const container = document.getElementById('floating-images');
  const images = [
    'assets/confeti1.png',
    'assets/confeti2.png',
    'assets/fiesta.png',
    'assets/globos.png',
    'assets/pastel.png',
    'assets/pastel2.png',
    'assets/regalo.png',
    'assets/regalos.png'
  ];

  setInterval(() => {
    const img = document.createElement('img');
    const randomImage = images[Math.floor(Math.random() * images.length)];
    img.src = randomImage;

    img.onerror = function () {
      console.error(`Error al cargar la imagen: ${randomImage}`);
    };

    img.onload = () => {
      img.style.left = Math.random() * 100 + 'vw';
      img.style.top = '-50px';
      img.style.width = `${img.naturalWidth * 0.2}px`;
      img.style.height = `${img.naturalHeight * 0.2}px`;
    };

    container.appendChild(img);
    setTimeout(() => img.remove(), 10000);
  }, 400);
}

function launchFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticle(x, y) {
    const count = 100;
    for (let i = 0; i < count; i++) {
      particles.push({
        x,
        y,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        life: 100
      });
    }
  }

  function drawParticles() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      const vx = Math.cos(p.angle) * p.speed;
      const vy = Math.sin(p.angle) * p.speed;

      p.x += vx;
      p.y += vy;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (p.life <= 0) particles.splice(index, 1);
    });
  }

  function animate() {
    drawParticles();
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createParticle(x, y);
  }, 1000);

  animate();
}

function displayMessage() {
  const message = document.getElementById('message');
  const h1 = message.querySelector('h1');
  const ps = message.querySelectorAll('p'); 

  message.style.opacity = 1; 
  h1.style.opacity = 1; 
  
    ps.forEach(p => {
    p.style.opacity = 1;
  });
}

function showResetButton() {
  setTimeout(() => {
    const resetButton = document.getElementById('reset-button');
    resetButton.style.display = 'inline-block';
    resetButton.addEventListener('click', () => location.reload());
  }, 50000);
}