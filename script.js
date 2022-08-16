const main = document.querySelector("main");
let quantity = 0;

while ((quantity < 4) || (quantity > 14) || (quantity %2 !== 0)) {
  quantity = prompt("Com quantas cartas você quer jogar?");
}

for (let i = 0; i < quantity; i++) {
  main.innerHTML += `<div class="card" id="${i}"></div>`;
}
