// create the format for each card
function createCard(point, suit) {
  return { point, suit };
}
// create the suit of 13 cards
function createSuitArr(suit) {
  let suitArr = [];
  for (let i = 1; i <= 13; i++) {
    suitArr.push(createCard(i, suit));
  }
  return suitArr;
}
// create the deck
function createDeck() {
  const hearts = createSuitArr("hearts");
  const spades = createSuitArr("spades");
  const clubs = createSuitArr("clubs");
  const diamonds = createSuitArr("diamonds");
  return [hearts.concat(spades, clubs, diamonds)];
}
// build the deck
const deck = createDeck();

// get deal button
const dealButton = document.querySelector("#deal-button");

// get button parent <div> class
const buttons = document.querySelector(".buttons");
// add event listener to parent <div> class = 'buttons'
buttons.addEventListener("click", function (e) {
  console.log(event.target.id);
  if (event.target.id === "deal-button") {
    renderCards(playersHand, dealCards());
    renderCards(dealersHand, dealCards());
  } else if (event.target.id === "hit-button") {
    renderCards(playersHand, hitMe());
    renderCards(dealersHand, hitMe());
  } else {
    renderCards(playersHand, hitMe(getCardImageUrl(getCard(playerScore))));
  }
});

// get hit button
const hitButton = document.querySelector("#hit-button");
// add event listener

// get the dealers hand
const dealersHand = document.querySelector("#dealer-hand");

// get players hand
const playersHand = document.querySelector("#player-hand");

// render 2 cards Deal function
function dealCards() {
  return `
    <img src="images/4_of_clubs.png" width="80px">
    <img src="./images/6_of_spades.png" width="80px">
    `;
}

// render cards to corresponding div
function renderCards(who, dealOrHit) {
  let thingToAppend = document.createElement("div");
  thingToAppend.innerHTML = dealOrHit;
  who.appendChild(thingToAppend);
}

// render 1 card Hit function
function hitMe(url) {
  return `
    <img src="${url}" width="80px">
    `;
}

// get the card Image
function getCardImageUrl(card) {
  if (card.point < 2) {
    console.log(card.suit, card.point);
    return `images/ace_of_${card.suit}.png`;
  } else if (card.point < 10) {
    console.log(card.suit, card.point);
    return `images/${card.point}_of_${card.suit}.png`;
  } else if (card.point === 11) {
    console.log(card.suit, card.point);
    return `images/jack_of_${card.suit}.png`;
  } else if (card.point === 12) {
    console.log(card.suit, card.point);
    return `images/queen_of_${card.suit}.png`;
  } else if (card.point === 13) {
    console.log(card.suit, card.point);
    return `images/king_of_${card.suit}.png`;
  }
}

const playerScore = [];
const dealerScore = [];

//player points
const playerPoints = document.querySelector("#player-points");

//dealer points
const dealerPoints = document.querySelector("#dealer-points");

// which card from the deck
// appends the card value to the score array
function getCard(who) {
  let rand = Math.floor(Math.random() * 53);
  who.push(deck[0][rand].point);
  return deck[0][rand];
}
