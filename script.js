const main = document.querySelector("main");
let quantity = 0;
const array = [];

while ((quantity < 4) || (quantity > 14) || (quantity %2 !== 0)) {
  quantity = prompt("Com quantas cartas você quer jogar?");
}

function comparator() { 
	return Math.random() - 0.5; 
}

for (let i = 0; i < quantity; i++) {
  array.push(`<div class="card" onclick="choose(this)"><div class="front-face face"><img src="../images/front.png" /></div><div class="back-face face"><img src="../images/metalparrot.gif" /></div></div>`);
}

array.sort(comparator);

for (let i = 0; i < quantity; i++) {
  main.innerHTML += array[i];
}

function choose(card) {
  card.querySelector(".front-face").classList.add("flip");
  card.querySelector(".back-face").classList.add("hold");
}
