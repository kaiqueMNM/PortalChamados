  // Função para salvar as tarefas no localStorage
  function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para recuperar as tarefas do localStorage
function recuperarTarefas() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

// Função para adicionar uma tarefa
function adicionarTarefa() {
    const responsavel = document.getElementById("responsavel").value;
    const data = document.getElementById("data").value;
    const acompanhamento = document.getElementById("acompanhamento").value;

    if (responsavel && data && acompanhamento) {
        const table = document.querySelector("table tbody");
        const newRow = table.insertRow();
        const newRowNum = table.rows.length;

        const dataHoraAtual = new Date();
        const dataHoraFormatada = dataHoraAtual.toLocaleString();

        newRow.innerHTML = `<td>${newRowNum}</td>
                            <td class="responsavel-cell">${responsavel}</td>
                            <td class="data-cell">${data}</td>
                            <td class="acompanhamento-cell">${acompanhamento}</td>
                            <td class="data-hora-criacao-cell">${dataHoraFormatada}</td>
                            <td class="data-hora-edicao-cell"></td>
                            <td><button class="edit-button" onclick="editarTarefa(${newRowNum})">Editar</button></td>
                            <td><button class="delete-button" onclick="excluirTarefa(this)">Excluir Tarefa</button></td>`;

        // Salvar a tarefa no array de tarefas
        const tarefas = recuperarTarefas();
        tarefas.push({
            responsavel,
            data,
            acompanhamento,
            dataHoraCriacao: dataHoraFormatada,
            dataHoraEdicao: ''
        });
        salvarTarefas(tarefas);

        document.getElementById("responsavel").value = "";
        document.getElementById("data").value = "";
        document.getElementById("acompanhamento").value = "";
    } else {
        alert("Preencha todos os campos.");
    }
}

// Função para excluir uma tarefa
function excluirTarefa(button) {
    const row = button.closest("tr");
    const rowIndex = row.rowIndex;
    const tarefas = recuperarTarefas();

    // Remove a tarefa do array de tarefas
    tarefas.splice(rowIndex - 1, 1);

    // Salva o array atualizado no localStorage
    salvarTarefas(tarefas);

    // Remove a linha da tabela
    row.remove();
}

// Função para editar uma tarefa
function editarTarefa(id) {
    const row = document.querySelector(`tbody tr:nth-child(${id})`);
    const adicionarButton = document.getElementById("adicionar");

    if (row) {
        const responsavel = row.querySelector('.responsavel-cell').textContent;
        const data = row.querySelector('.data-cell').textContent;
        const acompanhamento = row.querySelector('.acompanhamento-cell').textContent;

        document.getElementById("responsavel").value = responsavel;
        document.getElementById("data").value = data;
        document.getElementById("acompanhamento").value = acompanhamento;

        adicionarButton.textContent = 'Salvar Alteração';
        adicionarButton.onclick = () => salvarEdicaoTarefa(id);
    }
}

// Função para salvar a edição de uma tarefa
function salvarEdicaoTarefa(id) {
    const row = document.querySelector(`tbody tr:nth-child(${id})`);
    const adicionarButton = document.getElementById("adicionar");

    if (row) {
        const responsavelInput = document.getElementById('responsavel');
        const dataInput = document.getElementById('data');
        const acompanhamentoTextarea = document.getElementById('acompanhamento');
        const dataHoraEdicaoCell = row.querySelector('.data-hora-edicao-cell');

        const tarefas = recuperarTarefas();
        const tarefaEditada = tarefas[id - 1];
        tarefaEditada.responsavel = responsavelInput.value;
        tarefaEditada.data = dataInput.value;
        tarefaEditada.acompanhamento = acompanhamentoTextarea.value;

        const dataHoraEdicao = new Date().toLocaleString();
        tarefaEditada.dataHoraEdicao = dataHoraEdicao;
        dataHoraEdicaoCell.textContent = dataHoraEdicao;

        salvarTarefas(tarefas);

        document.getElementById("responsavel").value = "";
        document.getElementById("data").value = "";
        document.getElementById("acompanhamento").value = "";

        adicionarButton.textContent = 'Adicionar Tarefa';
        adicionarButton.onclick = adicionarTarefa;
    }
}

// Carrega as tarefas do localStorage ao carregar a página
window.addEventListener('load', () => {
    const tarefas = recuperarTarefas();
    const table = document.querySelector("table tbody");
    tarefas.forEach((tarefa, index) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${index + 1}</td>
                            <td class="responsavel-cell">${tarefa.responsavel}</td>
                            <td class="data-cell">${tarefa.data}</td>
                            <td class="acompanhamento-cell">${tarefa.acompanhamento}</td>
                            <td class="data-hora-criacao-cell">${tarefa.dataHoraCriacao}</td>
                            <td class="data-hora-edicao-cell">${tarefa.dataHoraEdicao}</td>
                            <td><button class="edit-button" onclick="editarTarefa(${index + 1})">Editar</button></td>
                            <td><button class="delete-button" onclick="excluirTarefa(this)">Excluir Tarefa</button></td>`;
    });
});

document.getElementById("adicionar").onclick = adicionarTarefa;

// Função para salvar a edição de uma tarefa
function salvarEdicaoTarefa(id) {
    const row = document.querySelector(`tbody tr:nth-child(${id})`);
    const adicionarButton = document.getElementById("adicionar");

    if (row) {
        const responsavelInput = document.getElementById('responsavel');
        const dataInput = document.getElementById('data');
        const acompanhamentoTextarea = document.getElementById('acompanhamento');
        const dataHoraEdicaoCell = row.querySelector('.data-hora-edicao-cell');

        const tarefas = recuperarTarefas();
        const tarefaEditada = tarefas[id - 1];
        tarefaEditada.responsavel = responsavelInput.value;
        tarefaEditada.data = dataInput.value;
        tarefaEditada.acompanhamento = acompanhamentoTextarea.value;

        const dataHoraEdicao = new Date().toLocaleString();
        tarefaEditada.dataHoraEdicao = dataHoraEdicao;
        dataHoraEdicaoCell.textContent = dataHoraEdicao;

        salvarTarefas(tarefas);

        document.getElementById("responsavel").value = "";
        document.getElementById("data").value = "";
        document.getElementById("acompanhamento").value = "";

        adicionarButton.textContent = 'Adicionar Tarefa';
        adicionarButton.onclick = adicionarTarefa;

        // Recarrega a página automaticamente
        location.reload();
    }
}