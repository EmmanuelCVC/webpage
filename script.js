document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnBtn = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnBtn && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            }
        });
    }

    // 2. Scroll Animations using IntersectionObserver
    const animatedElements = document.querySelectorAll('.hidden-anim');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-anim');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // 3. Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get the button and original text
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            
            // Show sending state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate a network request (e.g., fetch to an API)
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success-msg';
                successMsg.innerHTML = '¡Gracias por contactarnos! Nos comunicaremos contigo pronto.';
                
                // Remove existing message if any
                const existingMsg = contactForm.querySelector('.form-success-msg');
                if (existingMsg) existingMsg.remove();

                contactForm.insertBefore(successMsg, submitBtn);
                
                // Reset form
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => successMsg.remove(), 500);
                }, 5000);

            }, 1500);
        });
    }
    // 4. Hero Slider Initialization
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider && typeof heroData !== 'undefined' && heroData.length > 0) {
        // Create slides dynamically
        heroData.forEach((item) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide';
            slide.innerHTML = `
                <h2 class="hidden-anim show-anim">${item.title}</h2>
                <p class="hidden-anim show-anim">${item.description}</p>
            `;
            heroSlider.appendChild(slide);
        });

        let currentSlide = 0;
        const slideCount = heroData.length;
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slideCount;
            heroSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        // Cambiar cada 4 segundos
        setInterval(nextSlide, 4000);
    }

    // 5. Dynamic Requisitos Loading
    const reqContainer = document.getElementById('dynamic-requisitos-container');
    if (reqContainer && typeof requisitosData !== 'undefined') {
        reqContainer.innerHTML = ''; // Limpiar mensaje de "cargando"
        
        requisitosData.forEach(tramite => {
            const section = document.createElement('div');
            section.id = tramite.id;
            section.className = 'tramite-section';
            
            let listHTML = '<ul class="requisitos-list">';
            tramite.requisitos.forEach(req => {
                listHTML += `<li>${req}</li>`;
            });
            listHTML += '</ul>';
            
            section.innerHTML = `
                <h3>${tramite.titulo}</h3>
                <p>${tramite.descripcion}</p>
                ${listHTML}
            `;
            
            reqContainer.appendChild(section);
        });
        
        // Realizar scroll a la sección si se ingresó mediante un enlace con ancla (hash)
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    } else if (reqContainer) {
        reqContainer.innerHTML = '<p style="text-align: center; color: red;">Error al cargar la información.</p>';
    }

    // 6. Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
