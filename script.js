// script.js - CSRED Website JavaScript

// Variables globales
let currentLanguage = 'fr';
let isMenuOpen = false;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeAnimations();
    initializeProgressBars();
    initializeForms();
    initializeGallery();
    
    // Vérifier la langue dans l'URL ou localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'fr' || langParam === 'en')) {
        switchLanguage(langParam);
    } else if (localStorage.getItem('csred_language')) {
        switchLanguage(localStorage.getItem('csred_language'));
    }
});

// Gestion du menu mobile
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
    } else {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
}

// Fermer le menu mobile au clic sur un lien
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (isMenuOpen && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Gestion multilingue
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
    
    // Mettre à jour le contenu
    document.querySelectorAll('[data-fr]').forEach(element => {
        const frText = element.getAttribute('data-fr');
        const enText = element.getAttribute('data-en');
        
        if (lang === 'fr' && frText) {
            element.textContent = frText;
        } else if (lang === 'en' && enText) {
            element.textContent = enText;
        }
    });
    
    // Mettre à jour les placeholders
    document.querySelectorAll('[data-placeholder-fr]').forEach(element => {
        const frPlaceholder = element.getAttribute('data-placeholder-fr');
        const enPlaceholder = element.getAttribute('data-placeholder-en');
        
        if (lang === 'fr' && frPlaceholder) {
            element.placeholder = frPlaceholder;
        } else if (lang === 'en' && enPlaceholder) {
            element.placeholder = enPlaceholder;
        }
    });
    
    // Sauvegarder la langue
    localStorage.setItem('csred_language', lang);
    
    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = lang;
}

function initializeLanguage() {
    // Détecter la langue du navigateur
    const browserLang = navigator.language || navigator.userLanguage;
    const defaultLang = browserLang.startsWith('en') ? 'en' : 'fr';
    
    // Utiliser la langue sauvegardée ou la langue par défaut
    const savedLang = localStorage.getItem('csred_language') || defaultLang;
    switchLanguage(savedLang);
}

// Animations au scroll
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer tous les éléments à animer
    document.querySelectorAll('.action-card, .content-card, .team-card, .stat-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Animation des barres de progression
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset et animer
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Gestion des formulaires
function initializeForms() {
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Formulaire bénévole
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerSubmit);
    }

    // Formulaire partenaire
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', handlePartnerSubmit);
    }

    // Newsletter
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

// Gestion de la galerie
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item, .image-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Effet de zoom ou ouverture de modal (simulation)
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Gestionnaires de soumission de formulaires
async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        // Afficher le loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'fr' ? 'Envoi...' : 'Sending...');
        submitBtn.disabled = true;
        
        // Simulation d'envoi (remplacer par vraie intégration Formspree/EmailJS)
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simuler un délai de réseau
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Succès
        showNotification(
            currentLanguage === 'fr' ? 'Message envoyé avec succès!' : 'Message sent successfully!',
            'success'
        );
        form.reset();
        
    } catch (error) {
        showNotification(
            currentLanguage === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending message',
            'error'
        );
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handleVolunteerSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'fr' ? 'Envoi...' : 'Sending...');
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            skills: formData.get('skills'),
            availability: formData.get('availability'),
            motivation: formData.get('motivation')
        };
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification(
            currentLanguage === 'fr' ? 'Candidature envoyée! Nous vous recontacterons bientôt.' : 'Application sent! We will contact you soon.',
            'success'
        );
        form.reset();
        
    } catch (error) {
        showNotification(
            currentLanguage === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending application',
            'error'
        );
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handlePartnerSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'fr' ? 'Envoi...' : 'Sending...');
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        const data = {
            organization: formData.get('organization'),
            contact_name: formData.get('contact_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            partnership_type: formData.get('partnership_type'),
            description: formData.get('description')
        };
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification(
            currentLanguage === 'fr' ? 'Demande de partenariat envoyée!' : 'Partnership request sent!',
            'success'
        );
        form.reset();
        
    } catch (error) {
        showNotification(
            currentLanguage === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending request',
            'error'
        );
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.innerHTML = '<div class="loading"></div>';
        submitBtn.disabled = true;
        
        const email = form.querySelector('input[name="email"]').value;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showNotification(
            currentLanguage === 'fr' ? 'Inscription réussie!' : 'Successfully subscribed!',
            'success'
        );
        form.reset();
        
    } catch (error) {
        showNotification(
            currentLanguage === 'fr' ? 'Erreur d\'inscription' : 'Subscription error',
            'error'
        );
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Ajouter les styles si pas déjà présents
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            }
            .notification-success { background: var(--primary-blue); }
            .notification-error { background: #ef4444; }
            .notification-info { background: var(--primary-blue); }
            .notification button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s;
        font-size: 1.2rem;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
        }
    });
}

// Initialiser le bouton de retour en haut
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Gestion des tabs/onglets
function switchTab(tabId) {
    // Cacher tous les contenus de tabs
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les boutons de tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activer le tab sélectionné
    const targetContent = document.getElementById(tabId);
    const targetBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
    
    if (targetContent) targetContent.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
}

// Validation de formulaire en temps réel
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentElement.querySelector('.error-message');
        
        // Supprimer les messages d'erreur existants
        if (errorElement) errorElement.remove();
        
        // Validation selon le type
        let isFieldValid = true;
        let errorMessage = '';
        
        if (!value) {
            isFieldValid = false;
            errorMessage = currentLanguage === 'fr' ? 'Ce champ est requis' : 'This field is required';
        } else if (input.type === 'email' && !isValidEmail(value)) {
            isFieldValid = false;
            errorMessage = currentLanguage === 'fr' ? 'Email invalide' : 'Invalid email';
        } else if (input.type === 'tel' && !isValidPhone(value)) {
            isFieldValid = false;
            errorMessage = currentLanguage === 'fr' ? 'Numéro invalide' : 'Invalid phone number';
        }
        
        // Afficher l'erreur si nécessaire
        if (!isFieldValid) {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem; display: block;';
            error.textContent = errorMessage;
            input.parentElement.appendChild(error);
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Utilitaires de validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

// Lazy loading des images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Recherche dans la galerie
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="filterGallery('${category}')"]`).classList.add('active');
}

// Compteur animé pour les statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/[\d]/g, '');
                
                animateCounter(counter, target, suffix);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

// Initialiser les compteurs au chargement
document.addEventListener('DOMContentLoaded', animateCounters);

// Gestion des modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Fermer la modale en cliquant à l'extérieur
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Performance: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation des événements de scroll
const optimizedScroll = debounce(() => {
    // Actions lors du scroll (navigation sticky, etc.)
}, 10);

window.addEventListener('scroll', optimizedScroll);

console.log('CSRED Website JavaScript loaded successfully!');