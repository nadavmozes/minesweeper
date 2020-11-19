'use strict'
console.log('Sprint-1-Nadav Mozes');
// Indications Mapping.
const MINE = '💥';
const FLAG = '🛡️';
const SMILY = '😄';
const WIN = '🤩';
const LOSE = '😔';
const LIVES = '❤️';
const EMPTYLIVES = '🤍';

// The model/matrix current state.
var gBoard = [];
var gCounter = 0;
// Determine the difficulty
var gLevels = [];
var gSelectedLevel;
// Game Status
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

// Initate the game
function initGame() {
    startGame();
    createLevelList();
    renderLevelScale();
    gBoard = buildBoard();
    renderBoard();
}
// Start Gane
function startGame() {
    gGame.isOn = true;
    gSelectedLevel = { size: 4, mines: 2 };
    document.querySelector(".smiley").innerText = SMILY;
}
// Game over status
function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gSelectedLevel.size ** 2) {
        console.log('YOU WON!');
        document.querySelector(".smiley").innerText = WIN;
    } else console.log('YOU LOSE...');
    document.querySelector(".smiley").innerText = LOSE;
}
// Cell has been clicked
function cellClicked(elCell, i, j) {
    gCounter++;
    if (gCounter === 2) {
        setRandomMines();
        setMinesNegs();
    }
    if (gGame.isOn) {
        if (gBoard[i][j].isMarked)
            return
        if (gBoard[i][j].isMine) {
            renderCell({ i, j }, MINE);
            gGame.isOn = false;
            // var heart = document.getElementById('hearts').innerHTML;
            // document.getElementById('🤍').innerHTML = heart;
            checkGameOver();
        } else {
            expandShown(elCell, i, j)
            startTimer('.timer');
        }
    } else return;
}
// Expand shown when click function
function expandShown(elCell, i, j) {
    var cellI = i;
    var cellJ = j;
    if (gBoard[i][j].minesArountCount === 0) {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gSelectedLevel.size) continue;
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gSelectedLevel.size) continue;
                gBoard[i][j].isShown = true;
            }
        }
        renderBoard();
    } else {
        gBoard[i][j].isShown = true;
        renderCell({ i, j }, gBoard[i][j].minesArountCount);
    }
}

// Set flag on cell
function setFlag(event, i, j) {
    if (gGame.isOn) {
        if (gBoard[i][j].isShown === true) {} else if (gBoard[i][j].isMarked) {
            gBoard[i][j].isMarked = false;
            gGame.markedCount--;
            document.querySelector('.mines')
            renderBoard();
        } else {
            gBoard[i][j].isMarked = true;
            gGame.markedCount++;
            document.querySelector('.mines')
            renderCell({ i, j }, FLAG);
        }
    }
    event.preventDefault();
    return false;

}
// Setup difficulties
function renderLevelScale() {
    var elLevelTable = document.querySelector(".level-scale");
    var strHtml = ``;
    for (var i = 0; i < 3; i++) {
        strHtml += `<button name="difficulty" type="radio" data-index="${i}" onclick="setDifficulty(${i})" ${i === 0 ? "checked" : ""} ">${gLevels[i].name}</button>`
    }
    elLevelTable.innerHTML = strHtml;

}
// Set difficulty
function setDifficulty(levelCell) {
    for (var i = 0; i < gLevels.length; i++) {
        if (i === levelCell) {
            gSelectedLevel.size = gLevels[i].size;
            gSelectedLevel.mines = gLevels[i].mines;
            gLevels[levelCell].isSelected = true;
        }
    }
    gBoard = buildBoard();
    renderBoard();
}
// Create the level of difficulty
function createLevel(id, name, size, mines, isSelected) {
    return {
        id,
        name,
        size,
        mines,
        isSelected,
    }
}
// List of difficulties
function createLevelList() {
    gLevels.push(createLevel(0, 'Easy ||', 4, 2, true));
    gLevels.push(createLevel(1, 'Medium ||', 8, 12, false));
    gLevels.push(createLevel(2, 'Hard', 12, 30, false));

}