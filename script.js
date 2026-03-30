document.addEventListener('DOMContentLoaded', () => {
    console.log("Scalvora True Masterpiece V32 - Active");
    // 3D Interface Controller
    const splineContainer = document.getElementById('spline-container');
    const sections = document.querySelectorAll('.section-overlay');
    const liveLeadsText = document.getElementById('live-leads-text');
    const navbar = document.getElementById('navbar');
    const liveWidget = document.getElementById('live-widget');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Admin Visibility Logic for Leads
    const urlParams = new URLSearchParams(window.location.search);
    if (liveWidget) {
        if (urlParams.get('admin') === 'true') {
            liveWidget.style.display = 'flex';
        } else {
            liveWidget.style.display = 'none';
        }
    }

    // Ambient Movement for 3D Scene
    document.addEventListener('mousemove', (e) => {
        if (!splineContainer) return;
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        splineContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Dynamic Live Leads Counter
    let leadCount = 15;
    const updateLeads = () => {
        if (!liveLeadsText) return;
        leadCount += Math.floor(Math.random() * 2);
        liveLeadsText.textContent = `${leadCount} active leads in last 24h`;
        setTimeout(updateLeads, Math.random() * 20000 + 10000);
    };
    updateLeads();

    // BULLETPROOF Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            const isActive = navLinks.classList.toggle('active');
            menuToggle.innerHTML = isActive ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        // Close menu on click outside
        document.onclick = (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
                document.body.style.overflow = '';
            }
        };

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
                document.body.style.overflow = '';
            };
        });
    }

    // Intersection Observer for Smooth Section Reveal (V33 Special)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.reveal, .section-overlay').forEach(el => {
        revealObserver.observe(el);
    });

    // High Performance Scroll Handler (V33)
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Navbar visual state
                if (lastScrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Contact Form Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const data = new FormData(contactForm);
            
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                const message = `Scalvora Lead: ${data.get('name')} interested in ${data.get('service')}. Phone: ${data.get('phone')}`;
                window.open(`https://wa.me/918810809823?text=${encodeURIComponent(message)}`, '_blank');
                btn.innerHTML = 'Success!';
                contactForm.reset();
                setTimeout(() => { btn.innerHTML = 'Send Message'; btn.disabled = false; }, 3000);
            }, 800);
        };
    }
});
