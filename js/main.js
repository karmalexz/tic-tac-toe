//variables initialization and declaration
let cells = $(".cell");
let displayPlayer = $(".display-player");
let alert = $(".win-page");
let restart = $("#restart-btn");
let xScore = $("#X-score");
let oScore = $("#O-score");
let changeToAI=$(".original");
let changeToOriginal=$(".ai")
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let keepPlaying = true;
let xScoreUpdate = 0;
let oScoreUpdate = 0;
const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";
//create a winning combo: vertical,horizontal and diagonal.
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let result = function () {
  for (let i = 0; i < winCombo.length; i++) {
    let winCondition = winCombo[i];
    let first = board[winCondition[0]];
    let second = board[winCondition[1]];
    let third = board[winCondition[2]];
    // console.log("first is:", first);
    // console.log("second is:", second);
    // console.log("third is:", third);
    if (first === "" || second === "" || third === "") {
      console.log("keep playing");
      continue;
    } else if (first === second && second === third) {
      keepPlaying = false;
      console.log("stop playing");
      break;
    }
  }
  if (keepPlaying == false) {
      alert.removeClass('hide');
    if (currentPlayer === "O") {
      console.log("o wins");
      oScoreUpdate += 1;
      winPage(PLAYERO_WON);
      oScore.html(oScoreUpdate);
    } else if (currentPlayer === "X") {
      console.log("x wins");
      xScoreUpdate += 1;
      winPage(PLAYERX_WON);
      xScore.html(xScoreUpdate);
    } 
  }
  if(!board.includes('')) {
    winPage(TIE);
  }
};

let winPage = function (resultType) {
  switch (resultType) {
    case PLAYERO_WON:
      alert.html(
        `Player <span class="playerO">O</span> Won. Click Restart button to play again`
      ).show();
      break;
    case PLAYERX_WON:
      alert.html(`Player <span class="playerX">X</span> Won. Click Restart button to play again`).show();
      break;
    case TIE:
      alert.html(`It's a TIE. Click Restart button to play again`).show();
  }
  alert.removeClass(".hide");
};

//this function is to change the player between X and O
let changePlayer = function () {
  displayPlayer.removeClass(`player${currentPlayer}`); //not overriding the colour of the span.
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else if (currentPlayer === "O") {
    currentPlayer = "X";
  }
  displayPlayer.html(currentPlayer); //change the span of whose turn it is.
  displayPlayer.addClass(`player${currentPlayer}`); //add an additional class in order to change the colour of the span.
};
let newBoard = function (index) {
  board[index] = currentPlayer;
  console.log(board);
};
let playGame = function (index, cell) {
  if (keepPlaying) {
    $(cell).html(currentPlayer);
    $(cell).css({
      "font-size": "3em",
      "font-family": "lobster",
      "justify-content": "center",
      "align-content": "center",
      display: "flex",
    }),
      $(cell).addClass(`player${currentPlayer}`);
    console.log(index);
    newBoard(index);
    result();
    changePlayer();
  }
};

cells.each(function (index, cell) {
  $(cell).click(function () {
    if ($(cell).is(":empty")) {
      playGame(index, cell);
    } else return;
  });
});
restart.click(function () {
  alert.addClass("hide");
  board = ["", "", "", "", "", "", "", "", ""];
  keepPlaying = true;
  alert.css("display", "none");
  if (currentPlayer === "O") {
    changePlayer();
  }
  // console.log(cells)
 
    cells.each(function (index, cell) {
    console.log("the cell is", cell);
    $(cell).html("");
    $(cell).removeClass("playerX");
    $(cell).removeClass("playerO");
    console.log(index);
  });
});

changeToAI.click(function() {
    changeToAI.css("display","none");
    changeToOriginal.removeClass("hide-ai");
    doNothing();
})
changeToOriginal.click(function(){
    changeToOriginal.addClass("hide-ai");
    changeToAI.css("display","block")

})
