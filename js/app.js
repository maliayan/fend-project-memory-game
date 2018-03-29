/*
 * Create a list that holds all of your cards
 */
let cardList = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb",
                "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function createCardDeck(){
   var deckHtmlContent = '';
   cardList = shuffle(cardList);
   for(var i=0; i<cardList.length; i++){
     deckHtmlContent += "<li class='card'><i class='fa fa-" + cardList[i] + "'></i></li>";
   }
   document.querySelector('.deck').innerHTML = deckHtmlContent;
 };

 window.addEventListener("load", createCardDeck());

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 var card = document.getElementsByClassName("card");
 var openCards = [];
 var matchedCards = [];
 var messageMoves = document.querySelector(".messageMoves");
 messageMoves.innerHTML = 0;

 function isFinished(){
   if(matchedCards.length === 2){
     var message = document.getElementById("message");
     message.style.display = "block";
   }
 };

 var moves = document.querySelector(".moves");
 moves.innerHTML = 0;

 var addOpenCards = function(){
   openCards.push(this);
   if(openCards.length === 2){
     if(openCards[0].innerHTML === openCards[1].innerHTML){
       trueSelection();
     } else {
       falseSelection();
     }
   }
 };

 function trueSelection(){
   openCards[0].classList.add("match");
   openCards[1].classList.add("match");
   openCards[1].classList.remove("show", "open");
   openCards[0].classList.remove("show", "open");
   matchedCards.push(openCards[0]);
   matchedCards.push(openCards[1]);
   openCards = [];
   moves.innerHTML++;
   messageMoves.innerHTML++;
   isFinished();
 };

 function falseSelection(){
    setTimeout(function(){
        openCards[0].classList.remove("show", "open");
        openCards[1].classList.remove("show", "open");
        openCards = [];
        moves.innerHTML++;
        messageMoves.innerHTML++;
    },550);
};

 var showCard = function(){
     this.classList.add("open", "show");
 };

 for (var i=0; i < card.length; i++) {
     card[i].addEventListener("click", showCard);
     card[i].addEventListener("click", addOpenCards);
 }
