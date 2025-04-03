// Script avanzato per Second Life Project

document.addEventListener('DOMContentLoaded', function() {
    // Gestione menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Gestione header sticky
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Animazione smooth scroll per i link di navigazione
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Chiudi il menu mobile se aperto
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Scroll alla sezione target
                    window.scrollTo({
                        top: targetElement.offsetTop - 90, // Compensazione per l'header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Validazione form di contatto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Semplice validazione
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Aggiungi messaggio di errore
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Questo campo è obbligatorio';
                    
                    // Rimuovi eventuali messaggi di errore precedenti
                    const existingError = field.parentNode.querySelector('.error-message');
                    if (existingError) {
                        field.parentNode.removeChild(existingError);
                    }
                    
                    field.parentNode.appendChild(errorMessage);
                } else {
                    field.classList.remove('error');
                    
                    // Rimuovi eventuali messaggi di errore
                    const existingError = field.parentNode.querySelector('.error-message');
                    if (existingError) {
                        field.parentNode.removeChild(existingError);
                    }
                }
            });
            
            // Validazione email
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    // Aggiungi messaggio di errore
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Inserisci un indirizzo email valido';
                    
                    // Rimuovi eventuali messaggi di errore precedenti
                    const existingError = emailField.parentNode.querySelector('.error-message');
                    if (existingError) {
                        emailField.parentNode.removeChild(existingError);
                    }
                    
                    emailField.parentNode.appendChild(errorMessage);
                }
            }
            
            if (isValid) {
                // Qui andrebbe l'invio del form a un server
                // Per ora simuliamo una risposta positiva
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Invio in corso...';
                
                // Mostra un messaggio di successo
                setTimeout(() => {
                    contactForm.reset();
                    
                    // Crea e mostra il messaggio di successo
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Messaggio inviato con successo! Ti risponderemo al più presto.';
                    
                    // Rimuovi eventuali messaggi precedenti
                    const existingSuccess = contactForm.querySelector('.success-message');
                    if (existingSuccess) {
                        contactForm.removeChild(existingSuccess);
                    }
                    
                    contactForm.prepend(successMessage);
                    
                    submitBtn.textContent = 'Messaggio Inviato!';
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // Rimuovi il messaggio di successo dopo un po'
                        setTimeout(() => {
                            const successMsg = contactForm.querySelector('.success-message');
                            if (successMsg) {
                                successMsg.style.opacity = '0';
                                setTimeout(() => {
                                    if (successMsg.parentNode) {
                                        successMsg.parentNode.removeChild(successMsg);
                                    }
                                }, 500);
                            }
                        }, 5000);
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Animazioni al caricamento della pagina
    const animateElements = document.querySelectorAll('.animate');
    
    if (animateElements.length > 0) {
        // Funzione per controllare se un elemento è nel viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        }
        
        // Funzione per animare gli elementi visibili
        function animateOnScroll() {
            animateElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Esegui al caricamento e allo scroll
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Effetto parallax per hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
    
    // Contatore animato per statistiche (se presenti)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 secondi
            const step = Math.ceil(target / (duration / 16)); // 60fps
            
            function updateCounter() {
                const current = parseInt(counter.innerText);
                if (current < target) {
                    counter.innerText = Math.min(current + step, target);
                    setTimeout(updateCounter, 16);
                }
            }
            
            // Inizia il conteggio quando l'elemento è visibile
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.innerText = '0';
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Gestione tema chiaro/scuro (se implementato)
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Salva la preferenza dell'utente
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Controlla se l'utente ha già una preferenza salvata
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Effetto hover avanzato per i bottoni
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
