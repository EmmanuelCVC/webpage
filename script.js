document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        // Create an overlay for closing the menu on mobile
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(menuOverlay);

        const closeMenu = () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
            menuOverlay.classList.remove('active');
        };

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
            menuOverlay.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when tapping the overlay
        menuOverlay.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevents triggering elements underneath
            closeMenu();
        }, { passive: false });
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
    // 4. Hero Slider and Blueprint Rotator Initialization
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider && typeof heroData !== 'undefined' && heroData.length > 0) {
        // Create slides dynamically
        heroData.forEach((item) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide';
            slide.innerHTML = `
                <h2>${item.title}</h2>
                <p>${item.description}</p>
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

    // Blueprint Background Rotator
    const blueprints = document.querySelectorAll('.electrical-blueprint');
    if (blueprints.length > 0) {
        // Remover la clase activa por defecto y elegir uno al azar al cargar la página
        blueprints.forEach(bp => bp.classList.remove('active-blueprint'));
        let currentBlueprintIndex = Math.floor(Math.random() * blueprints.length);
        blueprints[currentBlueprintIndex].classList.add('active-blueprint');
        
        const changeBlueprint = () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * blueprints.length);
            } while (nextIndex === currentBlueprintIndex && blueprints.length > 1);
            
            blueprints[currentBlueprintIndex].classList.remove('active-blueprint');
            blueprints[nextIndex].classList.add('active-blueprint');
            currentBlueprintIndex = nextIndex;
        };

        // Cambiar cada 30 segundos (30,000 ms)
        setInterval(changeBlueprint, 30000);
    }

    // 5. Dynamic Service Detail Loading
    const serviceContainer = document.getElementById('dynamic-service-container');
    if (serviceContainer && typeof serviciosData !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('id');
        
        const service = serviciosData.find(s => s.id === serviceId);
        
        if (service) {
            document.title = service.titulo + ' - ELECCON Ingeniería';
            
            // Build the HTML structure
            
            // Hero
            let html = `
                <section class="service-detail-hero">
                    <div class="container">
                        <span class="material-symbols-outlined hero-icon">${service.icon}</span>
                        <h1 class="hero-title">${service.titulo}</h1>
                        <p class="hero-subtitle">${service.subtitulo}</p>
                        <br>
                        <a href="contacto.html" class="cta-button primary-btn">Cotizar mi proyecto</a>
                    </div>
                </section>
            `;
            
            // Casos de Uso
            html += `
                <hr class="section-divider">
                <section class="service-section">
                    <div class="container">
                        <h2 class="section-title">¿Cuándo necesita este servicio?</h2>
                        <ul class="casos-uso-list">
                            ${service.casosUso.map(caso => `<li><span class="material-symbols-outlined">check_circle</span> ${caso}</li>`).join('')}
                        </ul>
                    </div>
                </section>
            `;
            
            // Entregables
            html += `
                <hr class="section-divider">
                <section class="service-section bg-light">
                    <div class="container">
                        <h2 class="section-title">¿Qué incluye nuestro servicio?</h2>
                        <div class="entregables-grid">
                            ${service.entregables.map(ent => `
                                <div class="entregable-card">
                                    <h3>${ent.titulo}</h3>
                                    <p>${ent.descripcion}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
            
            // Proceso
            html += `
                <hr class="section-divider">
                <section class="service-section">
                    <div class="container">
                        <h2 class="section-title">Nuestro Proceso de Trabajo</h2>
                        <div class="proceso-timeline">
                            ${service.proceso.map(paso => `
                                <div class="proceso-step">
                                    <div class="step-number">${paso.paso}</div>
                                    <div class="step-content">
                                        <h3>${paso.titulo}</h3>
                                        <p>${paso.descripcion}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
            
            // Diferenciadores
            html += `
                <hr class="section-divider">
                <section class="service-section bg-light">
                    <div class="container">
                        <h2 class="section-title">¿Por qué elegirnos?</h2>
                        <div class="diferenciadores-grid">
                            ${service.diferenciadores.map(dif => `
                                <div class="diferenciador-card">
                                    <span class="material-symbols-outlined">star</span>
                                    <div>
                                        <h3>${dif.titulo}</h3>
                                        <p>${dif.descripcion}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
            
            // FAQ
            html += `
                <hr class="section-divider">
                <section class="service-section">
                    <div class="container">
                        <h2 class="section-title">Preguntas Frecuentes</h2>
                        <div class="faq-container">
                            ${service.faq.map(f => `
                                <div class="faq-item">
                                    <button class="faq-question">
                                        ${f.pregunta}
                                        <span class="material-symbols-outlined">expand_more</span>
                                    </button>
                                    <div class="faq-answer">
                                        <p>${f.respuesta}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
            
            serviceContainer.innerHTML = html;
            
            // FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-question');
            faqItems.forEach(item => {
                item.addEventListener('click', () => {
                    const answer = item.nextElementSibling;
                    const icon = item.querySelector('.material-symbols-outlined');
                    
                    if (answer.style.maxHeight) {
                        answer.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            });
            
        } else {
            serviceContainer.innerHTML = `
                <div style="text-align: center; padding: 150px 20px;">
                    <h2>Servicio no encontrado</h2>
                    <p>El servicio que buscas no existe o el enlace es incorrecto.</p><br>
                    <a href="servicios.html" class="cta-button primary-btn">Ver todos los servicios</a>
                </div>
            `;
        }
    } else if (serviceContainer) {
        serviceContainer.innerHTML = '<p style="text-align: center; color: red;">Error al cargar la información.</p>';
    }

    // 6. Scroll Events (Scroll to Top & Header Animation)
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    const mainHeader = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        // Scroll to Top Button
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
                scrollTopBtn.classList.add('flex');
            } else {
                scrollTopBtn.classList.add('hidden');
                scrollTopBtn.classList.remove('flex');
            }
        }

        // Header Animation
        if (mainHeader) {
            if (window.scrollY > 300) {
                mainHeader.classList.add('header-scrolled');
            } else {
                mainHeader.classList.remove('header-scrolled');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
