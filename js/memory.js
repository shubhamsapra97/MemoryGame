var board = document.getElementById('board');
var Moves = document.getElementsByClassName('moves');
var resultModal = document.getElementById('winModal');
var Timer = document.getElementById('Timer');
var star1 = document.getElementsByClassName('star1');
var star2 = document.getElementsByClassName('star2');
var star3 = document.getElementsByClassName('star3');
var restart1 = document.getElementById('restart1');
var restart2 = document.getElementById('restart2');

var i = 0,    
    moves = 0,
    combo = 0,
    time = 0,
    mins = 0,
    secs = 0,
    tempArray = [],
    tempIdArray = [];

//Main Function.
var init = function() {
    // Hidden Cards Array.
    var cards1 = ['images/3.png', 'images/3.png', 'images/4.jpg', 'images/4.jpg', 'images/5.jpg', 'images/5.jpg', 'images/6.png', 'images/6.png', 'images/8.png', 'images/8.png', 'images/9.jpg', 'images/9.jpg', 'images/11.jpg', 'images/11.jpg', 'images/13.jpg', 'images/13.jpg'];

    //For shuffled Cards.
    var shuffledCards = [];

    var cards = shuffle(cards1, shuffledCards);
    render(cards);
};

//Shuffle Cards Function.
var shuffle = function(cards, shuffledCards) {
    while (shuffledCards.length < cards.length) {
        var randomNum = Math.floor(Math.random() * cards.length);
        if (cards[randomNum]) {
            shuffledCards.push(cards[randomNum]);
            cards[randomNum] = false;
        }
    }
    return shuffledCards;
};

//Render Cards on Screen.
var render = function(cards, imageArray) {
    var output = '',
        idCount = 0;
    for (var i = 0; i < 16; i++) {
        output += '<div id=' + idCount + ' class="animated hello col-xs-3 col-md-3 col-sm-3"><img id="card_' + idCount + '" class="cardy1 img-responsive" src=' + "images/12.png" + ' onclick="flipCard(' + idCount + ',\'' + cards[idCount] + '\')"></div>';
        idCount++;
    }
    board.innerHTML = output;
};

//Show Hidden Card Function on click.
var flipCard = function(id, Cardy) {
    //Show Hidden Card.
    if (tempArray.length <= 1) {
        moves += 1;

        //Start TIMER on First Click.
        if (moves == 8) {
            TimeElapsed();
        }

        //Display the Hidden Face of Card.
        document.getElementById(id).innerHTML = " ";
        document.getElementById(id).innerHTML = '<img class="cardy1 animated img-responsive" src=' + Cardy + '>';
        tempArray.push(Cardy);
        tempIdArray.push(id);
    }
    //Basic Functionality
    if (tempArray.length == 2) {
        for(i=0;i<Moves.length;i++){
            Moves[i].innerHTML = (moves / 2);    
        }
        RemoveStars();
        displayStars(moves / 2);
        setTimeout(Functionality, 700);
    }
};

//Matching the Cards in Array.
function Functionality() {
    if (tempArray[0] !== tempArray[1] && tempIdArray[0] !== tempIdArray[1]) {
        for (var i = 0; i < 2; i++) {
            document.getElementById(tempIdArray[i]).innerHTML = " ";
            document.getElementById(tempIdArray[i]).innerHTML = '<img id="card_' + tempIdArray[i] + '" class="cardy1 img-responsive" src="images/12.png" onclick="flipCard(' + tempIdArray[i] + ',\'' + tempArray[i] + '\')">';
        }
    }
    //Result Calculation.
    if (tempArray[0] === tempArray[1] && tempArray.length !== 0) {
        combo++;
        if (combo == 1) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = time;
            displayStars(moves / 2);
            setTimeout(function() {
                resultModal.style.display = 'block';
            }, 100);
        }
    }
    tempArray = [];
    tempIdArray = [];
}

//Timer Function.
var TimeElapsed = function() {

    var startTime = new Date().getTime();

    timer = setInterval(function() {
        var now = new Date().getTime();
        var TimeElapsed = now - startTime;

        var min = Math.floor((TimeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((TimeElapsed % (1000 * 60)) / 1000);

        if (sec < 10) {
            sec = "0" + sec;
        }

        var currentTime = min + ':' + sec;

        Timer.innerHTML = currentTime;
        time = Timer.innerHTML;
        mins = min;
        secs = sec;
    }, 700);

};

//Calculate No of Stars Based on Time Taken.
function displayStars(moves) {
    if (moves <= 10) {

        for (i = 0; i < star1.length; i++) {
            star1[i].classList.remove('fa-star-o');
            star2[i].classList.remove('fa-star-o');
            star3[i].classList.remove('fa-star-o');
            star1[i].classList.add('fa-star');
            star2[i].classList.add('fa-star');
            star3[i].classList.add('fa-star');
        }

    } else if (moves >= 11 && moves <= 20) {

        for (i = 0; i < star1.length; i++) {
            star1[i].classList.remove('fa-star-o');
            star2[i].classList.remove('fa-star-o');
            star1[i].classList.add('fa-star');
            star2[i].classList.add('fa-star');
        }

    } else if (moves > 20) {

        for (i = 0; i < star1.length; i++) {
            star1[i].classList.remove('fa-star-o');
            star1[i].classList.add('fa-star');
        }

    }
}

//Remove Stars Function
function RemoveStars() {
    for (i = 0; i < star1.length; i++) {
        star1[i].classList.remove('fa-star');
        star2[i].classList.remove('fa-star');
        star3[i].classList.remove('fa-star');
        star1[i].classList.add('fa-star-o');
        star2[i].classList.add('fa-star-o');
        star3[i].classList.add('fa-star-o');
    }
}

//Restart Game Functionality.
restart1.addEventListener('click', function() {
    window.location.reload();
});

restart2.addEventListener('click', function() {
    window.location.reload();
});

//Main Function Called
init();