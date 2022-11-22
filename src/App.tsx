import { useRef, useState } from "react"
import "./App.css"
import Card from "./Card"
import Timer from "./Timer"
import Modal from "./Modal"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./store/index"
import { cardActions } from "./store/CardsSlice"




function App() {
  const selectRef = useRef<HTMLSelectElement>(null)
  const grid = useSelector((state: RootState) => state.cards.cards)
  const moves = useSelector((state: RootState) => state.cards.moves)
  const dispatch = useDispatch()

  const resetGame = () => {
    dispatch(cardActions.resetGame())
  }
  const updateGrid = () => {
    if (!selectRef.current) return
    dispatch(cardActions.changeDifficulty(+selectRef.current.value))
    resetGame()
  }


  return <>
    <Timer />
    <div className="details">
      <select name="" id="" className="select" ref={selectRef} onChange={updateGrid}  >
        <option value="4">Eeasy</option>
        <option value="6">Medium</option>
        <option value="8">Hard</option>
      </select>
      <div>moves:{moves}</div>
    </div>
    <div className="grid">

      {grid.map((el, i) =>
        <Card {...el} index={i} key={i} />
      )}


    </div>
    <div className="buttons">
      <button onClick={resetGame}>New Game</button>
    </div>
    <Modal />
  </>
}

export default App;
