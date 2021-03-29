import React, { useState, useEffect } from 'react'
import Square from './Square'
import { analyzeFen, validMoves } from './helpfunctions'
import './ChessBoard.css'

//fen for initial position, can be changes with other FEN codes
const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
const otherPosition = "r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1"

const ChessBoard = () => {
  const [ board, setBoard ] = useState([])
  const [ clicked, setClicked ] = useState({rank: null, file: null})
  const [ player, setPlayer ] = useState('white')

  //calculate all valid moves
  const calculateAllValidMoves = () => {
    let movesList = []
    for(let rank = 0; rank<board.length; rank++) {
      for(let file = 0; file<board[rank].length; file++) {
        if(board[rank][file].piece != null) {
          movesList.push({key: `${rank}x${file}`, moves: validMoves(rank, file, board[rank][file].piece, board[rank][file].color, board)})
        }
      }
    }
    return movesList
  }
  //list of all valid moves
  const validMoveList = calculateAllValidMoves()

  //set up board after first render
  useEffect(()=> {
    setBoard(analyzeFen(otherPosition))
  },[])

  //handleClick for Square
  const handleClick = (rank, file, piece, color) => {
    let newBoard = [...board]
    
    newBoard.map((rank)=>{
      return rank.map((square) => {
        return square.highlight = false
      })
    })
    //check if the click is valid
    if(clicked.rank == null && piece == null){
      return
    }

    //if a piece is already selected
    else if(clicked.rank !== null){
      //check if move is in validMoveList
      const validMove = validMoveList.find((piece) => {
        return piece.key === `${clicked.rank}x${clicked.file}`
      }).moves.find((move) => {
        return move.rank === rank && move.file === file
      })
      //if move is valid copy piece to new location
      if(validMove) {
        let copyPiece = board[clicked.rank][clicked.file]
        newBoard[rank][file] = copyPiece
        newBoard[clicked.rank][clicked.file] = {piece: null, color: null, icon: null, highlight: false}
        if(player === 'white') {
          setPlayer('black')
        }
        else {
          setPlayer('white')
        }
      }
      //set board with no piece selected
      setClicked({rank: null, file: null})
      setBoard(newBoard)
    }
    //deselect piece if same piece is clicked twice
    else if (clicked.rank === rank && clicked.file === file) {
      setClicked({rank: null, file: null})
      setBoard(newBoard)
    }

    //piece selected and draw valid moves
    else if (color === player) {
      newBoard[rank][file].highlight = true;
      const valid = validMoveList.find((piece) => {
        return piece.key === `${rank}x${file}`
      })
      valid.moves.map((move)=> {
        return newBoard[move.rank][move.file].highlight=true
      })
      setClicked({rank: rank, file: file})
      setBoard(newBoard)
    }
  }

  return (
    <div className="ChessBoard">
      <div className="InnerBoard">
        {board.map((rank, i) => {
          return rank.map((file, j) => {
            let color
            //calculate color
            if((i + j) % 2 === 0){
              color = 'white'
            }
            else {
              color = 'black'
            }
            return (
              <Square 
                key = {`${i}x${j}`} 
                rank = {i} 
                file = {j} 
                color= {color} 
                piece = {file.piece}
                pieceColor = {file.color}
                icon = {file.icon} 
                highlight = {file.highlight}
                handleClick = {handleClick}
              />
            )
          })
        })}
      </div>
    </div>
  )
}

export default ChessBoard;