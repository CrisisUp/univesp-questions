document.addEventListener("DOMContentLoaded", function() {
    
    const slides = document.querySelectorAll(".question-slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progressBar = document.getElementById("progress-bar");
    
    // === NOVA LÓGICA DE BUSCA ===
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", function(e) {
        const term = e.target.value.toLowerCase();
        searchResults.innerHTML = ""; // Limpa resultados anteriores

        // Se tiver menos de 2 letras, esconde a lista e para
        if (term.length < 2) {
            searchResults.style.display = "none";
            return;
        }

        let foundCount = 0;

        // Percorre todos os slides procurando o texto
        slides.forEach((slide, index) => {
            // Pega todo o texto do slide
            const text = slide.innerText.toLowerCase();
            
            // Se encontrar o termo
            if (text.includes(term)) {
                foundCount++;
                
                // Pega o título da questão (h1) para mostrar no resultado
                const title = slide.querySelector("h1").innerText;
                
                // Cria o item da lista
                const item = document.createElement("div");
                item.className = "search-item";
                item.innerHTML = `<strong>${title}</strong> Encontrado no slide ${index + 1}`;
                
                // Ao clicar, vai para o slide e limpa a busca
                item.addEventListener("click", function() {
                    showSlide(index); // Usa sua função existente de mostrar slide
                    searchResults.style.display = "none";
                    searchInput.value = ""; // Limpa o campo
                });

                searchResults.appendChild(item);
            }
        });

        // Mostra ou esconde a lista dependendo se achou algo
        if (foundCount > 0) {
            searchResults.style.display = "block";
        } else {
            searchResults.style.display = "none";
        }
    });

    // Fecha a busca se clicar fora dela
    document.addEventListener("click", function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // 1. Função de Navegação
    function showSlide(index) {
        slides[currentSlide].classList.remove("slide-active");

        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add("slide-active");
        
        // Atualiza Barra de Progresso
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        // Scroll suave para o topo do card
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 2. Lógica de Interatividade (Clique nas opções)
    slides.forEach(slide => {
        const optionsContainer = slide.querySelector(".options");
        const options = slide.querySelectorAll(".option");
        const answerSection = slide.querySelector(".answer-section");
        const explainBtn = slide.querySelector(".toggle-answer-btn");

        // Ao clicar em uma opção...
        options.forEach(option => {
            option.addEventListener("click", function() {
                // Se já respondeu, não faz nada
                if (optionsContainer.classList.contains("disabled")) return;

                // Bloqueia novas tentativas
                optionsContainer.classList.add("disabled");

                // Verifica se é a correta
                // (O CSS usa 'option-correct', mas vamos checar a classe do HTML)
                const isCorrect = option.classList.contains("option-correct");

                if (isCorrect) {
                    option.classList.add("correct");
                    // Opcional: Abrir explicação automaticamente se acertar
                    // answerSection.style.display = "block"; 
                } else {
                    option.classList.add("wrong");
                    // Se errou, destaca a correta automaticamente para o usuário aprender
                    const correctOption = slide.querySelector(".option-correct");
                    if (correctOption) correctOption.classList.add("correct");
                }
                
                // Mostra o botão de explicação (ou a própria explicação)
                if(explainBtn) explainBtn.textContent = "Ver Explicação Detalhada";
            });
        });

        // Botão de Explicação (mantido como backup)
        if (explainBtn) {
            explainBtn.addEventListener("click", function() {
                if (answerSection.style.display === "block") {
                    answerSection.style.display = "none";
                    explainBtn.textContent = "Mostrar Resposta / Explicação";
                } else {
                    answerSection.style.display = "block";
                    explainBtn.textContent = "Ocultar Explicação";
                }
            });
        }
    });

    // Event Listeners Navegação
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    
    // Atalho de Teclado (Setas)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") showSlide(currentSlide + 1);
        if (e.key === "ArrowLeft") showSlide(currentSlide - 1);
    });

    // Inicializa
    showSlide(0);
});