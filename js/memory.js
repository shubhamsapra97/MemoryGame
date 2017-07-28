var board = document.getElementById('board');
var Moves = document.getElementById('moves');
var resultModal = document.getElementById('winModal');
var Timer = document.getElementById('Timer');
var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');
var restart1 = document.getElementById('restart1');
var restart2 = document.getElementById('restart2');

var counter = 0, tempArray = [], tempIdArray = [], moves = 0, combo = 0, time = 0, mins = 0, secs = 0;

//Main Function.
var init = function() {
    // Hidden Cards Array.
    var cards1 = ['images/3.png', 'images/3.png', 'images/4.jpg', 'images/4.jpg', 'images/5.jpg', 'images/5.jpg', 'images/6.png', 'images/6.png', 'images/8.png', 'images/8.png', 'images/9.jpg', 'images/9.jpg', 'images/11.jpg', 'images/11.jpg', 'images/13.jpg', 'images/13.jpg'];
    
    //For shuffled Cards.
    var shuffledCards = [];
    
    var cards = shuffle(cards1, shuffledCards);
    render(cards);
}

//Shuffle Cards Function.
var shuffle = function(cards, shuffledCards) {
    while (shuffledCards.length < cards.length) {
        randomNum = Math.floor(Math.random() * cards.length);
        if (cards[randomNum]) {
            shuffledCards.push(cards[randomNum]);
            cards[randomNum] = false;
        }
    }
    return shuffledCards;
};

//Render Cards on Screen.
var render = function(cards, imageArray) {
    var output = '',idCount = 0;
    TimeElapsed();
    for (var i = 0; i < 16; i++) {
        output += '<div id=' + idCount + '><img id="card_' + idCount + '" class="cardy1" src=' + "images/12.png" + ' onclick="flipCard(' + idCount + ',\'' + cards[idCount] + '\')"></div>';
        idCount++;
    }
    board.innerHTML = output;
};

//Show Hidden Card Function on click.
var flipCard = function(id, Cardy) {
    
    //Show Hidden Card.
    if (tempArray.length <= 1) {
        moves += 1;
        Moves.innerHTML = moves;
        document.getElementById(id).className = "card card123";
        document.getElementById(id).innerHTML = " ";
        document.getElementById(id).innerHTML = '<img class="cardy1" src=' + Cardy + '>';
        tempArray.push(Cardy);
        tempIdArray.push(id);
    }
    //Matching the Cards.
    if (tempArray.length == 2) {
        function original() {
            if (tempArray[0] !== tempArray[1] && tempIdArray[0] !== tempIdArray[1]) {
                for (var i = 0; i < 2; i++) {
                    document.getElementById(tempIdArray[i]).innerHTML = " ";
                    document.getElementById(tempIdArray[i]).innerHTML = '<img id="card_' + tempIdArray[i] + '" class="cardy1 front" src="images/12.png" onclick="flipCard(' + tempIdArray[i] + ',\'' + tempArray[i] + '\')">';
                }
            }
            //Result Calculation.
            if (tempArray[0] === tempArray[1] && tempArray.length !== 0) {
                combo++;
                if (combo == 8) {
                    clearInterval(timer);
                    document.getElementById('timer').innerHTML = time;
                    displayStars(mins, secs);
                    setTimeout(function() {
                        resultModal.style.display = 'block';
                    }, 100);
                }
            }
            tempArray = [];
            tempIdArray = [];
            imageArray = [];
        }
        setTimeout(original, 700);
    }
};

//Timer Function.
const TimeElapsed = function() {
    
    var startTime = new Date().getTime();
    
    timer = setInterval(function() {
        var now = new Date().getTime();
        var TimeElapsed = now - startTime;

        var min = Math.floor((TimeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((TimeElapsed % (1000 * 60)) / 1000);

        if (sec < 10) {
            sec = "0" + sec;
        }

        let currentTime = min + ':' + sec;

        Timer.innerHTML = currentTime;
        time = Timer.innerHTML;
        mins = min;
        secs = sec;
    }, 700);

};

//Calculate No of Stars Based on Time Taken.
function displayStars(mins, secs) {
    if (mins == 0 && secs <= 30) {
        
        star1.classList.remove('fa-star-o');
        star2.classList.remove('fa-star-o');
        star3.classList.remove('fa-star-o');
        star1.classList.add('fa-star');
        star2.classList.add('fa-star');
        star3.classList.add('fa-star');
        
    } else if (mins < 1 && secs > 30) {
        
        star1.classList.remove('fa-star-o');
        star2.classList.remove('fa-star-o');
        star1.classList.add('fa-star');
        star2.classList.add('fa-star');
        
    } else if (mins >= 1) {
        
        star1.classList.remove('fa-star-o');
        star1.classList.add('fa-star');
        
    }
};

//Restart Game Functionality.
restart1.addEventListener('click', function() {
    window.location.reload();
});

restart2.addEventListener('click', function() {
    window.location.reload();
});

//Main Function Called
init();
