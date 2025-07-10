// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu hamburger responsivo
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de parallax no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroLogo = document.querySelector('.hero-logo');
        const floatingElements = document.querySelectorAll('.floating-circle, .floating-mandala');
        
        if (heroLogo) {
            heroLogo.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.terapia-card, .depoimento-card, .sobre-text, .contato-info, .canal-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.email || !data.mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simula envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simula delay de envio
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Remove notificação existente se houver
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Adiciona estilos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4a7c59' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Fecha ao clicar no X
        notification.querySelector('.notification-close').addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                closeNotification(notification);
            }
        }, 5000);
    }
    
    function closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 300);
    }
    
    // Efeito de hover nos cards de terapia
    document.querySelectorAll('.terapia-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const header = this.querySelector('.terapia-header');
            if (!header.classList.contains('expanded')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const header = this.querySelector('.terapia-header');
            if (!header.classList.contains('expanded')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #4a7c59, #6ba777);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostra/esconde botão de scroll to top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito hover no botão scroll to top
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 12px 30px rgba(74, 124, 89, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(74, 124, 89, 0.3)';
    });
    
    console.log('Lunara Terapias - Website redesenhado carregado com sucesso! ✨');
});

// Funcionalidade para conteúdo expansível das terapias
function toggleContent(header) {
    const content = header.nextElementSibling;
    const isExpanded = header.classList.contains('expanded');
    
    if (isExpanded) {
        // Recolher
        header.classList.remove('expanded');
        content.classList.remove('expanded');
        content.style.maxHeight = '0';
    } else {
        // Expandir
        header.classList.add('expanded');
        content.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Carrossel de Canais
let currentSlide = 0;
const totalSlides = 4;

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const cardWidth = 370; // largura do card + gap
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    const translateX = -currentSlide * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
    
    updateDots();
}

function currentSlideFunc(slideIndex) {
    const track = document.querySelector('.carousel-track');
    const cardWidth = 370;
    
    currentSlide = slideIndex - 1;
    const translateX = -currentSlide * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
    
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-play do carrossel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Touch/Swipe support para mobile
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    endX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swipe left - próximo slide
            moveCarousel(1);
        } else {
            // Swipe right - slide anterior
            moveCarousel(-1);
        }
    }
}

// Animações adicionais para os cards de canal
document.addEventListener('DOMContentLoaded', function() {
    const canalCards = document.querySelectorAll('.canal-card');
    
    canalCards.forEach((card, index) => {
        // Animação de entrada escalonada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Efeito de hover aprimorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(74, 124, 89, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Inicializa os cards como invisíveis para animação
    canalCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// Função para o currentSlide (corrigindo nome)
window.currentSlide = currentSlideFunc;