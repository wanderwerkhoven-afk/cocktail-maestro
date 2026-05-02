/* ============================================================
 * canvas-effects.js — Particle system for Cocktail Maestro
 * Effects:
 *   - Pour stream: physics-based liquid droplets with gravity + curve
 *   - Splash:      small particles bounce out of the shaker top
 *   - Bubbles:     ambient bubbles rising in the shaker liquid
 *   - Explosion:   dramatic burst when over-shaking
 *   - Confetti:    celebration rain on a perfect score
 * ============================================================ */

export const FX = (() => {
    const GAME_W = 1920;
    const GAME_H = 1080;

    let canvas, ctx;
    let particles = [];
    let isPouringActive = false;
    let pourColor = "#f3c34e";
    let pourSourceX = 0, pourSourceY = 0;
    let shakerTopX = 0, shakerTopY = 0;
    let animFrameId = null;

    // ─── Pour target (user-tuned: where the stream aims) ──────
    const POUR_TARGET_X = 1550; // Moved 100px right
    const POUR_TARGET_Y = 570;

    // ─── Pour source (above-left, where bottle tip is) ────────
    const POUR_SRC_X = 1360; // Moved 100px right
    const POUR_SRC_Y = 280;

    // ─── Shaker visual position: read from DOM dynamically ────
    function getShakerPos() {
        const liquidEl = document.getElementById('liquid-container');
        const fillEl = document.getElementById('liquid-fill');
        const gameEl = document.getElementById('game');
        if (!liquidEl || !gameEl) return { x: POUR_TARGET_X, top: POUR_TARGET_Y, height: 200, surface: POUR_TARGET_Y };

        const lr = liquidEl.getBoundingClientRect();
        const gr = gameEl.getBoundingClientRect();
        const scale = gr.width / 1920;

        // Calculate the actual Y position of the liquid surface
        const fillHeightPercent = fillEl ? parseFloat(fillEl.style.height) || 0 : 0;
        const totalHeight = lr.height / scale;
        const bottomY = (lr.bottom - gr.top) / scale;
        const surfaceY = bottomY - (totalHeight * (fillHeightPercent / 100));

        return {
            x: (lr.left - gr.left) / scale + (lr.width / scale) / 2,
            top: (lr.top - gr.top) / scale,
            height: totalHeight,
            surface: surfaceY
        };
    }



    // ─── Particle base class ───────────────────────────────────
    class Particle {
        constructor(x, y, vx, vy, color, radius, life, gravity = 0.4, fade = true) {
            this.x = x; this.y = y;
            this.vx = vx; this.vy = vy;
            this.color = color;
            this.radius = radius;
            this.life = life;       // frames
            this.maxLife = life;
            this.gravity = gravity;
            this.fade = fade;
            this.alpha = 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.life--;
            if (this.fade) this.alpha = this.life / this.maxLife;
            return this.life > 0;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.5, this.radius * this.alpha), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ─── Stream droplet (follows a slight curve toward shaker) ─
    class StreamDroplet extends Particle {
        constructor(srcX, srcY, destX, destY, color) {
            const dx = destX - srcX;
            const dy = destY - srcY;
            const ox = (Math.random() - 0.5) * 4; // Reduced horizontal spread at source
            super(
                srcX + ox,
                srcY + (Math.random() * 10),
                dx * 0.025 + (Math.random() - 0.5) * 0.3, // Faster horizontal
                dy * 0.012 + Math.random() * 2.0,        // Faster vertical
                color,
                3.0 + Math.random() * 2.0,               // Slightly thicker stream
                25 + Math.random() * 5,
                0.32,                                    // Lower gravity for straighter arc
                false
            );
            this.alpha = 0.95;
            this.color = color;
            this.maxY = destY + 5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.life--;
            // Die if we've passed the shaker top
            if (this.y > this.maxY) return false;
            return this.life > 0;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius * 0.6, this.radius, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ─── Splash particle ───────────────────────────────────────
    class SplashParticle extends Particle {
        constructor(x, y, color) {
            super(
                x + (Math.random() - 0.5) * 30,
                y,
                (Math.random() - 0.5) * 8,
                -(Math.random() * 6 + 3),
                color,
                2 + Math.random() * 3,
                20 + Math.random() * 15,
                0.35
            );
        }
    }

    // ─── Bubble (rises slowly in the shaker) ──────────────────
    class Bubble extends Particle {
        constructor(x, bottomY, liquidHeight) {
            const startY = bottomY - Math.random() * liquidHeight;
            super(
                x + (Math.random() - 0.5) * 80,
                startY,
                (Math.random() - 0.5) * 0.8,
                -(0.8 + Math.random() * 1.2),
                "rgba(255,255,255,0.25)",
                1.5 + Math.random() * 3,
                60 + Math.random() * 40,
                -0.03, // negative = rising
                true
            );
        }
    }

    // ─── Explosion burst ───────────────────────────────────────
    class ExplosionParticle extends Particle {
        constructor(x, y) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 10 + Math.random() * 45; // much faster
            const colors = ["#ff4500", "#ffcc00", "#ff6600", "#ff9900", "#ffffff", "#ff0000"];
            super(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 5,
                colors[Math.floor(Math.random() * colors.length)],
                10 + Math.random() * 25, // much bigger particles
                50 + Math.random() * 40, // longer life
                0.15 // lower gravity so they fly further
            );
        }
    }

    // ─── Confetti ──────────────────────────────────────────────
    class ConfettiParticle {
        constructor() {
            const palette = ["#f5c542", "#ff4e91", "#4ecbff", "#7fff6e", "#ff8c00", "#e040fb"];
            this.x = Math.random() * GAME_W;
            this.y = -20;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = 3 + Math.random() * 5;
            this.rot = Math.random() * Math.PI * 2;
            this.rotV = (Math.random() - 0.5) * 0.2;
            this.w = 10 + Math.random() * 14;
            this.h = 6 + Math.random() * 8;
            this.color = palette[Math.floor(Math.random() * palette.length)];
            this.life = 180 + Math.random() * 80;
            this.alpha = 1;
            this.gravity = 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.rot += this.rotV;
            this.life--;
            if (this.y > GAME_H + 20) this.life = 0;
            return this.life > 0;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.min(1, this.life / 30);
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }

    // ─── Main loop ─────────────────────────────────────────────
    function loop() {
        ctx.clearRect(0, 0, GAME_W, GAME_H);

        // Spawn new stream droplets while pouring
        if (isPouringActive) {
            const pos = getShakerPos();
            shakerTopX = pos.x + 30; // Offset 10px to the right as requested
            shakerTopY = pos.surface; // Target the dynamic liquid surface

            for (let i = 0; i < 10; i++) { // Increased particle count for denser stream
                particles.push(new StreamDroplet(
                    pourSourceX, pourSourceY,
                    shakerTopX, shakerTopY,
                    pourColor
                ));
            }
            // Random small splash at shaker top — dynamically track shaker pos
            if (Math.random() < 0.25) {
                for (let i = 0; i < 3; i++) {
                    particles.push(new SplashParticle(pos.x, pos.surface, pourColor));
                }
            }
        }

        // Update + draw all particles
        particles = particles.filter(p => {
            const alive = p.update();
            if (alive) p.draw(ctx);
            return alive;
        });

        animFrameId = requestAnimationFrame(loop);
    }

    // ─── Public API ────────────────────────────────────────────
    return {
        init() {
            canvas = document.getElementById("fx-canvas");
            ctx = canvas.getContext("2d");
            canvas.width = GAME_W;
            canvas.height = GAME_H;
            loop();
        },

        startPour(color) {
            isPouringActive = true;
            pourColor = color;
            pourSourceX = POUR_SRC_X;
            pourSourceY = POUR_SRC_Y;
            // Stream aims at the user-tuned pour target
            shakerTopX = POUR_TARGET_X;
            shakerTopY = POUR_TARGET_Y;
        },

        stopPour() {
            isPouringActive = false;
        },

        spawnBubbles(liquidHeightFraction) {
            if (Math.random() < 0.15) {
                const pos = getShakerPos();
                const liquidPx = liquidHeightFraction * pos.height;
                particles.push(new Bubble(pos.x, pos.top + pos.height, liquidPx));
            }
        },

        triggerSplash(color) {
            const pos = getShakerPos();
            for (let i = 0; i < 25; i++) {
                particles.push(new SplashParticle(pos.x, pos.top, color));
            }
        },

        triggerExplosion() {
            const pos = getShakerPos();
            const cx = pos.x;
            const cy = pos.top + pos.height * 0.4;

            // Initial massive burst
            for (let i = 0; i < 500; i++) {
                particles.push(new ExplosionParticle(cx, cy));
            }

            // Chain reaction explosions across the screen
            for (let j = 0; j < 8; j++) {
                setTimeout(() => {
                    const exX = cx + (Math.random() - 0.5) * 1200;
                    const exY = cy + (Math.random() - 0.5) * 800;
                    for (let i = 0; i < 250; i++) {
                        particles.push(new ExplosionParticle(exX, exY));
                    }
                }, 100 + j * 120);
            }
        },

        triggerConfetti() {
            for (let i = 0; i < 180; i++) {
                setTimeout(() => {
                    particles.push(new ConfettiParticle());
                }, i * 15);
            }
        },

        clear() {
            particles = [];
            isPouringActive = false;
        }
    };
})();
