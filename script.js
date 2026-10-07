const InputTarefa = document.getElementById("InputTarefa");
const InputDescricao = document.getElementById("ImputDescricao");
const InputData = document.getElementById("imputData");
const SelectPrioridade = document.getElementById("ImputPrioridade");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const btnTodas = document.getElementById("btnTodas");
const btnPendentes = document.getElementById("btnPendentes");
const btnConcluidas = document.getElementById("btnConcluidas");

let tarefas = [];
let filtroAtual = "todas";
let indiceEdicao = -1;

if(localStorage.getItem("listaSalva")){
    tarefas = JSON.parse(localStorage.getItem("listaSalva"));
}

function mostrarTarefas(){
    listaTarefas.innerHTML = "";    

    for(let i = 0; i < tarefas.length; i++){
        if(filtroAtual === "pendentes" && tarefas[i].concluida) continue;
        if(filtroAtual === "concluidas" && !tarefas[i].concluida) continue;

        const li = document.createElement("li"); 
        
        const estilo = tarefas[i].concluida ? "text-decoration: line-through; color: gray;" : "";
        
        li.innerHTML = `
            <span style="cursor: pointer; ${estilo}" onclick="alternarConclusao(${i})">
                ${tarefas[i].nome}
            </span>
            <button onclick="apagar(${i})">x</button>
        `;
        
        listaTarefas.appendChild(li);
    }
}

btnAdicionar.onclick = function(){
    const texto = InputTarefa.value.trim(); 

    if(texto === ""){
        alert("Digite uma tarefa válida");
        return;
    }

    const nova = {
        nome: texto,
        concluida: false
    };

    tarefas.push(nova);
    localStorage.setItem("listaSalva", JSON.stringify(tarefas));

    InputTarefa.value = "";
    mostrarTarefas();
}

function apagar(pos){
    tarefas.splice(pos, 1);
    localStorage.setItem("listaSalva", JSON.stringify(tarefas));
    mostrarTarefas();
}

function alternarConclusao(pos){
    tarefas[pos].concluida = !tarefas[pos].concluida; 
    localStorage.setItem("listaSalva", JSON.stringify(tarefas));
    mostrarTarefas();
}


btnTodas.onclick = function() { 
    filtroAtual = "todas"; 
    mostrarTarefas(); 
};

btnPendentes.onclick = function() { 
    filtroAtual = "pendentes"; 
    mostrarTarefas(); 
};

btnConcluidas.onclick = function() { 
    filtroAtual = "concluidas"; 
    mostrarTarefas(); 
};

mostrarTarefas();