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