// Canvas setup for dynamic stars
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }

    update() {
        this.alpha += this.speed;
        if (this.alpha >= 1 || this.alpha <= 0) {
            this.speed = -this.speed;
        }
        this.draw();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => star.update());
    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

initStars();
animateStars();

// Countdown Timer
const countdownElement = document.getElementById("countdown");
const customMessage = document.getElementById("customMessage");
const cakeElement = document.getElementById("cake");
const song = document.getElementById("birthdaySong");

// Set target date here
const targetDate = new Date("2024-12-11T00:00:00");

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        countdownElement.textContent = "Happy Birthday!";
        customMessage.style.display = "none"; // Hide the custom message
        cakeElement.classList.remove("hidden"); // Show the cake
        song.play();
        clearInterval(interval);
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

// Hide the cake initially
cakeElement.classList.add("hidden");

// Start the countdown
const interval = setInterval(updateCountdown, 1000);
