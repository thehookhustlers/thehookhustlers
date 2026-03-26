(function() {
    // Only run on mobile screens (< 768px)
    if (!window.matchMedia('(max-width: 768px)').matches) return;

    // 1. CSS OVERRIDE INJECTION
    const style = document.createElement('style');
    style.textContent = `
        /* Force natural scroll and prevent horizontal overflow */
        html, body {
            overflow-x: hidden !important;
            width: 100vw !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-overflow-scrolling: touch;
        }

        /* Aggregate Cleanup: Kill all runaway background elements */
        canvas, .hero-mesh, .grid-mesh, #particles, #particleCanvas, 
        .orb, .glow, .cta-glow1, .cta-glow2, .waitlist-glow, 
        .hh-trail, #hh-cursor, #hh-ring, #cursor, #cursorRing, .cursor, .cursor-ring {
            display: none !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
            position: absolute !important;
            pointer-events: none !important;
        }

        /* HEIGHT COMPRESSION: Reduce excessive section heights */
        section, .sec-inner, .page-hero, .hero, .cta-section, .stats, .feat-grid, .how {
            min-height: 0 !important;
            height: auto !important;
            padding-top: 48px !important;
            padding-bottom: 48px !important;
        }
        
        .hero { padding-top: 100px !important; padding-bottom: 60px !important; }

        /* Tighter grid/flex gaps */
        .stats-inner, .steps, .cards-grid, .vc-grid, .tier-grid, .sectors-grid {
            gap: 16px !important;
        }
        
        .stat-box, .step, .feat, .price-card, .vc-card {
            padding: 32px 20px !important;
        }

        /* TOUCH RIPPLE EFFECT */
        .hh-touch-ripple {
            position: fixed; width: 40px; height: 40px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%);
            border: 1.5px solid rgba(6, 182, 212, 0.5);
            border-radius: 50%; pointer-events: none; z-index: 999999;
            transform: translate(-50%, -50%) scale(0.5); opacity: 0;
            transition: transform 0.4s ease-out, opacity 0.4s ease-out;
        }
        .hh-touch-ripple.active { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
    `;
    document.head.appendChild(style);

    // 2. DYNAMIC CLEANUP (Handle elements created by late-loading scripts)
    const survivors = () => {
        const killers = ['canvas', '.hero-mesh', '.orb', '.hero-lines', '#particles'];
        killers.forEach(k => document.querySelectorAll(k).forEach(el => el.remove()));
        
        // Ensure body doesn't have a fixed height locked by a previous script
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';
    };

    survivors();
    window.addEventListener('load', survivors);
    document.addEventListener('DOMContentLoaded', survivors);
    setInterval(survivors, 2000); // Rare cleanup for third-party injections

    // 3. MOBILE MENU FIX (Ensures standard .open class logic)
    const initMobileNav = () => {
        const ham = document.querySelector('.hamburger');
        const menu = document.querySelector('.mobile-menu');
        if (!ham || !menu || ham.hasAttribute('data-hh-init')) return;
        
        ham.setAttribute('data-hh-init', 'true');
        ham.onclick = (e) => {
            e.preventDefault();
            const isOpen = ham.classList.toggle('open');
            menu.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        menu.querySelectorAll('a').forEach(a => {
            a.onclick = () => {
                ham.classList.remove('open');
                menu.classList.remove('open');
                document.body.style.overflow = '';
            };
        });
    };

    initMobileNav();
    setTimeout(initMobileNav, 1000);

    // 4. INTERACTIVE TOUCH RIPPLE
    document.addEventListener('touchstart', (e) => {
        const r = document.createElement('div');
        r.className = 'hh-touch-ripple';
        r.style.left = e.touches[0].clientX + 'px';
        r.style.top = e.touches[0].clientY + 'px';
        document.body.appendChild(r);
        requestAnimationFrame(() => r.classList.add('active'));
        setTimeout(() => { r.style.opacity = '0'; setTimeout(() => r.remove(), 400); }, 150);
    }, {passive:true});

})();

