// Seletores principais
const inputItem = document.getElementById("inputAddItem");
const addItem = document.getElementById("buttonAddItem");
const form = document.getElementById("formAddItem");
const listItem = document.getElementById("ulListItem");
const btnRemoveChecked = document.getElementById("btnRemoveChecked");
const alerta = document.querySelector(".alert-delete");

// Evento: Envio do formulário (adiciona novo item à lista)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const texto = inputItem.value.trim();
  if (texto === "") return;

  adicionarItem(texto);
  inputItem.value = ""; // limpa o campo após adicionar
});

// Função: Cria e adiciona um novo item (li) com checkbox e botão de deletar
function adicionarItem(texto) {
  const li = document.createElement("li");
  li.classList.add("item");

  li.innerHTML = `
    <input type="checkbox" />
    <span>${texto}</span>
    <button class="btn-delete">
      <img src="assets/icos/bin.svg" alt="" />
    </button>
  `;

  listItem.appendChild(li);
}

// Função: Mostra o alerta por 3 segundos e ajusta a margem da lista
function mostrarAlertaTemp() {
  alerta.style.display = "flex";
  listItem.style.marginBottom = "0";

  setTimeout(() => {
    alerta.style.display = "none";
    listItem.style.marginBottom = "13.5625rem";
  }, 3000);
}

// Função: Verifica se algum checkbox está marcado para mostrar/esconder o botão
function verificarCheckboxesMarcados() {
  const checkboxes = listItem.querySelectorAll('input[type="checkbox"]');
  const algumMarcado = Array.from(checkboxes).some((cb) => cb.checked);

  btnRemoveChecked.style.display = algumMarcado ? "flex" : "none";
}

// Evento: Clique em botão "Remover selecionados"
btnRemoveChecked.addEventListener("click", () => {
  const itens = listItem.querySelectorAll("li");
  let algumRemovido = false;

  itens.forEach((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      li.remove();
      algumRemovido = true;
    }
  });

  if (algumRemovido) {
    mostrarAlertaTemp();
  }

  // Atualiza visibilidade do botão após remoção
  verificarCheckboxesMarcados();
});

// Evento: Clique nos botões individuais de deletar (usa delegação)
listItem.addEventListener("click", (event) => {
  if (event.target.closest(".btn-delete")) {
    const li = event.target.closest("li");
    if (li) {
      li.remove();
      verificarCheckboxesMarcados(); // atualiza o botão se o item removido estava marcado
    }
  }
});

// Evento: Mudança em qualquer checkbox (para exibir ou ocultar o botão)
listItem.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    verificarCheckboxesMarcados();
  }
});
