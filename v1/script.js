// Espera o documento carregar
document.addEventListener("DOMContentLoaded", function() {
    
    // Pega os elementos
    const toggleButton = document.getElementById("toggle-answer-btn");
    const answerSection = document.getElementById("answer-section");
    const correctOption = document.getElementById("option-c"); // Pega a alternativa 'c'

    // Adiciona um evento de clique ao botão
    toggleButton.addEventListener("click", function() {
        
        // Verifica se a resposta está visível
        const isVisible = answerSection.style.display === "block";

        if (isVisible) {
            // Se estiver visível, esconde
            answerSection.style.display = "none";
            toggleButton.textContent = "Mostrar Resposta";
            
            // Remove o destaque da opção correta
            correctOption.classList.remove("option-correct");

        } else {
            // Se estiver oculta, mostra
            answerSection.style.display = "block";
            toggleButton.textContent = "Ocultar Resposta";
            
            // Adiciona o destaque na opção correta (c)
            correctOption.classList.add("option-correct");
        }
    });
});