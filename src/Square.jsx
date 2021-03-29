import React from 'react'

const Square = ({color, rank, file, piece, pieceColor, icon, highlight, handleClick}) => {

    const handleClickedSquare = () => {
        handleClick(rank, file, piece, pieceColor)
    }

    const squareClass = () => {
        if(highlight) {
            return `square highlight`
        }
        else{
            return `square ${color}`
        }
    }

    const content = () => {
        if(icon){
            return <img src={icon} alt={piece} />
        }
    }
    
    return (
        <div className={squareClass()} onClick={handleClickedSquare}>
            {content()}
        </div>
    )
}

export default Square