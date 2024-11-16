const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board ;
    
    const makeMove = (index, mark) => {
        if (board[index] === ''){
            board[index] = mark ;
            return true
        } else {
            return false
        }
    } 
    return {getBoard, makeMove}
})();

const Player = (name, mark) => {
    return {name, mark}
}

const playerX = Player('Player X', 'X')
const playerY = Player('Player Y', 'Y')