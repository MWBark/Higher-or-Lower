/*jshint esversion: 6 */ 

// Wait for the DOM to finish loading 
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {

    playBtn = document.getElementById('play-game');
    gameArea = document.getElementById('game-area');

    playBtn.addEventListener('click', function() {
        
        gameArea.innerHTML =`
        <div id="cardValue"></div>

        <div id="user-area">

            <div id="user-score">
                <p>Current Score: <span id="currentScore">0</span></p>
                <p>High Score: <span id="high-score">0</span></p>
            </div>

            <div id="user-input">
                <button id="higherBtn">Higher</button>
                <button id="lowerBtn">Lower</button>
            </div>
        </div>
        
        <div id="drawn-cards"></div>
        `;

        let higherBtn = document.getElementById('higherBtn');
        let lowerBtn = document.getElementById('lowerBtn');

        higherBtn.addEventListener('click', () => checkGuess(true));
        lowerBtn.addEventListener('click', () => checkGuess(false));

        let cardValueElement = document.getElementById('cardValue');
        let currentScoreElement = document.getElementById('currentScore');
        let highScoreElement = document.getElementById('high-score');
        let drawnCardsElement = document.getElementById('drawn-cards');

        // Initial game state
        let drawPile = [];
        draw();
        displayCard();
        displayDrawPile();

        let currentScore = 0;
        let highScore = "";

        if (localStorage.getItem("highScore") === "null") {

            highScore = 0;

        } else {
            
            highScore = localStorage.getItem("highScore");
        }

        updateScores();

        /**
         * Splice a random card out of the deck
         * Put it as the first index of the 'drawPile' array
         */
        function draw() {

            if (deck.length === 0) {

                alert("No more cards in deck! Starting a new game.");
            } else {

                let randomCard = Math.floor(Math.random() * deck.length);
                let drawnCard = deck.splice(randomCard, 1)[0];
                drawPile.unshift(drawnCard);
            }
        }

        /**
         * Display the first card object in the 'drawPile' array
         */
        function displayCard() {

            cardValueElement.innerHTML = drawPile[0].pic;
        }

        /**
         * Displays the 'initials' of card objects in 'drawPile' in 'drawnCardsElement'
         */
        function displayDrawPile() {

            for (i = 0; i < drawPile.length; i++) {
                drawnCardsElement.innerText += drawPile[i].initials;
            }
        }

        /**
         * Check's the user's guess 
         */
        function checkGuess(isHigher) {

            draw();
            let currentCard = drawPile[0];
            let previousCard = drawPile[1];
            let currentCardValue = currentCard.value;
            let previousCardValue = previousCard.value;

            if ((isHigher && currentCardValue > previousCardValue) || (!isHigher && currentCardValue < previousCardValue)) {
                // Correct guess
                currentScore++;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                if (deck.length === 0) {

                    alert("WOW! You beat the game! :D");
                    newGame();
                }
            } else {
                // Incorrect guess
                currentScore = 0;
                newGame();
            }
            displayCard();
            drawnCardsElement.innerText = "";
            displayDrawPile();
            updateScores();
        }

        /**
         * Returns all but first index of drawPile array back into deck array
         */
        function newGame() {

            let returnCards = drawPile.splice(1, drawPile.length);
            deck.push(...returnCards);
            drawPile.length = 1;
        }

        /**
         * Udates current score and high score
         */
        function updateScores() {
    
            currentScoreElement.textContent = currentScore;

            if (typeof(Storage) !== "undefined") {

                localStorage.setItem("highScore", highScore);
                highScoreElement.textContent = localStorage.getItem("highScore");
            } else {

                highScoreElement.textContent = highScore;
            }
        }
    });
});

// Create card objects with 'name' and 'value'
// Put into 'deck' array
let suits = ["spades", "diamonds", "clubs", "hearts"];
let faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

let firstInitials = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let secondInitials = ["♠", "♦", "♣", "♥"];


let deck = [];

for (let suit of suits) {
    for (let face of faces) {

        let card = {
            name: `${face} of ${suit}`,
            pic: `<img src="assets/images/playing-cards/${face}-of-${suit}.png" alt="${face} of ${suit}">`,
            initials: ` ${firstInitials[faces.indexOf(face)]}${secondInitials[suits.indexOf(suit)]} `
        };

        if (face === "ace") {
            card.value = 14;
        } else if (face === "king") {
            card.value = 13;
        }else if (face === "queen") {
            card.value = 12;
        } else if (face === "jack") {
            card.value = 11;
        } else {
            card.value = parseInt(face);
        }

        deck.push(card);
    }
}
