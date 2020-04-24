// to do list //
// deal animations

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
let deck = createDeck();

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

// get modalContent
const modalContent = document.querySelector("#modalContent");

// add event listener to parent <div> class = 'buttons'
buttons.addEventListener("click", function (e) {
  if (event.target.id === "deal-button") {
    // deal button
    renderCards(playersHand, hitMe(getCard(playerScore)));
    renderCards(playersHand, hitMe(getCard(playerScore)));
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
    playerPoints.textContent = sum(playerScore); // only sums for dealer, need to add argument
    dealerPoints.textContent = sum(dealerScore); // only sums for dealer, need to add argument
  } else if (event.target.id === "hit-button") {
    //hit button
    renderCards(playersHand, hitMe(getCard(playerScore)));
    playerPoints.textContent = sum(playerScore);
  } else {
    // stay button
    renderCards(dealersHand, hitMe(getCard(dealerScore)));
    dealerPoints.textContent = sum(dealerScore);
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
    <img src="${url}" width="80px">
    `;
}

// get the card Image
function getCardImageUrl(card) {
  if (card.point < 2) {
    console.log(card.point + "ace");
    return `images/ace_of_${card.suit}.png`;
  } else if (card.point <= 10) {
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
  const rand = Math.floor(Math.random() * deck[0].length);
  console.log("random number" + [rand]);
  addToScore(who, deck[0][rand]);
  const cardImage = getCardImageUrl(deck[0][rand]);
  deck[0] = deck[0].filter((cardObject) => cardObject != deck[0][rand]);
  return cardImage;
}

// add card points to score
function addToScore(who, card) {
  console.log(`${card.point} added to ${who}`);
  who.push(card.point);
}

const playerScore = [];
const dealerScore = [];

//player points
const playerPoints = document.querySelector("#player-points");

// sum points function
function sum(who) {
  if (who === dealerScore) {
    let sum = dealerScore.reduce((acc, val) => acc + val, 0);
    console.log(`dealer ${sum} is sum`);
    if (sum === 21) {
      refresh();
      modalContent.textContent = "BlackJack Dealer Wins!";
      return "BlackJack - Dealer Wins!";
    } else if (sum > 21) {
      refresh();
      modalContent.textContent = "Dealer Bust! You Win!";
      return `${sum} Bust!`;
    } else {
      return sum;
    }
  } else {
    let sum = playerScore.reduce((acc, val) => acc + val, 0);
    console.log(`player ${sum} is sum`);
    if (sum === 21) {
      refresh();
      modalContent.textContent = "BlackJack You Win!";
      return "BlackJack - You Win!";
    } else if (sum > 21) {
      refresh();
      modalContent.textContent = "Bust! Dealer Wins!";
      return `${sum} Bust!`;
    } else {
      return sum;
    }
  }
}
// refresh function for when the someone has won
function refresh() {
  console.log("timeout");
  setTimeout(location.reload.bind(window.location), 3000);
  $("#exampleModalCenter").modal("show");
}
//dealer points
const dealerPoints = document.querySelector("#dealer-points");
const sumDealer = dealerScore.reduce((acc, val) => acc + val, 0);
