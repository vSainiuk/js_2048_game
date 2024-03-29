'use strict';

const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const winMessage = document.querySelector('.message-win');
const gameOverMessage = document.querySelector('.message-lose');
const score = document.querySelector('.game-score');
const fieldCells = document.querySelectorAll('.field-cell');
const startMessage = document.querySelector('.message-start');

const field = [];
let scoreValue = 0;
let isGameOver = false;
let isWin = false;

function startGame() {
  startMessage.classList.add('hidden');
  startButton.classList.add('hidden');
  restartButton.classList.remove('hidden');
  winMessage.classList.add('hidden');
  gameOverMessage.classList.add('hidden');
  score.textContent = '0';
  scoreValue = 0;
  isGameOver = false;
  isWin = false;
  field.length = 0;

  for (let i = 0; i < 4; i++) {
    field.push([0, 0, 0, 0]);
  }

  addNewCell();
  addNewCell();
  renderField();
}

function addNewCell() {
  const emptyCells = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (field[i][j] === 0) {
        emptyCells.push(
          {
            i, j,
          },
        );
      }
    }
  }

  if (emptyCells.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];

  field[randomCell.i][randomCell.j] = Math.random() < 0.1 ? 4 : 2;
}

function renderField() {
  fieldCells.forEach((cell, index) => {
    const i = Math.floor(index / 4);
    const j = index % 4;

    cell.textContent = field[i][j] === 0 ? '' : field[i][j];
    cell.className = `field-cell field-cell--${field[i][j]}`;
  });
}

function moveLeft() {
  let isChanged = false;

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (field[i][j] === 0) {
        continue;
      }

      let k = j - 1;

      while (k >= 0 && field[i][k] === 0) {
        k--;
      }

      if (k === -1) {
        field[i][0] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (field[i][k] === field[i][j]) {
        field[i][k] *= 2;
        scoreValue += field[i][k];
        field[i][j] = 0;
        isChanged = true;
      } else if (k + 1 !== j) {
        field[i][k + 1] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      }
    }
  }

  return isChanged;
}

function moveRight() {
  let isChanged = false;

  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (field[i][j] === 0) {
        continue;
      }

      let k = j + 1;

      while (k < 4 && field[i][k] === 0) {
        k++;
      }

      if (k === 4) {
        field[i][3] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (field[i][k] === field[i][j]) {
        field[i][k] *= 2;
        scoreValue += field[i][k];
        field[i][j] = 0;
        isChanged = true;
      } else if (k - 1 !== j) {
        field[i][k - 1] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      }
    }
  }

  return isChanged;
}

function moveUp() {
  let isChanged = false;

  for (let j = 0; j < 4; j++) {
    for (let i = 1; i < 4; i++) {
      if (field[i][j] === 0) {
        continue;
      }

      let k = i - 1;

      while (k >= 0 && field[k][j] === 0) {
        k--;
      }

      if (k === -1) {
        field[0][j] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (field[k][j] === field[i][j]) {
        field[k][j] *= 2;
        scoreValue += field[k][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (k + 1 !== i) {
        field[k + 1][j] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      }
    }
  }

  return isChanged;
}

function moveDown() {
  let isChanged = false;

  for (let j = 0; j < 4; j++) {
    for (let i = 2; i >= 0; i--) {
      if (field[i][j] === 0) {
        continue;
      }

      let k = i + 1;

      while (k < 4 && field[k][j] === 0) {
        k++;
      }

      if (k === 4) {
        field[3][j] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (field[k][j] === field[i][j]) {
        field[k][j] *= 2;
        scoreValue += field[k][j];
        field[i][j] = 0;
        isChanged = true;
      } else if (k - 1 !== i) {
        field[k - 1][j] = field[i][j];
        field[i][j] = 0;
        isChanged = true;
      }
    }
  }

  return isChanged;
}

function checkGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (field[i][j] === 0) {
        return false;
      }

      if (i < 3 && field[i][j] === field[i + 1][j]) {
        return false;
      }

      if (j < 3 && field[i][j] === field[i][j + 1]) {
        return false;
      }
    }
  }

  return true;
}

function checkWin() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (field[i][j] === 2048) {
        return true;
      }
    }
  }

  return false;
}

document.addEventListener('keydown', e => {
  if (isGameOver || isWin) {
    return;
  }

  let isChanged = false;

  switch (e.key) {
    case 'ArrowLeft':
      isChanged = moveLeft();
      break;
    case 'ArrowRight':
      isChanged = moveRight();
      break;
    case 'ArrowUp':
      isChanged = moveUp();
      break;
    case 'ArrowDown':
      isChanged = moveDown();
      break;
    default:
      return;
  }

  if (isChanged) {
    addNewCell();
    renderField();

    score.textContent = scoreValue;

    if (checkWin()) {
      isWin = true;
      winMessage.classList.remove('hidden');
    } else if (checkGameOver()) {
      isGameOver = true;
      gameOverMessage.classList.remove('hidden');
    }
  }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
