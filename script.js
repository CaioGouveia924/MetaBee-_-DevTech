// --- Função de navegação entre páginas ---
function showPage(pageId) {
    // Remove active de todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Adiciona active na página selecionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// --- FORMULÁRIO DE CONTATO (validação e mensagem de envio) ---
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário dentro da seção de contato
    const formContato = document.querySelector('#contato form');
    if (!formContato) return; // segurança caso o elemento não exista

    // Cria dinamicamente uma área para exibir mensagens
    const mensagem = document.createElement('p');
    mensagem.style.marginTop = '10px';
    mensagem.style.fontWeight = 'bold';
    formContato.appendChild(mensagem);

    // Evento de envio
    formContato.addEventListener('submit', function (event) {
        event.preventDefault(); // evita recarregar a página

        // Captura os valores dos campos
        const nome = formContato.querySelector('input[type="text"]').value.trim();
        const email = formContato.querySelector('input[type="email"]').value.trim();
        const telefone = formContato.querySelector('input[type="number"]').value.trim();
        const mensagemTexto = formContato.querySelector('textarea').value.trim();

        // Validação simples
        if (!nome || !email || !telefone || !mensagemTexto) {
            mensagem.textContent = '❌ Por favor, preencha todos os campos.';
            mensagem.style.color = 'red';
            return;
        }
        

        // Validação básica de e-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            mensagem.textContent = '⚠️ E-mail inválido. Verifique e tente novamente.';
            mensagem.style.color = 'red';
            return;
        }

        // Se tudo estiver correto
        mensagem.textContent = '✅ Mensagem enviada com sucesso!';
        mensagem.style.color = 'green';

        // Limpa o formulário após o envio
        formContato.reset();
    });
});

// --- CARROSSEL DE PATROCINADORES ---
let currentSlide = 0;
let autoRotate;

function initCarousel() {
    const slides = document.querySelectorAll('.partner-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!slides.length || !dotsContainer) return;

    // Criar dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Iniciar auto-rotação
    autoRotate = setInterval(() => moveSlide(1), 5000);

    // Pausar auto-rotate quando o mouse estiver sobre o carrossel
    const carousel = document.querySelector('.partners-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });

        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => moveSlide(1), 5000);
        });
    }
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.partner-slide');
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const slider = document.querySelector('.partners-slider');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.partner-slide');
    
    if (slider && slides.length > 0) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Inicializar o carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', initCarousel);
