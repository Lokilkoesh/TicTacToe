const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const overlay = document.getElementById('overlay');
const result = document.getElementById('result');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

function renderBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellDiv);
    });
}

function handleCellClick(index) {
    if (gameState[index] !== '' || checkWinner()) return;
    gameState[index] = currentPlayer;
    if (checkWinner()) {
        displayResult(`${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        displayResult("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    renderBoard();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function displayResult(messageText) {
    overlay.style.display = 'flex';
    result.textContent = messageText;
}

restartButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    message.textContent = '';
    overlay.style.display = 'none';
    renderBoard();
}

renderBoard();