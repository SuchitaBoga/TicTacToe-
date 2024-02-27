const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const overlay = document.getElementById('overlay');
const modalMessage = document.getElementById('modalMessage');
const restartBtn = document.getElementById('restartBtn');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = X_CLASS;
let gameActive = true;

startGame();

restartBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  startGame();
});

function startGame() {
  cells.forEach(cell => {
    cell.innerText = ''; // Clear the mark (X or O)
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  modalMessage.innerText = '';
  gameActive = true;
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return;
  }
  placeMark(cell);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell) {
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer);
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    modalMessage.innerText = 'It\'s a Draw!';
  } else {
    modalMessage.innerText = `Player ${currentPlayer.toUpperCase()} Wins!`;
  }
  overlay.style.display = 'flex';
  gameActive = false;
}
