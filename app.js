"use strict";

let banco = [{ tarefa: "estudar até ficar perfeito", status: "" }];

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `<input type="checkbox" ${status}>
                    <div>${tarefa}</div>
                    <input type="button" value="x" data-indice="${indice}"> `;
  document.getElementById("todoList").appendChild(item);
};
const limparTarefa = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};
const atualizarTela = () => {
  limparTarefa();
  banco.forEach((item, index) => {
    criarItem(item.tarefa, item.status, index);
  });
};
const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === "Enter") {
    banco.push({ tarefa: texto, status: "" });
    atualizarTela();
    evento.target.value = " ";
  }
};
const removeItem = (index) => {
  banco.splice(index, 1);
  atualizarTela();
};
const clickItem = (evento) => {
  const elemento = evento.target;
  const index = elemento.dataset.indice;

  if (elemento.type === "button") {
    removeItem(index);
  }
};

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela();
