function addChamado(event) {
    event.preventDefault();

    const motivo = document.getElementById("motivo").value;
    const status = document.getElementById("status").value;
    const numeroChamado = document.getElementById("numero-chamado").value;

    // Recupera os chamados existentes do localStorage (se houver algum)
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    // Cria um novo objeto de chamado e adiciona a data e hora de criação
    const novoChamado = {
        motivo: motivo,
        status: status,
        numeroChamado: numeroChamado,
        dataHoraRegistro: new Date().toLocaleString() // Adiciona a data e hora atual
    };
    

    // Adiciona o novo chamado à lista de chamados
    chamados.push(novoChamado);

    // Salva a lista de chamados atualizada no localStorage
    localStorage.setItem("chamados", JSON.stringify(chamados));

    // Atualiza a tabela
    updateChamadoTable(chamados);

    // Limpa os campos do formulário após adicionar o chamado
    document.getElementById("motivo").value = "";
    document.getElementById("status").value = "Aberto";
    document.getElementById("numero-chamado").value = "";
}



// Função para atualizar a tabela de chamados
function updateChamadoTable(chamados) {
    const table = document.getElementById("chamado-table").getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    for (let i = 0; i < chamados.length; i++) {
        const chamado = chamados[i];

        const newRow = table.insertRow(table.rows.length);

        const numeroChamadoCell = newRow.insertCell(0);
        const motivoCell = newRow.insertCell(1);
        const statusCell = newRow.insertCell(2);
        const acoesCell = newRow.insertCell(3); // Célula para os botões

        numeroChamadoCell.innerHTML = chamado.numeroChamado;
        motivoCell.innerHTML = chamado.motivo;
        statusCell.innerHTML = chamado.status;

        // Adiciona o botão "Terminar Chamado" para cada chamado e passa o índice do chamado como parâmetro
        acoesCell.appendChild(createTerminarButton(i));
    }
}


// Função para marcar um chamado como finalizado e removê-lo da lista
function markChamadoAsFinalizado(chamadoIndex) {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    // Remove o chamado da lista com base no índice
    chamados.splice(chamadoIndex, 1);

    // Atualiza o localStorage com a lista atualizada de chamados
    localStorage.setItem("chamados", JSON.stringify(chamados));

    // Atualiza a tabela
    updateChamadoTable(chamados);
}

// Função para criar botão "Terminar Chamado" com confirmação
function createTerminarButton(chamadoIndex) {
    const button = document.createElement("button");
    button.innerText = "Terminar Chamado";
    button.addEventListener("click", function () {
        const confirmacao = confirm("Você deseja realmente finalizar este chamado?");
        if (confirmacao) {
            markChamadoAsFinalizado(chamadoIndex);
        }
    });
    return button;
}

// Inicializa a tabela de chamados quando a página é carregada
initChamadoTable();

// Função para inicializar a tabela de chamados a partir do localStorage
function initChamadoTable() {
    const chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    updateChamadoTable(chamados);
}

// Adiciona um ouvinte de evento para o formulário de chamados
document.getElementById("chamado-form").addEventListener("submit", addChamado);




