import { useRef, useState } from "react"
import "./App.css"
import Card from "./Card"
import Timer from "./Timer"
import { generateArrayOfRandomNumbers, checkActiveCards } from "./controllers"
let moves = 0;

function App() {

  const [grid, setGrid] = useState(generateArrayOfRandomNumbers(4))
  const [activeTimer, setActiveTimer] = useState(false)
  const [reset, setReset] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  const flipCard = (index: number) => {
    const newGrid = [...grid]
    if (!activeTimer) setActiveTimer(true)
    const cards = checkActiveCards(newGrid)
    if (cards.length === 2) return false
    newGrid[index].status = true
    setGrid(newGrid)
    return true
  }
  const checkIfGameHasFinished = () => grid.every(el => el.status)

  const resetTimer = () => {
    moves = 0;
    setActiveTimer(false)
    setReset(true)
    if (selectRef.current?.value === undefined) return
    setGrid(generateArrayOfRandomNumbers(+selectRef.current?.value))
    setActiveCard(null)
  }
  const keepCardsOpen = (num: number) => {
    const newGrid = [...grid]
    newGrid.map(el => el.number === num ? { ...el, status: true } : el)
    setGrid(newGrid)
    if (checkIfGameHasFinished()) {
      setReset(false)
      setActiveTimer(false)
    }
  }


  const closeWrongCrads = (num: number) => {
    setTimeout(() => {
      setGrid(prev =>
        prev.map(el => el.number === num || el.number === activeCard ?
          { ...el, status: false } : el))


    }, 600)
  }
  const lastClick = (num: number) => {
    if (activeCard === null) return setActiveCard(num)
    if (num === activeCard) keepCardsOpen(num)
    if (num !== activeCard) closeWrongCrads(num)
    moves++;
    setActiveCard(null)
  }

  const changeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetTimer()
    setGrid(generateArrayOfRandomNumbers(+e.target.value))
    moves = 0;

  }
  return <>
    <Timer activeTimer={activeTimer} reset={reset} />
    <div className="details">
      <select name="" id="" ref={selectRef} onChange={changeMode}>
        <option value="4">Eeasy</option>
        <option value="6">Medium</option>
        <option value="8">Hard</option>
      </select>
      <div>moves={moves}</div>
    </div>
    <div className="grid">

      {grid.map((el, i) =>
        <Card key={i} flipCard={flipCard}
          num={el.number} index={i} cardisActive={el.status}
          lastClick={lastClick} />
      )}


    </div>
    <div className="buttons">

      <button onClick={resetTimer}>New Game</button>
    </div>
  </>
}

export default App;
