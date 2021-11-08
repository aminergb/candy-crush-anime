import { useState, useEffect } from 'react'
import blank from '../../assets/blank.png'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import Slot from '../Slot/Slot'

function Game({ width, candyImages }) {
  const [currentBoard, setcurrentBoard] = useState([])
  const [objDragged, setObjDragged] = useState(null)
  const [objReplaced, setObjReplaced] = useState(null)
  const [Score, setScore] = useState(0)
//check for the row if it's four :
  const isRowFour = () => {
    //setting the invalidRows
    const invalidRows = setInvalidRows(width, 3)
    for (let i = 0; i < width * width; i++) {
      const cols = [i, i + width, i + width * 2, i + width * 3]
      const currentColor = currentBoard[i]
    
      if (invalidRows.includes(i)) continue
      //check if the currentboard[i] element is blank
      const isBlank = currentBoard[i] === blank
      if (cols.every(index => currentBoard[index] === currentColor && !isBlank)) {
        setScore((score) => score + 4)

        cols.forEach(index => currentBoard[index] = blank)
        return true
      }

    }
  }
  //function to generate the invalid rows
  const setInvalidRows = (width, offset) => {
    const invalidRows = []
    let indexOfInvalid = width - offset;
    while (indexOfInvalid < width * width) {
      invalidRows.push(indexOfInvalid)
      invalidRows.push(indexOfInvalid + 1)
      indexOfInvalid = indexOfInvalid + width

    }
    return invalidRows
  }
  //check the rows if there is a a sequence of the same element in a row of three
  const isRowThree = () => {

    const invalidRows = setInvalidRows(width, 2)

    for (let i = 0; i < width * width; i++) {
      const rowThree = [i, i + 1, i + 2]
      const currentColor = currentBoard[i]
      if (invalidRows.includes(i)) continue
      const isBlank = currentBoard[i] === blank
      if (rowThree.every(index => currentBoard[index] === currentColor && !isBlank)) {
        setScore((score) => score + 3)
        rowThree.forEach(index => currentBoard[index] = blank)
        return true;
      }

    }
  }
    //check the column if there is a a sequence of the same element in a column of three
  const isColThree = () => {
    for (let i = 0; i <= 47; i++) {
      const colThree = [i, i + width, i + width * 2]
      const currentColor = currentBoard[i]
      const isBlank = currentBoard[i] === blank
      if (colThree.every(index => currentBoard[index] === currentColor && !isBlank)) {
        setScore((score) => score + 3)
        colThree.forEach(index => currentBoard[index] = blank)
        return true
      }

    }
  }
      //check the column if there is a a sequence of the same element in a column of four
  const isColFour = () => {

    for (let i = 0; i <= 39; i++) {
      const colThree = [i, i + width, i + width * 2, i + width * 3]
      const currentColor = currentBoard[i]
      const isBlank = currentBoard[i] === blank
      if (colThree.every(index => currentBoard[index] === currentColor && !isBlank)) {
        setScore((score) => score + 4)
        colThree.forEach(index => currentBoard[index] = blank)
        return true
      }

    }
  }
  //get the elements to fall and replace the empty blanks
  const getThemToFall = () => {
    for (let i = 0; i < ((width * width) - width); i++) {
      //below element
      const isFirstRow = [...Array.from(Array(width).keys())].includes(i)
      if (isFirstRow && currentBoard[i] === blank) {
        let randNumber = Math.floor(Math.random() * candyImages.length)
        currentBoard[i] = candyImages[randNumber]

      }


      if (currentBoard[i + width] === blank) {
        currentBoard[i + width] = currentBoard[i]
        currentBoard[i] = blank
      }


    }

  }

  const dragEnd = () => {

    const objDraggedId = parseInt(objDragged.getAttribute('data-id'))
    const objReplacedId = parseInt(objReplaced.getAttribute('data-id'))
    currentBoard[objReplacedId] = objDragged.getAttribute('src')
    currentBoard[objDraggedId] = objReplaced.getAttribute('src')
    const validMoves = [objDraggedId - 1, objDraggedId - width, objDraggedId + 1, objDraggedId + width]
    const isValidMove = validMoves.includes(objReplacedId)


    if (objReplacedId && isValidMove && (isColFour() || isColThree() || isRowFour() || isRowThree())) {
      setObjDragged(null)
      setObjReplaced(null)
    } else {
      currentBoard[objReplacedId] = objReplaced.getAttribute('src')
      currentBoard[objDraggedId] = objDragged.getAttribute('src')
      setcurrentBoard([...currentBoard])
    }
  }

//creating the board
  const createBoard1 = (width) => {
    const theBoard = []
    for (let i = 0; i < width * width; i++) {

      const randomNumb = Math.floor(Math.random() * candyImages.length)
      const randomColor = candyImages[randomNumb]
      theBoard.push(randomColor)
    }
    return theBoard
  }
  //using a side effect after the render
  useEffect(() => {
    setcurrentBoard(createBoard1(width))

  }, [])

  useEffect(() => {

    const timer = setInterval(() => {
      isColFour()
      isRowFour()
      isColThree()
      isRowThree()
      getThemToFall()

      setcurrentBoard([...currentBoard])

    }, 150);
    return () => clearInterval(timer)
  }, [isColThree, isColFour, isRowThree, isRowFour, getThemToFall])
  return (
    <div className="game">
      <ScoreBoard score={Score} />
      <div className="matrix">
        {currentBoard.map((candyColor, index) => {
          return <Slot
            index={index}
            candyColor={candyColor}
            setObjDragged={(el) => setObjDragged(el)}
            setObjReplaced={(el) => setObjReplaced(el)}
            onDragEnd={dragEnd} />

        })} </div>
    </div>
  );
}

export default Game;
