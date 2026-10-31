
document.addEventListener("DOMContentLoaded", () => {

    const containers = document.querySelectorAll(
        ".project-image-swap"
    );

    containers.forEach(container => {

        const canvas = document.createElement("canvas");
        canvas.className = "magnetic-canvas";

        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        let width = 0;
        let height = 0;
        let active = false;

        const spacing = 80;
        const radius = 100;
        const strength = 5;

        function resize() {

            width = container.clientWidth;
            height = container.clientHeight;

            const dpr = window.devicePixelRatio || 1;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            particles = [];

            for (let y = -spacing; y < height + spacing; y += spacing) {
    for (let x = -spacing; x < width + spacing; x += spacing) {

        const offsetX = (Math.random() - 0.5) * spacing * 0.5;
        const offsetY = (Math.random() - 0.5) * spacing * 0.5;

        const starX = x + offsetX;
        const starY = y + offsetY;

                  const color1 = container.dataset.color1 || "#ffffff";
const color2 = container.dataset.color2 || "#7DD8F5";

particles.push({
    homeX: starX,
    homeY: starY,
    x: starX,
    y: starY,
    vx: 0,
    vy: 0,
    color: Math.random() < 0.5 ? color1 : color2
});

                }
            }
        }

        function animate() {

            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {

                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (active && distance < radius && distance > 0) {

                    const force = (radius - distance) / radius;

                    p.vx += (dx / distance) * force * strength * 0.15;
                    p.vy += (dy / distance) * force * strength * 0.15;

                }

                // Spring back to original position
                p.vx += (p.homeX - p.x) * 0.045;
                p.vy += (p.homeY - p.y) * 0.045;

                // Friction
                p.vx *= 0.82;
                p.vy *= 0.82;

                p.x += p.vx;
                p.y += p.vy;

               
/* Draw a four-point compass star */

const size = 20;

ctx.beginPath();

ctx.moveTo(p.x, p.y - size);

ctx.quadraticCurveTo(
    p.x + size * 0.15,
    p.y - size * 0.15,
    p.x + size,
    p.y
);

ctx.quadraticCurveTo(
    p.x + size * 0.15,
    p.y + size * 0.15,
    p.x,
    p.y + size
);

ctx.quadraticCurveTo(
    p.x - size * 0.15,
    p.y + size * 0.15,
    p.x - size,
    p.y
);

ctx.quadraticCurveTo(
    p.x - size * 0.15,
    p.y - size * 0.15,
    p.x,
    p.y - size
);

ctx.closePath();

ctx.fillStyle = p.color;
ctx.fill();


            });

            requestAnimationFrame(animate);
        }

        container.addEventListener("pointerenter", () => {
            active = true;
        });

        container.addEventListener("pointermove", event => {

            const rect = container.getBoundingClientRect();

            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;

        });

        container.addEventListener("pointerleave", () => {
            active = false;
            mouse.x = -1000;
            mouse.y = -1000;
        });

        window.addEventListener("resize", resize);

        resize();
        animate();

    });

});
