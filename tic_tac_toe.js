const gameBoard = (() => {
    let board = [[0 ,0, 0][0, 0, 0][0, 0, 0]];

    const setBoard = (character, row, col) => {
        if(!board[row][col] === 0) {
            board[row][col] = character;
        }
    }

    const getCharacter = (row, col) => {
        return board[row][col];
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
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }

            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }               
        }

        if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        if(board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        if(isFilled()) {
            return "No Winner";
        }
    }

    return {setBoard, getCharacter, checkStatus};
})();

const player = character => {
    let myTurn;

    const setTurn = () => {
        myTurn = true;
    }

    const passTurn = () => {
        myTurn = false;
    }

    const isMyTurn = () => {
        return myTurn;
    }

    return {setTurn, passTurn, isMyTurn};
}

const gameLogic = ((gameBoard, player1, player2) => {
    const turnCounter = 0;
    const gridSquares = document.querySelectorAll(".square");
    gridSquares.forEach(square => {
        square.addEventListener('click', () => {
            const row = square.getAttribute("id").charAt(0);
            const col = square.getAttribute("id").charAt(1);
            const currentChar = gameBoard.getCharacter(row, col);
            if(currentChar === 0 && player1.isMyTurn()) {
                gameBoard.setBoard(player1.getCharacter(), row, col);
                square.textContent(player1.getCharacter());
                turnCounter++;
            }
            if(currentChar === 0 && player2.isMyTurn()) {
                gameBoard.setBoard(player2.getCharacter(), row, col);
                square.textContent(player2.getCharacter());
                turnCounter++;
            }    
        });    
    });


    //add checker
})();

const player1 = player("X");
player1.setTurn();
const player2 = player("O");
player2.passTurn();
