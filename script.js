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







