/*
 * The list that holds all of your cards
 */
let cardList = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb",
                "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

/*
 * Displaying the cards on the page
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
 window.addEventListener("load", startTime());

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
 * General variables to use later
 * Initial values of them
 */

 var card = document.getElementsByClassName("card");
 var openCards = [];
 var matchedCards = [];
 var messageMoves = document.querySelector(".messageMoves");
 messageMoves.innerHTML = 0;
 var messageRating = document.querySelector(".messageRating");
 var time = document.querySelector(".time");
 time.innerHTML = 0;
 var messageButton = document.querySelector(".messageButton");
 var moves = document.querySelector(".moves");
 moves.innerHTML = 0;

 /*
  * Is the game finished?
  */

 function isFinished(){
   if(matchedCards.length === 2){
     var message = document.getElementById("message");
     message.style.display = "block";
     stopTime();
   }
 };

 /*
  * Play again!
  */

 function playAgain(){
    location.reload();
 };

 /*
  * Rating functionality
  * Stars will decrease at some points
  */

 function starRating(){
   if(moves.innerHTML == 4){
     document.querySelector(".star-3").style.visibility = "hidden";
     messageRating.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
   } if(moves.innerHTML == 10){
     document.querySelector(".star-2").style.visibility = "hidden";
     messageRating.innerHTML = '<i class="fa fa-star"></i>';
   }
 };

 /*
  * Playing time value
  * Start and stop functions for this time value
  */

var playTime;

function startTime(){
    var messageTime = document.querySelector(".messageTime");
    messageTime.innerHTML = 0;
    playTime = setInterval(function(){
      messageTime.innerHTML++;
      time.innerHTML++;
    }, 1000);
  };

function stopTime(){
    clearInterval(playTime);
  };

  /*
   * Adding opened cards to an array
   * Determining the selection as true or false
   */

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

 /*
  * Matched cards!
  */

 function trueSelection(){
   openCards[0].classList.add("match", "cannotSelect");
   openCards[1].classList.add("match", "cannotSelect");
   openCards[1].classList.remove("show", "open");
   openCards[0].classList.remove("show", "open");
   matchedCards.push(openCards[0]);
   matchedCards.push(openCards[1]);
   openCards = [];
   moves.innerHTML++;
   messageMoves.innerHTML++;
   starRating();
   isFinished();
 };

 /*
  * Unmatched cards:(
  */

 function falseSelection(){
   openCards[0].classList.add("red");
   openCards[1].classList.add("red");
    setTimeout(function(){
      openCards[0].classList.remove("show", "open", "cannotSelect", "red");
      openCards[1].classList.remove("show", "open", "cannotSelect", "red");
      openCards = [];
      moves.innerHTML++;
      messageMoves.innerHTML++;
      starRating();
    },550);
};

/*
 * Showing the card with clicking
 * But avoiding selecting more than two cards
 */

 var showCard = function(){
   if(document.querySelectorAll(".open").length === 2){
     return false;
  }
     this.classList.add("open", "show", "cannotSelect");
 };

 /*
  * Event listeners for the cards with clicking
  */

 for (var i=0; i < card.length; i++) {
     card[i].addEventListener("click", showCard);
     card[i].addEventListener("click", addOpenCards);
 }
