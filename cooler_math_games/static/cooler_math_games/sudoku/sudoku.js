var numSelected = null;
var tileSelected = null;

var errors = 0;

var perm_board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

tilesLeft = 0;
for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        if (perm_board[r][c] == "-") {
            tilesLeft += 1;
        }
    }
}

var perm_solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

var solution = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------"
];

var board = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------"
];

window.onload = function() {
    setGame();
}

function setGame() {
    //Shuffle the board
    rsit = shuffle([shuffle([0,1,2]),shuffle([3,4,5]),shuffle([6,7,8])]);
    r_shuffled_indices = [rsit[0][0], rsit[0][1], rsit[0][2], rsit[1][0], rsit[1][1], rsit[1][2], rsit[2][0], rsit[2][1], rsit[2][2]];
    rsit = shuffle([shuffle([0,1,2]),shuffle([3,4,5]),shuffle([6,7,8])]);
    c_shuffled_indices = [rsit[0][0], rsit[0][1], rsit[0][2], rsit[1][0], rsit[1][1], rsit[1][2], rsit[2][0], rsit[2][1], rsit[2][2]];

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            board[r] = setCharAt(board[r], c, perm_board[r_shuffled_indices[r]][c_shuffled_indices[c]]);
            solution[r] = setCharAt(solution[r], c, perm_solution[r_shuffled_indices[r]][c_shuffled_indices[c]]);
        }
    }

    //Rekey the numbers
    numKey = shuffle([1,2,3,4,5,6,7,8,9]);

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            index = parseInt(solution[r][c]);
            replacementChar = (numKey[index-1]).toString();
            solution[r] = setCharAt(solution[r], c, (numKey[parseInt(solution[r][c])-1]).toString());
            if (board[r][c] != "-") {
                board[r] = setCharAt(board[r], c, solution[r][c]);
            }
        }
    }

    // digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number")
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }

            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-bottom")
            }
            if (r == 3 || r == 6) {
                tile.classList.add("horizontal-top")
            }
            if (c == 3 || c == 6) {
                tile.classList.add("vertical-left")
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-right")
            }

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile")
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            tilesLeft -= 1;

            if (tilesLeft == 0) {
                setTimeout(() => {quit_game();}, 3000);
            }
        }


        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function setCharAt(str, idx, char) {
    if (idx > str.length-1) return str;
    return str.substring(0, idx) + char + str.substring(idx+1);
}

function quit_game() {
    // Get the score from the span with an id of "score"
    var score = Math.max(0, (100-(document.getElementById("errors").innerText)));
  
    // Redirect the user to a certain webpage
    var current_domain_name = window.location.hostname;
    if (current_domain_name == "127.0.0.1"){
      current_domain_name += ":8000"; //make sure to add port number if running on local host
      window.location.href = `http://${current_domain_name}/games/game_end/${score}/Sudoku/`
    }
    else{
          window.location.href = `https://${current_domain_name}/games/game_end/${score}/Sudoku/` //use https when not using localhost
    }
  }