// Espera o documento carregar
document.addEventListener("DOMContentLoaded", function() {
    
    // === Lógica do Carrossel (Navegação) ===
    const slides = document.querySelectorAll(".question-slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const counterElement = document.getElementById("slide-counter");
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Esconde o slide atual
        slides[currentSlide].classList.remove("slide-active");

        // Atualiza o índice (com loop)
        if (index >= totalSlides) {
            currentSlide = 0; // Volta ao primeiro
        } else if (index < 0) {
            currentSlide = totalSlides - 1; // Vai para o último
        } else {
            currentSlide = index;
        }

        // Mostra o novo slide
        slides[currentSlide].classList.add("slide-active");
        
        // Atualiza o contador
        counterElement.textContent = `Questão ${currentSlide + 1} de ${totalSlides}`;
    }

    // Event Listeners dos botões de navegação
    nextBtn.addEventListener("click", function() {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener("click", function() {
        showSlide(currentSlide - 1);
    });

    // Inicializa o primeiro slide e o contador
    showSlide(0);

    // === Lógica do Botão "Mostrar Resposta" (para múltiplos slides) ===

    // Pega TODOS os botões de resposta
    const allToggleButtons = document.querySelectorAll(".toggle-answer-btn");

    // Adiciona um evento para CADA botão
    allToggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            
            // Encontra os elementos "parentes" deste botão específico
            const slide = button.closest(".question-slide");
            const answerSection = slide.querySelector(".answer-section");
            const correctOption = slide.querySelector(".option-correct"); // Pega a opção correta

            // Verifica se a resposta está visível
            const isVisible = answerSection.style.display === "block";

            if (isVisible) {
                // Se estiver visível, esconde
                answerSection.style.display = "none";
                button.textContent = "Mostrar Resposta";
                // Remove o destaque
                if (correctOption) {
                    correctOption.classList.remove("option-correct-highlight");
                }
            } else {
                // Se estiver oculta, mostra
                answerSection.style.display = "block";
                button.textContent = "Ocultar Resposta";
                // Adiciona o destaque
                if (correctOption) {
                    correctOption.classList.add("option-correct-highlight");
                }
            }
        });
    });
});