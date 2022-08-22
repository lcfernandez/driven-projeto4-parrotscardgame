/* variables */

const counter = document.querySelector(".counter");
const main = document.querySelector("main");
const faces = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"];
let amount;
let cards;
let idInterval;
let lastChosen;
let matchingPairs;
let moves;
let time;


/* functions */

function choose(card) {
    if (lastChosen != card) {
        flip(card);
        moves++;

        if (moves === 0 || (moves % 2 !== 0)) {
            lastChosen = card;
        } else {
            check(card);
        }
    }
}

function check(card) {
    unFreeze("F");

    if (card.querySelector(".back-face img").src === lastChosen.querySelector(".back-face img").src) {
        matchingPairs++;
        card.classList.add("match");
        lastChosen.classList.add("match");
        
        if (matchingPairs === amount / 2) {
            stopCounting();
            alert(`Você ganhou em ${moves} jogadas! O jogo durou ${time} segundos.`);

            let again;

            while (again !== "sim" && again !== "não") {
                again = prompt("Deseja jogar novamente? (sim/não)");
            }
            
            if (again === "sim") {    
                startGame();
            }
        } else {
            unFreeze("U");
        }
    } else {
        setTimeout(function () {
            flip(card);
            flip(lastChosen);
            unFreeze("U");
            
            lastChosen = undefined;
        }, 1000);
    }
}

function comparator() { 
    return Math.random() - 0.5; 
}

function flip(card) {
    card.querySelector(".front-face").classList.toggle("turn");
    card.querySelector(".back-face").classList.toggle("hold");
}

function startCounting() {
    time = 0;
    idInterval = setInterval(function () {
        time++;
        counter.innerHTML = time;
    }, 1000);
}

function startGame() {
    amount = 0;
    matchingPairs = 0;
    moves = 0;
    cards = [];
    lastChosen = undefined;
    
    setTimeout(function () {
        /* asking how many cards the player wants */
        while ((amount < 4) || (amount > 14) || (amount %2 !== 0)) {
            amount = prompt("Com quantas cartas você quer jogar?");
        }
        
        /* sorting the faces and creating cards */
        faces.sort(comparator);

        for (let i = 0; i < amount / 2; i++) {
            for (let j = 0; j < 2; j++) {
                cards.push(
                    `<div class="card" onclick="choose(this)">
                        <div class="front-face face">
                            <img src="../images/front.png" />
                        </div>
                        <div class="back-face face">
                            <img src="../images/back/${faces[i]}parrot.gif" />
                        </div>
                    </div>`
                );
            }
        }
        
        counter.innerHTML = 0;
        main.innerHTML = "";

        /* sorting the cards and including into the page */
        cards.sort(comparator);

        for (let i = 0; i < amount; i++) {
            main.innerHTML += cards[i];
        }
        
        startCounting();
    }, 1);
}

function stopCounting() {
    clearInterval(idInterval);
}

function unFreeze(option) {
    const cards = document.querySelectorAll(".card:not(.match)");
    
    if (option === "U") {
        for (let i = 0; i < cards.length; i++) {
            cards[i].setAttribute("onclick", "choose(this)");
        }
    } else if (option === "F") {
        for (let i = 0; i < cards.length; i++) {
            cards[i].removeAttribute("onclick");
        }
    } else {
        return;
    }
}

startGame();
