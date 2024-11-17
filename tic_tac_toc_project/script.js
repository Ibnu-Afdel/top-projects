const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']
    const getBoard = () => board ;
    
    const setMove = (index, mark) => {
        if (board[index] === ''){
            board[index] = mark ;
            return true
        } else {
            return false
        }
    } 

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return {getBoard, setMove, resetBoard}
})();

const Player = (name, mark) => {
    return {name, mark}
}

const GameController = (() => {

    let playerX = Player('Player 1', 'X')
    let playerO = Player('Player 2', 'O')
    let currentPlayer = playerX;
    let isGameActive = true;
    let playWithRobot = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    const switchPLayer = () => {
        currentPlayer = currentPlayer ===  playerX ? playerO : playerX ;
    };

    const checkWinner = () => {
        return winningCombinations.some( combination => {
           const [a, b, c] = combination;
           return (
            Gameboard.getBoard()[a] === currentPlayer.mark &&
            Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
            Gameboard.getBoard()[a] === Gameboard.getBoard()[c]
           );
        });
    };

    const makeMove = (index) => {
        if (!isGameActive || !Gameboard.setMove(index, currentPlayer.mark)){
            return;
        }

        if (checkWinner()){
            DisplayController.showResult(`${currentPlayer.name} wins!`);
            isGameActive = false;
        } else if (Gameboard.getBoard().every(cell => cell !== '')){
            DisplayController.showResult('Its a Draw')
            isGameActive = false;
        } else {
            switchPLayer();
            if(playWithRobot && currentPlayer === playerO) {
                makeRobotMove();
            }
        }
    }; 

    const makeRobotMove = () => {
        const emptyCells = Gameboard.getBoard().map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }

    const startGame = (playerXName, playerOName, playerXMark, playerOMark, mode) => {
        playerX = Player(playerXName || 'Player 1', playerXMark || 'X');
        playerO = Player(playerOName || 'Player 2', playerOMark || 'O');
        currentPlayer = playerX;

        playWithRobot = (mode === 'robot');

        Gameboard.resetBoard();
        isGameActive = true;
        DisplayController.render();
        DisplayController.clearResult();
    }
    const resetGame = () => {
        Gameboard.resetBoard();
        isGameActive = true;
        currentPlayer = playerX;
    }
    return {makeMove, resetGame, startGame}
})();

const DisplayController = (()=>{
    const gameBoardElement = document.querySelector('#game-board');
    const startButton = document.querySelector('#start-button');
    const playerXInput = document.querySelector('#playerXName');
    const playerOInput = document.querySelector('#playerOName');
    const resultDisplay = document.querySelector('#result-display') 

    const getNamesButton = document.querySelector('#getNamesButton');
    const gameModeSelect = document.querySelector('#gameMode');
    const playerXMarkInput = document.querySelector('#playerXMark');
    const playerOMarkInput = document.querySelector('#playerOMark');
    const gameOptions = document.querySelector('#game-options')

    const randomMarkChoice = document.querySelector('#random');
    const customMarkChoice = document.querySelector('#custom')
    
    const cleanBoard = () => {
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild);
        };
    };

    const render = () => {
        cleanBoard();
        const board = Gameboard.getBoard();

        board.forEach((cell,index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;

            cellElement.dataset.index = index;

            cellElement.addEventListener('click', (event)=>{
                const cellIndex = event.target.dataset.index;
                GameController.makeMove(parseInt(cellIndex));
                render()
            });

            gameBoardElement.appendChild(cellElement);
        });
    };

    const showResult = (message) => {
        resultDisplay.textContent = message;
    };

    const clearResult = () => {
        resultDisplay.textContent = '';
    }

    getNamesButton.addEventListener('click', () => {
        gameOptions.style.display = 'block';
        gameBoardElement.style.display = 'none';
    });

    gameModeSelect.addEventListener('change', () => {
        if (gameModeSelect.value === 'robot'){
            playerOInput.value = 'Robot';
            playerOInput.disabled = true;
        } else {
            playerOInput.value = '';
            playerOInput.disabled = false;
        }
    })




    startButton.addEventListener('click', () => {
        GameController.resetGame();
        const playerXName = playerXInput.value;
        const playerOName = gameModeSelect.value === 'robot' ? 'Robot' : playerOInput.value;

        const playerXMark = playerXMarkInput.value || 'X';
        const playerOMark = playerOMarkInput.value || 'O';
        const mode = gameModeSelect.value;

        if (playerXMark === playerOMark){
            alert('Player mark should be differnet');
            return;
        }

        let finalPlayerXMark, finalPlayerOMark

        if (randomMarkChoice.checked){
            const emojis = ['😃', '😎', '🤖', '🐶', '🐱', '🦊', '🦄', '🐼', '🦁', '🐸', '🦋', '🐨', '🐯', '🐷', '🦓', '🦒', '🦜', '🐧', '🦥']
            finalPlayerXMark = emojis[Math.floor(Math.random() * emojis.length)];
            finalPlayerOMark = emojis[Math.floor(Math.random() * emojis.length)];

            while (finalPlayerXMark === finalPlayerOMark){
                finalPlayerOMark = emojis[Math.floor(Math.random() * emojis.length)];
            }
            alert(`Player 1 is "${finalPlayerXMark}", Player 2 is "${finalPlayerOMark}"`);
        } else {
            finalPlayerXMark = playerXMark;
            finalPlayerOMark = playerOMark;
        }

        GameController.startGame(playerXName, playerOName, finalPlayerXMark, finalPlayerOMark, mode)

        gameBoardElement.style.display = 'grid';
    });



    return {render, showResult, clearResult};
})();

DisplayController.render();