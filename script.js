const board = document.getElementById('board');
const playerTurn = document.getElementById('player-turn');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'green';
let gameBoard = [];
let gameOver = false;

function initializeGame() {
    currentPlayer = 'green';
    gameBoard = Array.from({ length: 6 }, () => Array(7).fill(null));
    gameOver = false;
    board.innerHTML = '';
    message.textContent = '';
    playerTurn.textContent = "Player 1's Turn (Green)";
    restartButton.style.display = 'none';

    createBoard();
}

for (let i = 0; i < 6; i++) {
    gameBoard.push([]);
    for (let j = 0; j < 7; j++) {
        gameBoard[i].push(null);
    }
}

function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => handleClick(j));
            board.appendChild(cell);
        }
    }
}

function handleClick(column) {
    if (gameOver) return;

    for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][column] === null) {
            gameBoard[i][column] = currentPlayer;
            const cell = board.children[i * 7 + column];
            cell.classList.add(currentPlayer);
            checkWin();
            switchPlayer();
            return;
        }
    }
}

function checkWin() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (gameBoard[i][j] !== null) {
                const color = gameBoard[i][j];
                if (checkDirection(i, j, color, 0, 1) ||
                    checkDirection(i, j, color, 1, 0) ||
                    checkDirection(i, j, color, 1, 1) ||
                    checkDirection(i, j, color, -1, -1)) {
                    gameOver = true;

                    
                    message.textContent = `Player ${color === 'green' ? '1' : '2'} wins!`;
                    playerTurn.textContent = `${color === 'green' ? 'Green' : 'Yellow'} Wins!`;
                    restartButton.style.display = 'block'; 
                    return;
                }
            }
        }
    }
}

function checkDirection(i, j, color, di, dj) {
    let count = 0;

    for (let k = -3; k <=3; k++) { 
        const ni = i + k * di;
        const nj = j + k * dj;

        if (ni >=0 && ni <6 && nj >=0 && nj <7 && gameBoard[ni][nj] === color) {
            count++;
            if (count ===4) return true;
        } else {
            count=0;
        }
    }

    return false; 
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'green' ? 'yellow' : 'green';
    playerTurn.textContent = `Player ${currentPlayer === 'green' ? '1' : '2'}'s Turn (${currentPlayer === 'green' ? 'Green' : 'Yellow'})`;
}

restartButton.addEventListener('click', initializeGame);

initializeGame();