
//variables initialization and declaration 
let cells=$(".cell");
let displayPlayer=$(".display-player");
let alert=$(".win-page");
let restart=$("#restart-btn");
let board=['','','','','','','','',''];
let currentPlayer='X';
const PLAYERX_WON='PLAYERX_WON';
const PLAYERO_WON='PLAYERO_WON';
const TIE='TIE';
//create a winning combo: vertical,horizontal and diagonal.
const winCombo=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let winPage=function(type) {
    switch(type){
        case PLAYERO_WON:
            alert.html=`Player <span class="playerO">O</span> Won. Click Restart button to play again`;
            break;
        case PLAYERX_WON:
            alert.html=`Player <span class="playerX">X</span> Won. Click Restart button to play again`;
            break;
        case TIE:
            alert.html=`It's a TIE. Click Restart button to play again`
    }
    alert.removeClass("hide");
}

//this function is to change the player between X and O
let changePlayer=function(){
    displayPlayer.removeClass(`player${currentPlayer}`);//not overriding the colour of the span.
    if(currentPlayer==='X'){
        currentPlayer="O"         
    }else if(currentPlayer==='O'){
        currentPlayer='X'
    }
    displayPlayer.html(currentPlayer);//change the span of whose turn it is. 
    displayPlayer.addClass(`player${currentPlayer}`);//add an additional class in order to change the colour of the span. 
}

let playGame=function(index,cell){
    $(cell).html(currentPlayer);
    $(cell).css({"font-size":"3em","font-family":"lobster","justify-content":"center","align-content":"center","display":"flex"}),
    $(cell).addClass(`player${currentPlayer}`);
    console.log(index);
    // newBoard(index);
    changePlayer();
};
let notAllowed=function(index,cell){
    if($(cell).is(':empty')){
        playGame(index,cell)
    }else{
        $(cell).hover(function(){
            $(cell).css("cursor","not-allowed");
        })
    }
}
cells.each(function(index,cell){
    $(cell).one("click",(function(){
        notAllowed(index,cell)
        // playGame(index,cell);
    }));
});
