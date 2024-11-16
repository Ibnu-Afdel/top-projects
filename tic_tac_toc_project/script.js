const Gameboard = (() => {
    // const board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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

    // const resetBoard = () => {
    //     board = ["", "", "", "", "", "", "", "", ""];
    // };

    return {getBoard, setMove, resetBoard}
})();

const Player = (name, mark) => {
    return {name, mark}
}

const GameController = (() => {

    const playerX = Player('Player X', 'X')
    const playerY = Player('Player O', 'O')

    let currentPlayer = playerX;
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    const switchPLayer = () => {
        currentPlayer = currentPlayer ===  playerX ? playerY : playerX ;
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
            const winnerPlayer = document.querySelector('#winner-player');
            winnerPlayer.textContent = `The winner is ${currentPlayer.name}`
            // console.log(`The winner is ${currentPlayer.name}`);
            isGameActive = false;
        } else if (Gameboard.getBoard().every(cell => cell !== '')){
            const winnerPlayer = document.querySelector('#winner-player');
            winnerPlayer.textContent = 'The Game is Tie'
            console.log('Tie');
            isGameActive = false;
        } else {
            switchPLayer();
        }
    }; 
    const resetGame = () => {
        Gameboard.resetBoard();
        isGameActive = true;
        currentPlayer = playerX;
    }
    return {makeMove, resetGame}
})();

const DisplayController = (()=>{
    const gameBoardElement = document.querySelector('#game-board');
    const playAgainButton = document.querySelector('#playAgainButton')

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

    playAgainButton.addEventListener('click', () => {
        GameController.resetGame();
        render();
    });

    return {render};
})();

DisplayController.render();