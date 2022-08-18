/* variables */

const main = document.querySelector("main");
const faces = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"]
const cards = [];
let amount = 0;


/* functions */

function choose(card) {
  card.querySelector(".front-face").classList.add("flip");
  card.querySelector(".back-face").classList.add("hold");
}

function comparator() { 
	return Math.random() - 0.5; 
}


/* asking how many cards the player wants */
while ((amount < 4) || (amount > 14) || (amount %2 !== 0)) {
  amount = prompt("Com quantas cartas você quer jogar?");
}

/* sorting the faces and creating cards */
faces.sort(comparator);
for (let i = 0; i < amount/2; i++) {
  for (let j = 0; j < 2; j++) {
    cards.push(`<div class="card" onclick="choose(this)"><div class="front-face face"><img src="../images/front.png" /></div><div class="back-face face"><img src="../images/${faces[i]}parrot.gif" /></div></div>`);
  }
}

/* sorting the cards and including into de game */
cards.sort(comparator);
for (let i = 0; i < amount; i++) {
  main.innerHTML += cards[i];
}
