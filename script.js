const InputTarefa = document.getElementById("InputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const ListaTarefas = document.geElementaById("ListaTarefas");
const btnTodas = document.getElementById("btnTodas");
const btnPendentes = document.getElementById("btnPendentes");
const btnConcluidas = document.getElementById("btnConcluidas");

const tarefas = [];
if(localStorage.getItem("listaSalva")){
    tarefas = JSON.parse(localStorage.getItem("listaSalva"));

}

function mostrarTarefas(){
    listaTarefas.innerHTML = "";    

    for(const i = 0; i<tarefas.length; i++){
        const li = document.creatElement("li");
        li.innerHTML = tarefas[i].nome + <button onclick= ´apagar(" + i + ")´>x</button>;
        ListaTarefas.appendChild(li);
    }

}

btnAdicionar.onclick = function(){
    const texto = InputTarefa.value;

    if(texto == ""){
        alert("Digite uma tarefa");
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

mostrarTarefas();