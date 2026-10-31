const canvas = document.getElementById("thread-background");
const ctx = canvas.getContext("2d");

let width, height;
let threads = [];

const mouse = {
    x: -1000,
    y: -1000
};

// =====================================
// SETTINGS — CHANGE THESE
// =====================================

const SETTINGS = {
    threadCount: 30,       // Number of flowing threads
    pointsPerThread: 55,   // Smoothness / length
    spacing: 50,           // Distance between points

    speed: 0.002,          // Animation speed
    amplitude: 32,         // Amount of movement

    mouseRadius: 500,      // Cursor interaction area
    mouseStrength: 25,     // How strongly lines react

    lineWidth: 2,       // Thread thickness
    opacity: 1     // Thread visibility
};

// =====================================
// CANVAS SIZE
// =====================================

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createThreads();
}

// =====================================
// CREATE THREADS
// =====================================

function createThreads() {
    threads = [];

    for (let i = 0; i < SETTINGS.threadCount; i++) {
        threads.push({
            y: (i / SETTINGS.threadCount) * height,
            phase: i * 0.035,
            offset: i * 0.025
        });
    }
}

// =====================================
// MOUSE INTERACTION
// =====================================

window.addEventListener("pointermove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("pointerleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// =====================================
// ANIMATION
// =====================================

let time = 0;

function animate() {
    ctx.clearRect(0, 0, width, height);

    time += SETTINGS.speed;

    threads.forEach((thread, index) => {
        ctx.beginPath();

        for (let x = -20; x <= width + 20; x += SETTINGS.spacing) {

const wave1 = Math.sin(
    x * 0.006 + time + thread.phase
) * SETTINGS.amplitude;

const wave2 = Math.sin(
    x * 0.012 - time * 0.5 + thread.offset
) * SETTINGS.amplitude * 0.15;

            let y = thread.y + wave1 + wave2;

            // Cursor interaction
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < SETTINGS.mouseRadius) {
                const influence =
                    1 - distance / SETTINGS.mouseRadius;

                y += (dy / Math.max(distance, 1)) *
                    influence *
                    SETTINGS.mouseStrength;
            }

            if (x === -20) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${SETTINGS.opacity})`;
        ctx.lineWidth = SETTINGS.lineWidth;
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();

