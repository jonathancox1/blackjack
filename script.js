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

// get hit button
const hitButton = document.querySelector("#hit-button");
// add event listener

// get the dealers hand
const dealersHand = document.querySelector("#dealer-hand");

// get players hand
const playersHand = document.querySelector("#player-hand");

// get button parent <div> class
const buttons = document.querySelector(".buttons");
// add event listener to parent <div> class = 'buttons'
buttons.addEventListener("click", function (e) {
  if (event.target.id === "deal-button") {
    renderCards(playersHand, hitMe(getCard(playerScore)));
    renderCards(playersHand, hitMe(getCard(playerScore)));
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
  } else if (event.target.id === "hit-button") {
    renderCards(playersHand, hitMe(getCard(playerScore)));
  } else {
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
    console.log(dealerScore);
    console.log(playerScore);
  }
});

// render cards to corresponding div
function renderCards(who, dealOrHit) {
  let thingToAppend = document.createElement("div");
  thingToAppend.innerHTML = dealOrHit;
  who.appendChild(thingToAppend);
}

// render 1 card Hit function
function hitMe(url) {
  return `
    <img src="${url}" width="80px" stye="padding: 0px 20px 0px 20px;">
    `;
}

// get the card Image
function getCardImageUrl(card) {
  if (card.point < 2) {
    console.log(card.point + "ace");
    return `images/ace_of_${card.suit}.png`;
  } else if (card.point < 10) {
    console.log(card.point + "point");
    return `images/${card.point}_of_${card.suit}.png`;
  } else if (card.point === 11) {
    console.log(card.point + "jack");
    return `images/jack_of_${card.suit}.png`;
  } else if (card.point === 12) {
    console.log(card.point + "queen");
    return `images/queen_of_${card.suit}.png`;
  } else if (card.point === 13) {
    console.log(card.point + "king");
    return `images/king_of_${card.suit}.png`;
  }
}

// which card from the deck
// appends the card value to the score array
function getCard(who) {
  let rand = Math.floor(Math.random() * (deck[0].length - 1));
  console.log("random number" + [rand]);
  // let removed = deck[0].splice(rand);
  // console.log(removed);
  return getCardImageUrl(deck[0][rand]);
}

// // remove from the deck
// function removeFromDeck(card) {
//   console.log(card);
//   delete deck.card;
// }

const playerScore = [];
const dealerScore = [];

//player points
const playerPoints = document.querySelector("#player-points");

// sum points function
function sumPlayer() {
  let sum = 0;
  for (let i = 0; i < playerScore.length; i++) {
    sum += playerScore[i];
  }
  let string = sum.toString();
  return string;
}
playerPoints.textContent = sumPlayer();

//dealer points
const dealerPoints = document.querySelector("#dealer-points");
const sumDealer = dealerScore.reduce((acc, val) => acc + val, 0);
dealerPoints.textContent = sumDealer;
