const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const perchanceBtn = document.getElementById('perchanceBtn');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const celebrationMessage = document.getElementById('celebrationMessage');
const questionText = document.getElementById('questionText');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let noClickCount = 0;
let perchanceClickCount = 0;

// Confetti effect
const confettiParticles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 8;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 7 + 4;
        this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
        this.rotation = Math.random() * 360;
        this.shape = Math.random() > 0.5 ? 'circle' : 'square';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.99; // Slower decay for even longer-lasting confetti
        this.rotation += this.speedX * 2;
        if (this.size < 0.5) this.size = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        ctx.restore();
    }
}

function createConfetti() {
    for (let i = 0; i < 1500; i++) { // Increased confetti count for bigger celebration
        confettiParticles.push(new Particle());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.5) {
            confettiParticles.splice(index, 1);
        }
    });
    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Button interactions
yesBtn.addEventListener('click', () => {
    createConfetti();
    animateConfetti();
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    perchanceBtn.style.display = 'none';
    questionText.style.display = 'none';
    celebrationMessage.style.display = 'block';
});

noBtn.addEventListener('click', () => {
    noClickCount++;
    const noScale = Math.max(0.5, 1 - noClickCount * 0.2); // Adjusted for 5 clicks
    const yesScale = 1 + noClickCount * 0.2;
    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.opacity = Math.max(0.5, 1 - noClickCount * 0.2);
    perchanceBtn.style.display = 'none';
    if (noClickCount >= 5) { // Reduced to 5 clicks
        noBtn.style.display = 'none';
    }
});

perchanceBtn.addEventListener('click', () => {
    perchanceClickCount++;
    noBtn.style.display = 'none';
    const perchanceScale = Math.max(0.5, 1 - perchanceClickCount * 0.2); // Adjusted for 5 clicks
    const yesScale = 1 + perchanceClickCount * 0.2;
    perchanceBtn.style.transform = `scale(${perchanceScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;
    perchanceBtn.style.opacity = Math.max(0.5, 1 - perchanceClickCount * 0.2);
    if (perchanceClickCount >= 5) { // Reduced to 5 clicks
        perchanceBtn.style.display = 'none';
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
