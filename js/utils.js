'use strict'
console.log('Sprint-1-Nadav Mozes');

function buildBoard() {
    var board = [];
    for (var i = 0; i < gSelectedLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gSelectedLevel.size; j++) {
            board[i][j] = {
                minesArountCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }


    return board;
}


function setMinesNegs() {
    for (var i = 0; i < gSelectedLevel.size; i++) {
        for (var j = 0; j < gSelectedLevel.size; j++) {
            gBoard[i][j].minesArountCount = countNeighbors(i, j, gBoard);
        }
    }
}

function setRandomMines() {
    var boardSize = gSelectedLevel.size;
    for (var k = 0; k < gSelectedLevel.mines; k++) {
        var i = getRandomInteger(0, boardSize - 1);
        var j = getRandomInteger(0, boardSize - 1);
        while (gBoard[i][j].isMine === true) {
            i = getRandomInteger(1, boardSize - 1);
            j = getRandomInteger(1, boardSize - 1);
        }
        gBoard[i][j].isMine = true;
    }
}

function renderBoard() {
    var cellDisplay = ' ';
    var strHtml = `<table><tbody>`;
    for (var i = 0; i < gSelectedLevel.size; i++) {
        strHtml += ' <tr>';
        for (var j = 0; j < gSelectedLevel.size; j++) {
            cellDisplay = ' ';
            if (gBoard[i][j].isShown) {
                if (gBoard[i][j].isMine) {
                    cellDisplay = MINE;
                } else if (gBoard[i][j].minesArountCount) {
                    cellDisplay = gBoard[i][j].minesArountCount;
                } else cellDisplay = ' ';
            }
            if (gBoard[i][j].isMarked) cellDisplay = FLAG;

            strHtml += ` <td data-id="${i}-${j}" class="cell num${gBoard[i][j].minesArountCount} ${gBoard[i][j].isShown ? 'open-cell' : 'close-cell'}"  onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="setFlag(event,${i},${j})">${cellDisplay}</td>`;
        }
        strHtml += ' </tr>';

    }
    strHtml += '</tbody></table>';
    document.querySelector(".board").innerHTML = strHtml;
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;

}

function getRandomInteger(min, max) {
    var num = Math.floor(Math.random() * Math.floor(max + 1));
    while (num < min) {
        num = Math.floor(Math.random() * Math.floor(max + 1));
    }
    return num;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}

function renderCell(pos, value) {
    var elCell = document.querySelector(`[data-id="${pos.i}-${pos.j}"]`);
    if (value !== FLAG) {
        elCell.classList.remove('close-cell');
        elCell.classList.add('open-cell');
    }
    elCell.innerText = value
}

// Timer Functions:
function startStopwatch() {
    gTimeBegan = new Date();
    gStopwatchInterval = setInterval(runStopwatch, 11);
}

function runStopwatch() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - gTimeBegan);
    var min = timeElapsed.getUTCMinutes();
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();

    document.querySelector('.stopwatch span').innerText =
        (min > 9 ? min + ':' : min > 0 ? '0' + min + ':' : '') +
        (sec > 9 ? sec : '0' + sec) + '.' +
        (ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms);
}

function resetStopwatch() {
    clearInterval(gStopwatchInterval);
    gStopwatchInterval = null;
    document.querySelector('.stopwatch span').innerText = "00.000";
}