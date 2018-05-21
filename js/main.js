/* original requirements ->

El juego de memotest deberá cumplir las siguientes consignas:

1- Tener un tablero de 12 fichas (6 pares)
2- Deben acomodarse las fichas de forma aleatoria, cada vez que se inicie un nuevo juego.
3- Al completar todos los pares mostrar un mensaje de ganó.
4- Permitir ingresar el nombre del jugador al iniciar el juego
5- Tener 24 oportunidades, si no descubre todo el tablero en esa cantidad perderá.

*/

/* there are a lot of comments in my code, and it's all in English
because a guy I really admire once told me I should **ONLY** document in said language.

Feel free to imagine
it's narrated by Morgan Freeman */

/* Initial setup */

const numberOfCards = 12;
const numberOfTypes = 3;
let turn = 1;
const chances = 24;
let position = [];

/* function for filling am array with random numbers */

function fillPositions(array) {
  let random = Math.floor(Math.random() * numberOfCards);
  while (array.length < numberOfCards) {
    if (array.indexOf(random) == -1) {
      array.push(random);
      }
    random = Math.floor(Math.random() * numberOfCards);
  }
  return array;
}

/* seting up my cards in an ordered array */

const card1 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/ada-lovelace.jpg">');
const card2 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/grace-hopper.jpg">');
const card3 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/chien-s.png">');

function getCards(type1, type2, type3) {

  let arr = [];
  for (var i = 0; i < numberOfCards; i++) {
    if (i <= numberOfTypes) {
      arr[i] = Object.assign({}, {front: type1, clicked: false, matched: false});
    }
    else if (i >= numberOfTypes && i <= numberOfTypes * 2 + 1) {
      arr[i] = Object.assign({}, {front: type2, clicked: false, matched: false});
    }
    else {
      arr[i] = Object.assign({}, {front: type3, clicked: false, matched: false});
    }
  }
  return arr;
}

function setCards (arr, masterArr) {
  for (var i = 0; i < masterArr.length; i++) {
      var z = masterArr.indexOf(i);
      masterArr[z] = arr[i];
  }
  return masterArr;
}

/* so here we'll create a random array filled with numbers */

position = fillPositions(position);

/* and here we declare an ordered array filled with cards */

let cards = getCards(card1, card2, card3);

/* and now we shuffle */

cards = setCards(cards, position);

/* END INITIAL SETUP */

/* Appending the cards to the page container */

$('#begin').one('click', function(){
  let name = $('#name').val();
  $('#name').html(name);
  $('#container').removeClass('invisible');

    for (var i = 0; i < cards.length; i++) {
      $('#container').append(cards[i]['front'].clone());
    }

  });

/* some functions to check if cards match and if there are
any unmatched left */

function match (clicked) {
    if (clicked[0]['front'] == clicked[1]['front']) {
      return true;
    } else {
      return false;
    }
  }

function endGame (cards) {
  let cont = false;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i]['matched'] != true) {
      cont = true;
    }
  }
  return cont;
}

// let the game begin //

/* we'll save both the object and the clicked elements in separate arrays
I know I could have done this with a variable and $this but it feels easier
to read when done this way */

let clicked = [];
let clickedDiv = [];
let keepGoing = endGame(cards);

$(document).on('click', '.card', function() {

    /* Using the index of the clicked element should give me the index
    of my desired object.

    I'm pretty sure I could have done the comparision using just css classes
    but objects feel... cleaner
    */

    let index = $(this).index();

    /* so, this should only work while turn is less or = to 24, and there are still unmatched
    cards in the board. It should also prevent users from clicking on a card while it's shuffled */

    if (turn <= chances && keepGoing == true && $( this ).hasClass('clicked-card') == false) {

      if (cards[index]['clicked'] == false ) {
      $( this ).addClass('flip').addClass('flipped');
      cards[index]['clicked'] = true;

        /* We need to save both the object and its corresponding
        div */

        clicked.push(cards[index]);
        clickedDiv.push( this );

          if (clicked.length > 1) {

            if (match(clicked) == true) {
              clicked[0]['matched'] = true;
              clicked[1]['matched'] = true;
              $(clickedDiv[0]).removeClass('card').addClass('clicked-card').removeClass('flipped');
              $(clickedDiv[1]).removeClass('card').addClass('clicked-card').removeClass('flipped');
            }

            else {

        /* cards that are not a match need to be flipped back */

              setTimeout(function() {
                $('.flipped').removeClass('flip').removeClass('flipped').removeClass('clicked-card');
              }, 600);

        /*let's take advantage of javascript's way of handling memory references
        and let's set our objects from this array instead of the original one */

              clicked[0]['clicked'] = false;
              clicked[1]['clicked'] = false;
            }

        /* and we clean up all of our arrays */

          clicked = [];
          clickedDiv = [];
          turn++;
          $('#turnos').html(turn);
          keepGoing = endGame(cards);
          }
        }
      }

      /* win / lose modals */

      if (turn <= chances && keepGoing == false) {
        $('#status').removeClass('hidden').addClass('status');
        $('#message').html('ganaste!');
      }

      if (turn > chances) {
        $('#status').removeClass('hidden').addClass('status')
        $('#message').html('perdiste');
      }
  });

    /* reload the page if user wants to retry */

$('#retry').on('click', function(){
  window.location.reload(true);
});

/* Thanks for taking the time to read my code, I had a blast coding it and sincerly
 hope it wasn't too filled
 with bad decisions */
