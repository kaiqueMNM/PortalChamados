document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Array de objetos de usuários com nome de usuário e senha correspondente
    const users = [
      { username: 'aluno@damas', password: 'senha123' },
      { username: 'aluno@damas.com', password: 'aluno2022' },
      { username: 'kaiquegregoo@gmail.com', password: 'amor87341454' },
  
      // Adicione mais usuários aqui conforme necessário
    ];
  
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
  
    // Verificar se o usuário e a senha correspondem a algum usuário no array
    const matchedUser = users.find(user => user.username === usernameInput && user.password === passwordInput);
  
    if (matchedUser) {
      // Redirecionar para outra página após o login bem-sucedido
      window.location.href = 'control.html';
    } else {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  })
  
  document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");
    const denyButton = document.getElementById("deny-cookies");
  
    acceptButton.addEventListener("click", function() {
        // Aqui você pode adicionar lógica para definir um cookie de aceitação
        cookieBanner.style.display = "none"; // Oculta o banner de cookies após aceitar
    });
  
    denyButton.addEventListener("click", function() {
        // Aqui você pode adicionar lógica para tratar a negação de cookies
        cookieBanner.style.display = "none"; // Oculta o banner de cookies após negar
    });
  });
  
  // Mostra ou oculta a área de anotações quando o botão "Anotações" é clicado
const toggleAnotacoesButton = document.getElementById("toggle-anotacoes");
const anotacoesContainer = document.getElementById("anotacoes-container");
toggleAnotacoesButton.addEventListener("click", function () {
    if (anotacoesContainer.style.display === "none") {
        anotacoesContainer.style.display = "block";
    } else {
        anotacoesContainer.style.display = "none";
    }
});

// Adiciona uma nova anotação quando o botão "Adicionar Anotação" é clicado
const addAnotacaoButton = document.getElementById("add-anotacao");
addAnotacaoButton.addEventListener("click", function () {
    const anotacaoText = document.getElementById("anotacoes-text").value;

    if (anotacaoText.trim() !== "") {
        const historicoAnotacoes = document.getElementById("historico-anotacoes");
        const novaAnotacao = document.createElement("div");
        novaAnotacao.className = "anotacao";
        novaAnotacao.innerText = anotacaoText;
        historicoAnotacoes.appendChild(novaAnotacao);

        // Limpa o campo de texto
        document.getElementById("anotacoes-text").value = "";
    }
});
function updateChamadoTable(chamados) {
    const table = document.getElementById("chamado-table").getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    for (let i = 0; i < chamados.length; i++) {
        const chamado = chamados[i];

        const newRow = table.insertRow(table.rows.length);

        const numeroChamadoCell = newRow.insertCell(0);
        const motivoCell = newRow.insertCell(1);
        const statusCell = newRow.insertCell(2);
        const anotacoesCell = newRow.insertCell(3); // Célula para o botão "Anotações"
        const acoesCell = newRow.insertCell(4); // Célula para os botões

        numeroChamadoCell.innerHTML = chamado.numeroChamado;
        motivoCell.innerHTML = chamado.motivo;
        statusCell.innerHTML = chamado.status;

        // Adiciona o botão "Anotações" para cada chamado
        const botaoAnotacoes = document.createElement("button");
        botaoAnotacoes.innerText = "Anotações";
        botaoAnotacoes.addEventListener("click", function () {
            // Mostra ou oculta a área de anotações para este chamado
            toggleAnotacoes(i);
        });
        anotacoesCell.appendChild(botaoAnotacoes);

        // Adiciona o botão "Terminar Chamado" para cada chamado e passa o índice do chamado como parâmetro
        acoesCell.appendChild(createTerminarButton(i));
    }
}

function blockCtrlU() {
  document.onkeydown = function(e) {
    if (e.keyCode === 85 && e.ctrlKey) {
      e.preventDefault();
    }
  };
}
// Função para mostrar ou ocultar a área de anotações para um chamado específico
function toggleAnotacoes(chamadoIndex) {
    const anotacoesContainer = document.getElementsByClassName("anotacoes-container")[chamadoIndex];
    if (anotacoesContainer.style.display === "none" || anotacoesContainer.style.display === "") {
        anotacoesContainer.style.display = "block";
    } else {
        anotacoesContainer.style.display = "none";
    }
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita o comportamento padrão do formulário (submit)
    login(); // Chama a função de login quando a tecla "Enter" for pressionada
  }
});

document.addEventListener('keydown', function(event) {
if (event.ctrlKey && event.key === 'u') {
event.preventDefault();
alert('A função "Ctrl + U" está desativada nesta página.');
}
});

document.addEventListener('contextmenu', function(event) {
event.preventDefault();
alert('O botão direito do mouse está desativado nesta página.');
});
