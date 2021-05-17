const db = require('./connection');

const suits = ["Spade", "Diamond", "Club", "Heart"];
const rank = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
];

function createDeck() {
    // empty deck to contain cards
    let deck = [];

    // create deck
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < rank.length; j++) {
            let card = { Rank: rank[j], Suit: suits[i] };
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

const cardsSetup = (card_id, rank, suite) => {
    var cardsDeck = createDeck();
    shuffleDeck(cardsDeck);

    var counter = 0;

    for (var i = 0; i < 52; i++) {
        var query = "INSERT INTO cards (card_id, rank, suite) VALUES ("+i+", "+cardsDeck[i].Rank+", "+cardsDeck[i].Suit+")";
    }
}

module.exports = {cardsSetup};