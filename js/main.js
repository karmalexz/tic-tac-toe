//variables initialization and declaration
let cells = $(".cell");
let displayPlayer = $(".display-player");
let alert = $(".win-page");
let restart = $("#restart-btn");
let xScore = $("#X-score");
let oScore = $("#O-score");
let changeToAI = $(".original");
let changeToOriginal = $(".ai");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let keepPlaying = true;
let xScoreUpdate = 0;
let oScoreUpdate = 0;
let aiCondition = false;


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
function playClickSound() {
  var clickAudio = document.getElementById("audio");
  clickAudio.play();
}
// shows up win page based on each result type.
let winPage = function (resultType) {
  switch (resultType) {
    case PLAYERO_WON:
      alert
        .html(
          `Player <span class="playerO">O</span> Won. Click Restart button to play again`
        )
        .show();
      break;
    case PLAYERX_WON:
      alert
        .html(
          `Player <span class="playerX">X</span> Won. Click Restart button to play again`
        )
        .show();
      break;
    case TIE:
      alert.html(`It's a TIE. Click Restart button to play again`).show();
  }
  alert.removeClass(".hide");
};

//this function is to check the win condition and shows up the winning page
let result = function () {
  for (let i = 0; i < winCombo.length; i++) {
    //looping to check which win combo satisfies.
    let winCondition = winCombo[i];
    let first = board[winCondition[0]];
    let second = board[winCondition[1]];
    let third = board[winCondition[2]];
    if (first === "" || second === "" || third === "") {
      //if no 3 symbols in a row, keep playing
      console.log("keep playing");
      continue;
    } else if (first === second && second === third) {
      //if there are 3 symbols in a row, stop playing
      keepPlaying = false;
      console.log("stop playing");
      break;
    }
  }
  //check who the winner is and update score.
  if (keepPlaying == false) {
    if (currentPlayer === "O") {
      console.log("o wins");
      oScoreUpdate += 1;
      winPage(PLAYERO_WON);
      oScore.html(oScoreUpdate);
      return;
    } else if (currentPlayer === "X") {
      console.log("x wins");
      xScoreUpdate += 1;
      winPage(PLAYERX_WON);
      xScore.html(xScoreUpdate);
      return;
    }
  }
  if (!board.includes("")) {
    console.log("its a tie");
    winPage(TIE);
  }
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

//update the board to check win condition later
let newBoard = function (index) {
  board[index] = currentPlayer;
};

//playGame()
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
    newBoard(index);
    result();
    changePlayer();
  }
}; //playGame()

//click restart button to reset everything but the score.
restart.click(function () {
  alert.addClass("hide");
  board = ["", "", "", "", "", "", "", "", ""];
  keepPlaying = true;
  alert.css("display", "none");
  if (currentPlayer === "O") {
    changePlayer();
  }
  cells.each(function (index, cell) {
    $(cell).html("");
    $(cell).removeClass("playerX");
    $(cell).removeClass("playerO");
    console.log(index);
  });
});

//click the title to change to AI
changeToAI.click(function () {
  changeToAI.css("display", "none");
  changeToOriginal.removeClass("hide-ai");
  aiCondition = true;
  console.log("ai mode now");
  AI();
});
//click again to change to the original mode
changeToOriginal.click(function () {
  changeToOriginal.addClass("hide-ai");
  changeToAI.css("display", "block");
  aiCondition = false;
});
//click each cell once to run the playGame function.
cells.each(function (index, cell) {
  $(cell).click(function () {
    if (aiCondition == false) {
      if ($(cell).is(":empty")) {
        playGame(index, cell);
      } else return;
    } else if (aiCondition == true) {
      if ($(cell).is(":empty")) {
        AI();
      } else return;
    }
  });
});

/*************************Implement AI*********************************/

