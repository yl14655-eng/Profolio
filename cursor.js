
document.addEventListener("DOMContentLoaded", () => {

    // ====================================
    // CUSTOM STAR CURSOR SETTINGS
    // ====================================

    const COLOR_1 = "#fefefe";
    const COLOR_2 = "#000000";

    const CURSOR_SIZE = 12;
    const TRAIL_SIZE = 7;

    const PARTICLE_LIFE = 15;
    const SPAWN_DISTANCE = 10;

    // ====================================
    // CREATE CANVAS
    // ====================================

    const canvas = document.createElement("canvas");
    canvas.id = "star-cursor-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    let mouse = {
        x: -100,
        y: -100,
        visible: false
    };

    let lastSpawn = {
        x: -100,
        y: -100
    };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    // ====================================
    // DRAW FOUR-POINT COMPASS STAR
    // ====================================

    function drawStar(x, y, size, color, rotation, opacity) {

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;

        ctx.beginPath();

        ctx.moveTo(0, -size);

        ctx.quadraticCurveTo(
            size * 0.15, -size * 0.15,
            size, 0
        );

        ctx.quadraticCurveTo(
            size * 0.15, size * 0.15,
            0, size
        );

        ctx.quadraticCurveTo(
            -size * 0.15, size * 0.15,
            -size, 0
        );

        ctx.quadraticCurveTo(
            -size * 0.15, -size * 0.15,
            0, -size
        );

        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    // ====================================
    // SPAWN STAR PARTICLES
    // ====================================

    function spawnParticle(x, y) {

        particles.push({
            x: x,
            y: y,

            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,

            size: TRAIL_SIZE * (0.5 + Math.random()),

            color: Math.random() < 0.5
                ? COLOR_1
                : COLOR_2,

            rotation: Math.random() * Math.PI,

            spin: (Math.random() - 0.5) * 0.06,

            life: PARTICLE_LIFE,
            maxLife: PARTICLE_LIFE
        });
    }

    // ====================================
    // TRACK CURSOR
    // ====================================

    document.addEventListener("pointermove", (event) => {

        if (event.pointerType !== "mouse" &&
            event.pointerType !== "pen") return;

        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.visible = true;

        const dx = mouse.x - lastSpawn.x;
        const dy = mouse.y - lastSpawn.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > SPAWN_DISTANCE) {

            spawnParticle(mouse.x, mouse.y);

            lastSpawn.x = mouse.x;
            lastSpawn.y = mouse.y;
        }
    });

    document.addEventListener("pointerout", (event) => {
        if (!event.relatedTarget) {
            mouse.visible = false;
        }
    });

    window.addEventListener("blur", () => {
        mouse.visible = false;
    });

    // ====================================
    // ANIMATION
    // ====================================

    function animate() {

        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.rotation += p.spin;

            p.life--;

            const opacity = p.life / p.maxLife;

            drawStar(
                p.x,
                p.y,
                p.size,
                p.color,
                p.rotation,
                opacity
            );

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        // Main cursor star
        if (mouse.visible) {
            drawStar(
                mouse.x,
                mouse.y,
                CURSOR_SIZE,
                COLOR_1,
                0,
                1
            );
        }

        requestAnimationFrame(animate);
    }

    animate();

});
