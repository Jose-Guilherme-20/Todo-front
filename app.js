"use strict";
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `<input type="checkbox" ${status}  data-indice=${indice}>
                    <div>${tarefa}</div>
                    <input type="button" value="x" data-indice=${indice}> `;
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
  const banco = getBanco();
  banco.forEach((item, index) => {
    criarItem(item.tarefa, item.status, index);
  });
};
const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === "Enter") {
    const banco = getBanco();
    banco.push({ tarefa: texto, status: "" });
    setBanco(banco);
    atualizarTela();
    evento.target.value = " ";
  }
};
const removeItem = (index) => {
  const banco = getBanco();
  banco.splice(index, 1);
  setBanco(banco);
  atualizarTela();
};

const atualizarItem = (index) => {
  const banco = getBanco();
  banco[index].status = banco[index].status === "" ? "checked" : "";
  setBanco(banco);
  atualizarTela();
};
const clickItem = (evento) => {
  const elemento = evento.target;
  const index = elemento.dataset.indice;

  if (elemento.type === "button") {
    removeItem(index);
  } else if (elemento.type === "checkbox") {
    atualizarItem(index);
  }
};

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela();
