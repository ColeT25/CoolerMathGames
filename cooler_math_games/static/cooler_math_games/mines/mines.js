var board = [];
var rows = 16;
var columns = 16;

var minesCount = 40;
var flagsRemaining = minesCount;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    startGame();
}

function quit_game(score) {
  // Redirect the user to a certain webpage
  var current_domain_name = window.location.hostname;
  if (current_domain_name == "127.0.0.1"){
    current_domain_name += ":8000"; //make sure to add port number if running on local host
    window.location.href = `http://${current_domain_name}/games/game_end/${score}/mines/`
  }
  else{
        window.location.href = `https://${current_domain_name}/games/game_end/${score}/mines/` //use https when not using localhost
  }
}

function setMines() {

    var mines = [];

    for (var i = 0; i <= rows*columns; i++) {
        if (i < minesCount) {
            mines.push(1);
        }
        else {
            mines.push(0)
        }
    }

    shuffleArray(mines);

    for (var i = 0; i <= rows*columns; i++) {
        if (mines[i] == 1) {
            minesLocation.push((Math.floor(i/columns)).toString() + "-" + (i%columns).toString());
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flags-remaining").innerText = flagsRemaining;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //populate board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row)
    }
    console.log(board);
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "") {
            flagsRemaining -= 1;
            document.getElementById("flags-remaining").innerText = flagsRemaining;
            tile.innerText = "🚩"
        }
        else if (tile.innerText == "🚩") {
            flagsRemaining += 1;
            document.getElementById("flags-remaining").innerText = flagsRemaining;
            tile.innerText = "";
        }
        return;
    }
    
    if (tile.innerText != "🚩") {
        if (minesLocation.includes(tile.id)) {
            alert("GAME OVER");
            gameOver = true;
            revealMines();

            if (flagsRemaining == 40){
                score = 0;
            }
            else if (flagsRemaining == 0){
                score = 1000 - tilesClicked;
            }
            else{
                score = 250 - flagsRemaining;
            }
            setTimeout(quit_game, 5000, score)
            return;
        }

        let coords = tile.id.split("-"); //"0-0" -> ["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        checkMine(r,c);
    }
    return;
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c]
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣"
                tile.style.backgroundColor = "red"
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");

    let minesFound = 0;

    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);
    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);
    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }

    else {
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);
        checkMine(r, c-1);
        checkMine(r, c+1);
        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
   
        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));
                   
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
       
    return array;
 }