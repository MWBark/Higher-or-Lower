// Wait for the DOM to finish loading 
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let higherBtn = document.getElementById('higherBtn');
    let lowerBtn = document.getElementById('lowerBtn');

    higherBtn.addEventListener('click', () => checkGuess(true));
    lowerBtn.addEventListener('click', () => checkGuess(false));
})

let cardValueElement = document.getElementById('cardValue');
let currentScoreElement = document.getElementById('currentScore');
let highScoreElement = document.getElementById('highScore');

// Create card objects with 'name' and 'value'
// Put into 'deck' array
let suits = ["spades", "diamonds", "clubs", "hearts"];
let faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

let deck = [];

for (let suit of suits) {
    for (let face of faces) {
        let card = {
            name: `${face} of ${suit}`
        };

        if (face === "A") {
            card.value = 14;
        } else if (face === "K") {
            card.value = 13;
        }else if (face === "Q") {
            card.value = 12;
        } else if (face === "J") {
            card.value = 11;
        } else {
            card.value = parseInt(face);
        }

        deck.push(card);
    }
}

let drawPile = []
draw()

/**
 * Splice a random card out of the deck
 * Put it as the first index of the 'drawPile' array
 */
function draw() {
    let randomCard = Math.floor(Math.random() * deck.length);
    let drawnCard = deck.splice(randomCard, 1)[0];
    drawPile.unshift(drawnCard);
}
