// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = {
    X: 0,
    O: 0
};

// Winning combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// Initialize game
function initGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    updateStatus();
    updateScores();
}

// Handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // Update board
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    if (checkWin()) {
        gameActive = false;
        statusElement.textContent = `Player ${currentPlayer} Wins! 🎉`;
        statusElement.className = currentPlayer === 'X' ? 'text-primary' : 'text-danger';
        scores[currentPlayer]++;
        updateScores();
        highlightWinner();
        document.querySelector('.game-board').classList.add('game-over');
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        statusElement.textContent = "It's a Draw! 🤝";
        statusElement.className = 'text-secondary';
        document.querySelector('.game-board').classList.add('game-over');
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Check for win
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Check for draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Highlight winning cells
function highlightWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }
}

// Update status message
function updateStatus() {
    if (gameActive) {
        statusElement.textContent = `Player ${currentPlayer}'s Turn`;
        statusElement.className = currentPlayer === 'X' ? 'text-primary' : 'text-danger';
    }
}

// Update score display
function updateScores() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelector('.game-board').classList.remove('game-over');
    initGame();
}

// Event listeners
resetBtn.addEventListener('click', resetGame);

// Initialize game on page load
initGame();
