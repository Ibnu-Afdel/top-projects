const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board ;
    
    const makeMove = function (index, mark){
        if (board[index] === ''){
            board[index] = mark ;
            return true
        } else {
            return false
        }
    } 
    return {getBoard, makeMove}
})();

const Player = function(name, mark){
    return {name, mark}
}

const playerX = Player('Player X', 'X')
const playerY = Player('Player Y', 'Y')