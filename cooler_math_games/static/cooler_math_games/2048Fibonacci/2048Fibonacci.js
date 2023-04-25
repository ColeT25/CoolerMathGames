var board;
var score = 0;
var rows = 4;
var columns = 4;
var fibNums = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584]

window.onload = function() {
    setGame();
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);

        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }


    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 1;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "1";
            tile.classList.add("x1");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
})

function filterZero(row) {
    return row.filter(num => num != 0);
}


function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++) {
        if (fibNums.includes(row[i] + row[i+1])) {
            row[i] += row[i+1];
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }

    document.getElementById("score").innerText = score.toString();

    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].reverse();
        row = slide(row).reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < columns; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[3][c], board[2][c], board[1][c], board[0][c]];
        row = slide(row);
        board[0][c] = row[3];
        board[1][c] = row[2];
        board[2][c] = row[1];
        board[3][c] = row[0];

        for (let r = 0; r < columns; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function quit_game() {
  // Get the score from the span with an id of "score"
  var score = document.getElementById("score").innerText;

  // Redirect the user to a certain webpage
  var current_domain_name = window.location.hostname;
  if (current_domain_name == "127.0.0.1"){
    current_domain_name += ":8000"; //make sure to add port number if running on local host
    window.location.href = `http://${current_domain_name}/games/game_end/${score}/2048Fibonacci/`
  }
  else{
        window.location.href = `https://${current_domain_name}/games/game_end/${score}/2048Fibonacci/` //use https when not using localhost
  }
}