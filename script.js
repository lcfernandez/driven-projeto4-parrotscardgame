/* global variables */

const main = document.querySelector("main");
const timer = document.querySelector(".timer");
const faces = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"];
let amount;
let idInterval;
let firstChoice;
let matchingPairs;
let moves;
let time;


/* functions */

function check(card) {
    unFreeze("F");

    if (card.querySelector(".back-face img").src === firstChoice.querySelector(".back-face img").src) {
        matchingPairs++;
        card.classList.add("match");
        firstChoice.classList.add("match");
        
        if (matchingPairs === amount / 2) {
            stopTimer();

            /* to flip the last card of the game in the mobile version */
            setTimeout(function () {
                alert(`Você ganhou em ${moves} jogadas! O jogo durou ${time} segundos.`);

                let again;

                while (again !== "sim" && again !== "não") {
                    again = prompt("Deseja jogar novamente? (sim/não)");
                }
                
                if (again === "sim") {    
                    startGame();
                }
            }, 100);
        } else {
            unFreeze("U");
        }
    } else {
        /* to give time to the player to memorize the card*/
        setTimeout(function () {
            flip(card);
            flip(firstChoice);
            unFreeze("U");
            
            firstChoice = undefined;
        }, 1000);
    }
}

function choose(card) {
    if (card != firstChoice) {
        flip(card);
        moves++;

        if (moves === 0 || (moves % 2 !== 0)) {
            firstChoice = card;
        } else {
            check(card);
        }
    }
}

function comparator() { 
    return Math.random() - 0.5;
}

function flip(card) {
    card.querySelector(".front-face").classList.toggle("turn");
    card.querySelector(".back-face").classList.toggle("hold");
}

function startGame() {
    let cardsTemplate = [];

    /* setting values inside the function in case of new game */
    amount = 0;
    matchingPairs = 0;
    moves = 0;
    firstChoice = undefined;

    timer.innerHTML = 0;
    main.innerHTML = "";

    /* to load the entire page before the prompt (for the first time the page is opened) */
    setTimeout(function () {
        /* asking how many cards the player wants */
        while ((amount < 4) || (amount > 14) || (amount %2 !== 0)) {
            amount = prompt("Com quantas cartas você quer jogar?");
        }
        
        /* sorting faces and creating cards */
        faces.sort(comparator);

        for (let i = 0; i < amount / 2; i++) {
            for (let j = 0; j < 2; j++) {
                cardsTemplate.push(
                    `<div class="card" onclick="choose(this)">
                        <div class="front-face face turn">
                            <img src="../images/front.png" />
                        </div>
                        <div class="back-face face hold">
                            <img src="../images/back/${faces[i]}parrot.gif" />
                        </div>
                    </div>`
                );
            }
        }

        /* sorting cards and including into the page (faces revealed) */
        cardsTemplate.sort(comparator);

        for (let i = 0; i < amount; i++) {
            main.innerHTML += cardsTemplate[i];
        }

        /* to flip the cards face down and start the timer */
        setTimeout(function () {
            const cards = main.querySelectorAll(".card");

            for (let i = 0; i < amount; i++) {
                flip(cards[i]);
            }
            
            startTimer();
        }, 1000);
    }, 100);
}

function startTimer() {
    time = 0;
    idInterval = setInterval(function () {
        time++;
        timer.innerHTML = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(idInterval);
}

function unFreeze(option) {
    const remainingCards = document.querySelectorAll(".card:not(.match)");
    
    if (option === "U") {
        for (let i = 0; i < remainingCards.length; i++) {
            remainingCards[i].setAttribute("onclick", "choose(this)");
        }
    } else if (option === "F") {
        for (let i = 0; i < remainingCards.length; i++) {
            remainingCards[i].removeAttribute("onclick");
        }
    } else {
        return;
    }
}


/* initializing game */

startGame();
