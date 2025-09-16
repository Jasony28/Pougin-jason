document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU THÈME SOMBRE (DARK MODE) ---
    const themeToggle = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });


    // --- GESTION DU MENU HAMBURGER ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Ferme le menu quand on clique sur un lien (pour la navigation sur mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- ANIMATIONS À L'APPARITION AU DÉFILEMENT (SCROLL) ---
    const elementsToAnimate = document.querySelectorAll('.project-card, .service-card, .about-container');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });

    
    // --- GESTION DU LIEN ACTIF DANS LA NAVIGATION ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if(link.getAttribute('href') == `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});