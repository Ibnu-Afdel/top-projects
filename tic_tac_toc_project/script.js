const Gameboard = (() => {
    const board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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

    const playerX = Player('Player X', 'X')
    const playerY = Player('Player Y', 'Y')

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
            console.log(`The winner is ${currentPlayer.name}`);
            isGameActive = false;
        } else if (Gameboard.getBoard().every(cell => cell !== '')){
            console.log('Tie');
            isGameActive = false;
        } else {
            switchPLayer();
        }
    }; 
    const resetGame = () => {
        Gameboard.resetGame();
        isGameActive = true;
        currentPlayer = playerX;
    }
    return {makeMove, resetGame}
})();

const DisplayController = (()=>{
    const gameBoardElement = document.querySelector('#game-board');

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
            gameBoardElement.appendChild(cellElement);
        });
    };

    return {render};
})();

DisplayController.render();