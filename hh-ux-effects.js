(function() {
    // Only run on mobile screens
    if (window.matchMedia('(max-width: 768px)').matches) {
        
        // 1. AGGRESSIVE CLEANUP: Remove legacy bubbles/particles/trails/sparkles
        function cleanupLegacy() {
            // Remove particle canvas
            const legacyCanvas = document.getElementById('particles') || document.getElementById('particleCanvas') || document.querySelector('canvas');
            if (legacyCanvas && !legacyCanvas.classList.contains('no-touch-fix')) legacyCanvas.remove();

            // Remove cursor trails, orbs, and sparkles
            document.querySelectorAll('.hh-trail, .trail, .orb, .sparkle, #hh-cursor, #hh-ring, #cursor, #cursorRing').forEach(el => el.remove());

            // Disable background glow if it sticks
            const bgGlow = document.getElementById('hh-bg-glow');
            if (bgGlow) bgGlow.style.display = 'none';
        }

        // Run immediately and also on DOMContentLoaded
        cleanupLegacy();
        document.addEventListener('DOMContentLoaded', cleanupLegacy);
        // Also run periodic cleanup to catch late-injected elements
        const cleanupInterval = setInterval(cleanupLegacy, 500);
        setTimeout(() => clearInterval(cleanupInterval), 3000);

        // 2. INJECT SUBTLE RIPPLE & LAYOUT CSS
        const style = document.createElement('style');
        style.textContent = `
            /* Fix excessive padding and blank spaces on mobile */
            section, .page-hero, .cta-section, .how, .stats, .tier-section, .features-section, .founder-section, .reviews-section, .inv-type-section {
                min-height: 0 !important;
                height: auto !important;
                padding: 40px 16px !important;
            }
            .sec-inner, .stats-inner {
                padding: 0 !important;
                margin: 0 auto !important;
            }
            .hero, .page-hero { 
                padding: 110px 16px 40px !important; 
                min-height: 0 !important;
            }
            /* Center hero content */
            .page-hero-content {
                text-align: center !important;
                margin: 0 auto !important;
            }
            .sec-sub {
                margin-left: auto !important;
                margin-right: auto !important;
            }
            /* Eliminate massive gaps between text elements */
            h1, h2, h3, h4, p, .sec-title, .sec-sub, .sec-label, .journey-header, .how-head, .hero-sub, .hero-actions, .hero-trust {
                margin-bottom: 16px !important;
                margin-top: 0 !important;
            }
            /* Tighten grids and cards */
            .steps, .feat-grid, .vc-grid, .tier-grid, .sectors-grid, .how-grid, .inv-grid, .inv-types {
                gap: 16px !important;
                margin-bottom: 24px !important;
            }
            .stat-box, .step, .feat, .price-card, .vc-card, .tier-card, .sector-card, .journey-col, .inv-card, .inv-type-card {
                padding: 24px 16px !important;
                margin-bottom: 12px !important;
            }
            .footer-inner {
                gap: 24px !important;
            }
            footer {
                padding: 40px 16px 20px !important;
            }

            /* Subtle Touch Ripple */
            .hh-touch-ripple {
                position: fixed;
                width: 16px;
                height: 16px;
                background: rgba(124, 58, 237, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999999;
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            }
            .hh-touch-ripple.active {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 1;
            }
            /* Force hide ALL legacy visual elements on mobile */
            #particles, canvas, .hh-trail, .trail, .orb, .sparkle,
            #hh-cursor, #hh-ring, #cursor, #cursorRing, #hh-bg-glow {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                width: 0 !important;
                height: 0 !important;
                pointer-events: none !important;
            }
            /* Subtle ambient shimmer — replaces high-noise bubbles */
            @keyframes hh-ambient-shimmer {
                0%, 100% { opacity: 0.04; transform: scale(1) translate(0,0); }
                33% { opacity: 0.07; transform: scale(1.05) translate(10px, -10px); }
                66% { opacity: 0.05; transform: scale(0.98) translate(-10px, 5px); }
            }
            body::after {
                content: '';
                position: fixed;
                top: -50%; left: -50%; right: -50%; bottom: -50%;
                background: radial-gradient(circle at 30% 30%, rgba(124,58,237,0.12) 0%, transparent 50%),
                            radial-gradient(circle at 70% 70%, rgba(6,182,212,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(16,217,157,0.05) 0%, transparent 60%);
                pointer-events: none;
                z-index: -1;
                animation: hh-ambient-shimmer 12s ease-in-out infinite;
                filter: blur(80px);
            }
        `;
        document.head.appendChild(style);

        // 3. IMPLEMENT SIMPLE RIPPLE
        document.addEventListener('touchstart', (e) => {
            createRipple(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: true});

        function createRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'hh-touch-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            document.body.appendChild(ripple);

            requestAnimationFrame(() => {
                ripple.classList.add('active');
            });

            setTimeout(() => {
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 400);
            }, 100);
        }
    }
})();
