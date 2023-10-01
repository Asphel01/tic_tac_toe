const form = document.querySelectorAll(".playerInput");
const p1Input = document.querySelector("#player1");
const p2Input = document.querySelector("#player2");

const gameBoard = (() => {
    let board = [[0, 0, 0], [0 , 0, 0], [0, 0, 0]];

    const setBoard = (character, row, col) => {
        if(board[row][col] === 0) {
            board[row][col] = character;
        }
    }

    const getCharacter = (row, col) => {
        return board[row][col];
    }

    const resetBoard = () => {
        board = [[0, 0, 0], [0 , 0, 0], [0, 0, 0]];
    }

    const isFilled = () => {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++) {
                if(board[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const checkStatus = () => {
        for(let i = 0; i < board.length; i++) {
            if(board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }

            if(board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }               
        }

        if(board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        if(board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        if(isFilled()) {
            return "No winner";
        }
    }

    return {setBoard, resetBoard, getCharacter, checkStatus};
})();

const player = character => {
    let myTurn;
    const myChar = character;

    const getCharacter = () => {
        return myChar;
    }

    const setTurn = () => {
        myTurn = true;
    }

    const passTurn = () => {
        myTurn = false;
    }

    const isMyTurn = () => {
        return myTurn;
    }

    return {getCharacter, setTurn, passTurn, isMyTurn};
}

const player1 = player("X");
const player2 = player("O");

const gameLogic = ((gameBoard, player1, player2) => {
    const container = document.querySelector(".gridContainer");
    const gridSquares = document.querySelectorAll(".square");
    const winDisplay = document.querySelector(".winnerDisplay");
    const resetBtn = document.querySelector(".reset");
    const startBtn = document.querySelector(".startBtn");

    startBtn.addEventListener('click', event => {
        form.forEach(box => {box.style.display = "none"});
        startBtn.style.display = "none";
        container.style.visibility = "visible";
        resetBtn.style.visibility = "visible";
        player1.setTurn();
        player2.passTurn();
    });

    gridSquares.forEach(square => {
        square.addEventListener('click', event => {
            const row = square.getAttribute("id").charAt(0);
            const col = square.getAttribute("id").charAt(1);
            const currentChar = gameBoard.getCharacter(parseInt(row), parseInt(col));

            if(currentChar === 0 && player1.isMyTurn()) {
                gameBoard.setBoard(player1.getCharacter(), row, col);
                square.textContent = player1.getCharacter();
                player1.passTurn();
                player2.setTurn();
            }else if(currentChar === 0 && player2.isMyTurn()) {
                gameBoard.setBoard(player2.getCharacter(), row, col);
                square.textContent = player2.getCharacter();
                player2.passTurn();
                player1.setTurn();                
            }    

            let status = gameBoard.checkStatus();
            if(status !== undefined) {
                if(status === "No winner") {
                    winDisplay.textContent = status;
                }else if(status === "X"){
                    winDisplay.textContent =  p1Input.value + " is the winner";
                }else {
                    winDisplay.textContent =  p2Input.value + " is the winner";
                }
            }
        });    
    });

    resetBtn.addEventListener('click', event => {
        gridSquares.forEach(square => {
            square.textContent = "";
        });
        gameBoard.resetBoard();
        winDisplay.textContent = "";
        player1.setTurn();
        player2.passTurn();
    });
})(gameBoard, player1, player2);
