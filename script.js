const InputTarefa = document.getElementById("InputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.geElementaById("listaTarefas");
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
        listaTarefas.appendChild(li);







