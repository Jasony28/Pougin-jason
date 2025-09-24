document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU MESSAGE D'ACCUEIL DYNAMIQUE ---
    const greetingTitle = document.querySelector('#greeting-title');
    if (greetingTitle) {
        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour < 12) {
            greeting = "Bonjour ! Prêt à créer aujourd'hui ?";
        } else if (currentHour < 18) {
            greeting = "Bon après-midi ! Un projet en tête ?";
        } else {
            greeting = "Bonsoir ! En quête d'inspiration ?";
        }
        
        greetingTitle.textContent = greeting;
    }

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
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Mise à jour de l'attribut ARIA pour l'accessibilité
            const isExpanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isExpanded);
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- ANIMATIONS À L'APPARITION AU DÉFILEMENT (SCROLL) ---
    const elementsToAnimate = document.querySelectorAll('.project-card, .service-card, .about-container, .skills-grid');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elementsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });

    // --- GESTION DU LIEN ACTIF DANS LA NAVIGATION ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if(sections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active-link');
                        // Vérifie si le href se termine par #id pour fonctionner avec index.html#projets
                        if(link.getAttribute('href').endsWith(`#${id}`)) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" });
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // --- GESTION DE LA GALERIE DE PROJET AVEC MINIATURES ---
    const galleryContainer = document.querySelector('#project-gallery');

    if (galleryContainer) {
        const mainImage = galleryContainer.querySelector('.gallery-main-image img');
        const thumbnails = galleryContainer.querySelectorAll('.thumbnail');
        const prevBtn = galleryContainer.querySelector('.prev-btn');
        const nextBtn = galleryContainer.querySelector('.next-btn');
        
        let currentIndex = 0;
        const allImageSources = Array.from(thumbnails).map(thumb => thumb.src);

        function showImage(index) {
            // Animation de fondu
            mainImage.style.opacity = '0';
            
            setTimeout(() => {
                mainImage.src = allImageSources[index];
                mainImage.style.opacity = '1';
            }, 300);

            // Mettre à jour la miniature active
            thumbnails.forEach(thumb => thumb.classList.remove('active-thumbnail'));
            thumbnails[index].classList.add('active-thumbnail');
            
            // Centrer la miniature active dans la vue
            thumbnails[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

            currentIndex = index;
        }

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                showImage(index);
            });
        });

        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= allImageSources.length) {
                nextIndex = 0; // Boucle
            }
            showImage(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = allImageSources.length - 1; // Boucle
            }
            showImage(prevIndex);
        });

        // Initialiser la galerie
        if (allImageSources.length > 0) {
            showImage(0);
        }
    }
});