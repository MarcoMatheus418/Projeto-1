const InputTarefa = document.getElementById("InputTarefa");
const InputDescricao = document.getElementById("InputDescricao");
const InputData = document.getElementById("InputData");
const SelectPrioridade = document.getElementById("SelectPrioridade");
const btnAdicionar = document.getElementById("btnAdicionar");

const listaTarefas = document.getElementById("listaTarefas");
const btnTodas = document.getElementById("btnTodas");
const btnPendentes = document.getElementById("btnPendentes");
const btnConcluidas = document.getElementById("btnConcluidas");

let tarefas = [];
let filtroAtual = "todas";
let indiceEdicao = -1; 

if(localStorage.getItem("listaSalva") != null){
    tarefas = JSON.parse(localStorage.getItem("listaSalva"));
}

function mostrarTarefas(){
    listaTarefas.innerHTML = "";    

    for(let i = 0; i < tarefas.length; i++){
        
        if(filtroAtual == "pendentes" && tarefas[i].concluida == true){
            continue;
        }
        if(filtroAtual == "concluidas" && tarefas[i].concluida == false){
            continue;
        }

        const li = document.createElement("li"); 
        
        let classeConcluida = "";
        if(tarefas[i].concluida == true){
            classeConcluida = "tarefa-riscada";
        }

        let p = tarefas[i].prioridade;
        if(p == undefined || p == ""){
            p = "baixa";
        }

        let classeCor = "prioridade-baixa"; 
        let nomePrioridade = "BAIXA";
        
        if(p == "media"){
            classeCor = "prioridade-media"; 
            nomePrioridade = "MÉDIA";
        } else if(p == "alta"){
            classeCor = "prioridade-alta"; 
            nomePrioridade = "ALTA";
        }

        let desc = "";
        if(tarefas[i].descricao != undefined && tarefas[i].descricao != ""){
            desc = "<p class='descricao " + classeConcluida + "'>" + tarefas[i].descricao + "</p>";
        }

        let dataCerta = "Sem data";
        if(tarefas[i].data != undefined && tarefas[i].data != ""){
            const partes = tarefas[i].data.split("-");
            if(partes.length == 3){
                dataCerta = partes[2] + "/" + partes[1] + "/" + partes[0];
            } else {
                dataCerta = tarefas[i].data;
            }
        }

        let htmlDaTarefa = "";
        htmlDaTarefa = htmlDaTarefa + "<div class='item-tarefa " + classeCor + "'>";
        
        htmlDaTarefa = htmlDaTarefa + "<span class='nome-tarefa " + classeConcluida + "' onclick='alternarConclusao(" + i + ")'>";
        htmlDaTarefa = htmlDaTarefa + tarefas[i].nome;
        htmlDaTarefa = htmlDaTarefa + "</span>";
        
        htmlDaTarefa = htmlDaTarefa + desc;
        
        htmlDaTarefa = htmlDaTarefa + "<p class='info-extra " + classeConcluida + "'>";
        htmlDaTarefa = htmlDaTarefa + "Data: " + dataCerta + " | Prioridade: " + nomePrioridade;
        htmlDaTarefa = htmlDaTarefa + "</p>";
        
        htmlDaTarefa = htmlDaTarefa + "<div class='botoes-acao'>";
        htmlDaTarefa = htmlDaTarefa + "<button onclick='editar(" + i + ")'>Editar</button>";
        htmlDaTarefa = htmlDaTarefa + "<button onclick='apagar(" + i + ")'>Apagar</button>";
        htmlDaTarefa = htmlDaTarefa + "</div>";
        
        htmlDaTarefa = htmlDaTarefa + "</div>";

        li.innerHTML = htmlDaTarefa;
        listaTarefas.appendChild(li);
    }
}

btnAdicionar.onclick = function(){
    const texto = InputTarefa.value; 
    const descricao = InputDescricao.value;
    const data = InputData.value;
    const prioridade = SelectPrioridade.value;

    if(texto == ""){
        alert("Por favor, digite o nome da tarefa!");
        return;
    }

    if(indiceEdicao >= 0){
        tarefas[indiceEdicao].nome = texto;
        tarefas[indiceEdicao].descricao = descricao;
        tarefas[indiceEdicao].data = data;
        tarefas[indiceEdicao].prioridade = prioridade;
        
        indiceEdicao = -1; 
        btnAdicionar.innerHTML = "Adicionar"; 
    } else {
        const nova = {
            nome: texto,
            descricao: descricao,
            data: data,
            prioridade: prioridade,
            concluida: false
        };
        tarefas.push(nova);
    }

    localStorage.setItem("listaSalva", JSON.stringify(tarefas));

    InputTarefa.value = "";
    InputDescricao.value = "";
    InputData.value = "";
    SelectPrioridade.value = "baixa";

    mostrarTarefas();
}

function apagar(pos){
    tarefas.splice(pos, 1);
    localStorage.setItem("listaSalva", JSON.stringify(tarefas));
    mostrarTarefas();
}

function alternarConclusao(pos){
    if(tarefas[pos].concluida == false){
        tarefas[pos].concluida = true;
    } else {
        tarefas[pos].concluida = false;
    }
    
    localStorage.setItem("listaSalva", JSON.stringify(tarefas));
    mostrarTarefas();
}

function editar(pos){
    InputTarefa.value = tarefas[pos].nome;
    
    if(tarefas[pos].descricao != undefined){
        InputDescricao.value = tarefas[pos].descricao;
    } else {
        InputDescricao.value = "";
    }

    if(tarefas[pos].data != undefined){
        InputData.value = tarefas[pos].data;
    } else {
        InputData.value = "";
    }

    if(tarefas[pos].prioridade != undefined){
        SelectPrioridade.value = tarefas[pos].prioridade;
    } else {
        SelectPrioridade.value = "baixa";
    }
    
    indiceEdicao = pos; 
    btnAdicionar.innerHTML = "Gravar Edição"; 
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