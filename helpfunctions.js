import bishopBlack from './icons/bishop-black.png'
import pawnBlack from './icons/pawn-black.png'
import knightBlack from './icons/knight-black.png'
import rockBlack from './icons/rock-black.png'
import queenBlack from './icons/queen-black.png'
import kingBlack from './icons/king-black.png'
import bishopWhite from './icons/bishop-white.png'
import pawnWhite from './icons/pawn-white.png'
import knightWhite from './icons/knight-white.png'
import rockWhite from './icons/rock-white.png'
import queenWhite from './icons/queen-white.png'
import kingWhite from './icons/king-white.png'

//"r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1"
//takes a fen string and returns a board position
const analyzeFen = (FEN) => {
    let boardPosition = new Array(8)
    for(let i=0; i<8; i++){
      boardPosition[i] = new Array(8)
    }
    //chess board is drawn wrong way so flip the rank
    let rank = 7
    let file = 0

    for (const c of FEN) {
      switch (c) {
        case 'p':
          boardPosition[rank][file] = {piece: 'pawn', color: 'white', icon: pawnWhite, highlight: false}
          file ++
          break
        case 'r':
          boardPosition[rank][file] = {piece: 'rock', color: 'white', icon: rockWhite, highlight: false}
          file ++
          break
        case 'n':
          boardPosition[rank][file] = {piece: 'knight', color: 'white', icon: knightWhite, highlight: false}
          file ++
          break
        case 'b':
          boardPosition[rank][file] = {piece: 'bishop', color: 'white', icon: bishopWhite, highlight: false}
          file ++
          break
        case 'q':
          boardPosition[rank][file] = {piece: 'queen', color: 'white', icon: queenWhite, highlight: false}
          file ++
          break
        case 'k':
          boardPosition[rank][file] = {piece: 'king', color: 'white', icon: kingWhite, highlight: false}
          file ++
          break
        case 'P':
          boardPosition[rank][file] = {piece: 'pawn', color: 'black', icon: pawnBlack, highlight: false}
          file ++
          break
        case 'R':
          boardPosition[rank][file] = {piece: 'rock', color: 'black', icon: rockBlack, highlight: false}
          file ++
          break
        case 'N':
          boardPosition[rank][file] = {piece: 'knight', color: 'black', icon: knightBlack, highlight: false}
          file ++
          break
        case 'B':
          boardPosition[rank][file] = {piece: 'bishop', color: 'black', icon: bishopBlack, highlight: false}
          file ++
          break
        case 'Q':
          boardPosition[rank][file] = {piece: 'queen', color: 'black', icon: queenBlack, highlight: false}
          file ++
          break
        case 'K':
          boardPosition[rank][file] = {piece: 'king', color: 'black', icon: kingBlack, highlight: false}
          file ++
          break
        case '/':
          file = 0
          rank--
          break
        default:
          for (let i=0; i<parseInt(c); i++) {
            boardPosition[rank][file] = {piece: null, color: 'null', icon: null, highlight: false}
            file++
            console.log("iterator",i)
          }
          break
      }
    }
    return boardPosition
  } 

//takes a position (rank, file), a piece, a color and a board position and calculates all valid moves
//TO-DO add Check and Check Mate
  
const validMoves = (rank, file, piece, color, board) => {
    let moves = []

    switch(piece) {
        case 'pawn': {
            let nrMoves = 1
            if (color === 'white' && rank === 6){
                nrMoves = 2
            }
            else if (color === 'black' && rank === 1){
                nrMoves = 2
            }

            if (color === 'white') {
                checkUp(nrMoves, rank, file, board).map((move)=>{
                    return moves.push(move)
                })
                pawnTake(rank, file, color, board).map((move) => {
                    return moves.push(move)
                })
            }
            else if (color === 'black') {
                checkDown(nrMoves, rank, file, board).map((move)=>{
                    return moves.push(move)
                })
                pawnTake(rank, file, color, board).map((move) => {
                    return moves.push(move)
                })
            }
            break
        }
        case 'bishop': {
            checkDiagonals(piece, rank, file, board, color).map((move)=>{
                return moves.push(move)
            })
            break
        } 
        case 'rock': {
            checkHorizontalVertical(piece, rank, file, board, color).map((move) => {
                return moves.push(move)
            })
            break
        }
        case 'knight': {
            checkKnight(rank, file, board, color).map((move) => {
                return moves.push(move)
            })
            break
        }
        case 'queen': {
            checkHorizontalVertical(piece, rank, file, board, color).map((move) => {
                return moves.push(move)
            })
            checkDiagonals(piece, rank, file, board, color).map((move)=>{
                return moves.push(move)
            })
            break
        } 
        case 'king': {
            checkHorizontalVertical(piece, rank, file, board, color).map((move) => {
                return moves.push(move)
            })
            checkDiagonals(piece, rank, file, board, color).map((move)=>{
                return moves.push(move)
            })
            break
        }
        default:
            break
    }
    return moves
}

//pawn black
//TO-DO simplify by combining checkUp and Down
const checkDown = (nrMoves, rank, file, board) => {
    let moves = []
    for(let i = rank+1; i <= rank+nrMoves; i++) {
        if(board[i][file].piece == null){
            moves.push({rank: i, file: file})
        }
        else {
            break
        }
    }
    return moves
}

//pawn white
const checkUp = (nrMoves, rank, file, board) => {
    let moves = []
    for(let i = rank-1; i >= rank-nrMoves; i--) {
        if(board[i][file].piece == null){
            moves.push({rank: i, file: file})
        }
        else{
            break
        }
    }
    return moves
}

//Checks valid moves horizontaly and vertically
const checkHorizontalVertical = (piece, rank, file, board, color) => {
    let moves = []
    let nrOfMoves = 8

    if(piece === 'king') {
        nrOfMoves = 1
    }

    //up
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank-i < 0) {
            break
        }
        else if(board[rank-i][file].piece == null) {
            moves.push({rank: rank-i, file: file})
        }
        else if(board[rank-i][file].piece !== null && board[rank-i][file].color === color){
            break
        }
        else if(board[rank-i][file].piece !== null && board[rank-i][file].color !== color){
            moves.push({rank: rank-i, file: file})
            break
        }
        else {
            console.log("error up")
        }
    }
    //down
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank+i >= board.length) {
            break
        }
        else if(board[rank+i][file].piece == null) {
            moves.push({rank: rank+i, file: file})
        }
        else if(board[rank+i][file].piece !== null && board[rank+i][file].color === color){
            break
        }
        else if((board[rank+i][file].piece !== null && board[rank+i][file].color !== color)){
            moves.push({rank: rank+i, file: file})
            break
        }
        else {
            console.log("error down")
        }
    }
    //right
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (file+i >= board[rank].length) {
            break
        }
        else if(board[rank][file+i].piece == null) {
            moves.push({rank: rank, file: file+i})
        }
        else if(board[rank][file+i].piece !== null && board[rank][file+i].color === color){
            break
        }
        else if(board[rank][file+i].piece !== null && board[rank][file+i].color !== color){
            moves.push({rank: rank, file: file+i})
            break
        }
        else {
            console.log("error right")
        }
    }
    //left
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (file-i < 0) {
            break
        }
        else if(board[rank][file-i].piece == null) {
            moves.push({rank: rank, file: file-i})
        }
        else if(board[rank][file-i].piece !== null && board[rank][file-i].color === color){
            break
        }
        else if(board[rank][file-i].piece !== null && board[rank][file-i].color !== color){
            moves.push({rank: rank, file: file-i})
            break
        }
        else {
            console.log("error left")
        }
    }
    return moves
}

//check valid moves diagonals
const checkDiagonals = (piece, rank, file, board, color) => {
    let moves = []
    let nrOfMoves = 8

    if(piece === 'king') {
        nrOfMoves = 1
    }

    //down-right
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank+i >= board.length || file+i >= board[rank].length) {
            break
        }
        else if(board[rank+i][file+i].piece == null) {
            moves.push({rank: rank+i, file: file+i})
        }
        else if(board[rank+i][file+i].piece !== null && board[rank+i][file+i].color === color) {
            break
        }
        else if(board[rank+i][file+i].piece !== null && board[rank+i][file+i].color !== color) {
            moves.push({rank: rank+i, file: file+i})
            break
        }
        else {
            console.log("error down right")
        }
    }
    //up-right
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank-i < 0 || file+i >= board[rank].length){
            break
        }
        else if(board[rank-i][file+i].piece == null) {
            moves.push({rank: rank-i, file: file+i})
        }
        else if(board[rank-i][file+i].piece !== null && board[rank-i][file+i].color === color) {
            break
        }
        else if(board[rank-i][file+i].piece !== null && board[rank-i][file+i].color !== color) {
            moves.push({rank: rank-i, file: file+i})
            break
        }
        else {
            console.log("error up right")
        }
    }
    //down-left
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank+i >= board.length || file-i < 0) {
            break
        }
        else if(board[rank+i][file-i].piece == null) {
            moves.push({rank: rank+i, file: file-i})
        }
        else if(board[rank+i][file-i].piece !== null && board[rank+i][file-i].color === color) {
            break
        }
        else if(board[rank+i][file-i].piece !== null && board[rank+i][file-i].color !== color){
            moves.push({rank: rank+i, file: file-i})
            break
        }
        else {
            console.log("error down left")
        }
    }
    //up-left
    for(let i = 1; i <= nrOfMoves; i++ ){
        if (rank-i < 0 || file-i < 0) {
            break
        }
        else if(board[rank-i][file-i].piece == null) {
            moves.push({rank: rank-i, file: file-i})
        }
        else if(board[rank-i][file-i].piece !== null && board[rank-i][file-i].color === color) {
            break
        }
        else if(board[rank-i][file-i].piece !== null && board[rank-i][file-i].color !== color){
            moves.push({rank: rank-i, file: file-i})
            break
        }
        else {
            console.log("error up left")
        }
    }
    return moves
}

//special rule case for PawnTake
//TO-DO add en passant
const pawnTake = (rank, file, color, board) => {
    let moves = []
    if (color==='black'){
        if(file+1 < 8 && board[rank+1][file+1].piece !== null && board[rank+1][file+1].color === 'white' ) {
            moves.push({rank: rank+1, file: file+1})
        }

        if(file-1 >= 0 && board[rank+1][file-1].piece !== null && board[rank+1][file-1].color === 'white' ) {
            moves.push({rank: rank+1, file: file-1})
        }
    }
    else if (color==='white'){
        if(file+1 < 8 && board[rank-1][file+1].piece !== null&& board[rank-1][file+1].color === 'black' ) {
            moves.push({rank: rank-1, file: file+1})
        }

        if(file-1 >= 0 && board[rank-1][file-1].piece !== null && board[rank-1][file-1].color === 'black' ) {
            moves.push({rank: rank-1, file: file-1})
        }
    }
    else {
        console.log("error on pawn move")
    }
return moves
}

//check all valid knight moves
const checkKnight = (rank, file, board, color) => {
    let moves = []
    if(rank+1 < board.length && file+2 < board[rank].length) {
        if (board[rank+1][file+2].piece == null) {
            moves.push({rank: rank+1, file: file+2})
        }
        else if (board[rank+1][file+2].piece !== null && board[rank+1][file+2].color !== color) {
            moves.push({rank: rank+1, file: file+2})
        }
    }
    if(rank+2 < board.length && file+1 < board[rank].length) {
        if (board[rank+2][file+1].piece == null) {
            moves.push({rank: rank+2, file: file+1})
        }
        else if (board[rank+2][file+1].piece !== null && board[rank+2][file+1].color !== color) {
            moves.push({rank: rank+2, file: file+1})
        }
    }
    if(rank-1 >= 0 && file+2 < board[rank].length) {
        if (board[rank-1][file+2].piece == null) {
            moves.push({rank: rank-1, file: file+2})
        }
        else if (board[rank-1][file+2].piece !== null && board[rank-1][file+2].color !== color) {
            moves.push({rank: rank-1, file: file+2})
        }
    }
    if(rank-2 >= 0 && file+1 < board[rank].length) {
        if (board[rank-2][file+1].piece == null) {
            moves.push({rank: rank-2, file: file+1})
        }
        else if (board[rank-2][file+1].piece !== null && board[rank-2][file+1].color !== color) {
            moves.push({rank: rank-2, file: file+1})
        }
    }
    if(rank+1 < board.length && file-2 >= 0) {
        if (board[rank+1][file-2].piece == null) {
            moves.push({rank: rank+1, file: file-2})
        }
        else if (board[rank+1][file-2].piece !== null && board[rank+1][file-2].color !== color) {
            moves.push({rank: rank+1, file: file-2})
        }
    }
    if(rank+2 < board.length && file-1 >= 0) {
        if (board[rank+2][file-1].piece == null) {
            moves.push({rank: rank+2, file: file-1})
        }
        else if (board[rank+2][file-1].piece !== null && board[rank+2][file-1].color !== color) {
            moves.push({rank: rank+2, file: file-1})
        }
    }
    if(rank-2 >= 0 && file-1 >= 0) {
        if (board[rank-2][file-1].piece == null) {
            moves.push({rank: rank-2, file: file-1})
        }
        else if (board[rank-2][file-1].piece !== null && board[rank-2][file-1].color !== color) {
            moves.push({rank: rank-2, file: file-1})
        }
    }
    if(rank-1 >= 0 && file-2 >= 0) {
        if (board[rank-1][file-2].piece == null) {
            moves.push({rank: rank-1, file: file-2})
        }
        else if (board[rank-1][file-2].piece !== null && board[rank-1][file-2].color !== color) {
            moves.push({rank: rank-1, file: file-2})
        }
    }
    return moves
}

export { analyzeFen, validMoves }