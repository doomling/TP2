/*
El juego de memotest deberá cumplir las siguientes consignas:

1- Tener un tablero de 12 fichas (6 pares)
2- Deben acomodarse las fichas de forma aleatoria, cada vez que se inicie un nuevo juego.
3- Al completar todos los pares mostrar un mensaje de ganó.
4- Permitir ingresar el nombre del jugador al iniciar el juego
5- Tener 24 oportunidades, si no descubre todo el tablero en esa cantidad perderá.

*/

const numberOfCards = 12;
const numberOfTypes = 3;
let turn = 1;
const chances = 24;
let position = [];

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

position = fillPositions(position);

const red = $('<div class="card card1"></div>');
const blue = $('<div class="card card2"></div>');
const green = $('<div class="card card3"></div>');

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

let cards = getCards(red, blue, green);

function setCards (arr, masterArr) {
  for (var i = 0; i < masterArr.length; i++) {
      var z = masterArr.indexOf(i);
      masterArr[z] = arr[i];
  }
  return masterArr;
}

cards = setCards(cards, position);

$('#begin').one('click', function(){
  for (var i = 0; i < cards.length; i++) {
    $('#card-container').append(cards[i]['front'].clone());
    $('.card').each(function() {
    $( this ).addClass('back');
    });
  }
});

let clicked = []
let clickedDiv = []

function match (clicked, div) {
  if (clicked.length > 1) {
    if (clicked[0]['front'] == clicked[1]['front']) {
      clicked[0]['matched'] = true;
      clicked[1]['matched'] = true;
      $(div[0]).removeClass('card')
      $(div[1]).removeClass('card')
    } else {
      $('.card').each(function() {
        $( this ).addClass('back');
      });
      clicked[0]['clicked'] = false;
      clicked[1]['clicked'] = false;
    }
    clicked.length = 0;
    div.length = 0;
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

let keepGoing = endGame(cards);

$('#card-container').on('click', '.card', function() {
    let a = $(this).index();

    if (turn <= chances && keepGoing == true) {
      if (cards[a]['clicked'] == false ) {
        $( this ).removeClass('back');
        cards[a]['clicked'] = true;
        clicked.push(cards[a]);
        clickedDiv.push( this );
        match(clicked, clickedDiv);
        turn++;
        $('#turnos').html(turn);
        if (turn > chances) {
          $('#status').append('<h1>lo siento mucho, se terminaron tus turnos</h1>');
       }
      }
      keepGoing = endGame(cards);
      if (turn < chances && keepGoing == false) {
        $('#status').append('<h1> G A N A S T E </h1>');
      }
      }
  });
