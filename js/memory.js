//var Game = {
//  
//    init : function(){
//        var cards = ['A' , 'A' , 'B' , 'B' , 'C' , 'C' , 'D' , 'D' , 'E' , 'E' , 'F' , 'F', 'G' , 'G' , 'H' , 'H'];
//        var shuffledArray = [];
//        shuffleCards(cards);
//    },
//    
//    shuffleCards : function(cards){
//      while (shuffledCards.length < cards.length) {
//          // Random value between 0 and cards.length - 1
//          randomIndex  = Math.floor(Math.random() * cards.length);
//          // If element isn't false, add element to shuffled deck
//          if(cards[randomIndex]) {
//            // Add new element to shuffle deck
//            shuffledCards.push(cards[randomIndex]);
//            // Set element to false to avoid being reused
//            cards[randomIndex] = false;
//          }
//        }
//        cards = shuffledCards;
//        render(cards);
//    },
//    
//    render : function(cards){
//        for(var i=0;i<cards.length;i++){
//            output += "<div id='card' class='cardy'>" + cards[i] +"</div>"
//            console.log(cards[i]);
//        }
//        document.getElementById('board').innerHTML = output;
//    }
//    
//};

var init = function(){
    var cards1 = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
    var imageArray = ['images/apple.jpg' , 'images/hp.png' , 'images/dell.jpg'];
    var shuffledCards = [];
    
    var cards = shuffle(cards1 , shuffledCards);
    render1(cards,imageArray);
    
//    for (var j = 0; j < cards.length; j++) {
//        if (typeof window.addEventListener === 'function'){
//            (function(card) {
//                cards[j].addEventListener('click', function() {
////                    output += "<div id='card' class='cardy'>" + cards[j] +"</div>"
//                    alert(this);
//                });
//            })(cards[j]);
//        }
//    }
//};
}

var shuffle = function(cards , shuffledCards){
    while (shuffledCards.length < cards.length) {
        // Random value between 0 and cards.length - 1
         randomIndex  = Math.floor(Math.random() * cards.length);
        // If element isn't false, add element to shuffled deck
         if(cards[randomIndex]) {
            // Add new element to shuffle deck
             
            shuffledCards.push(cards[randomIndex]);
            // Set element to false to avoid being reused
            cards[randomIndex] = false;
         }
    }
    return shuffledCards;
//    render(cards);
};

//var render = function(cards){
//    var output='';
//    for(var i=0;i<cards.length;i++){
//      output += "<div id='card' class='cardy'>" + cards[i] +"</div>"
//    }
//  document.getElementById('board').innerHTML = output;
//};

var render1 = function(cards,imageArray){
    var output = '',idCount=0;
    for(var i=0;i<5;i++){
        for(var j=0;j<imageArray.length;j++){
//        output += "<img id='card_"+idCount+"' class='cardy1' src='" + imag[j] +"' onclick='flipCard("+idCount+","+cards[idCount]+")'>"; 
        output += '<div id='+idCount+'><img id="card_'+idCount+'" class="cardy1" src='+imageArray[j]+' onclick="flipCard('+idCount+',\''+cards[idCount]+'\')"></div>';   
        idCount++;
        }      
    }
    output += '<div id="15"><img id="card_15" class="cardy1" src='+imageArray[0]+' onclick="flipCard('+15+',\''+cards[15]+'\')"></div>'; 
    document.getElementById('board').innerHTML = output;
};

var flipCard = function(id,Cardy){
    var card_id = 'card_'+id;
//        alert(card_id);
    document.getElementById(id).innerHTML = " ";
    document.getElementById(id).innerHTML = "<div id='card' class='cardy'>"+Cardy+"</div>";
};

init();

