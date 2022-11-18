import { useRef, useState } from "react"
import "./App.css"
import Card from "./Card"
import Timer from "./Timer"
import { generateArrayOfRandomNumbers } from "./controllers"
let moves = 0;
function App() {

  const [grid, setGrid] = useState(generateArrayOfRandomNumbers(4))
  const [activeTimer, setActiveTimer] = useState(false)
  const [reset, setReset] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const startGame = () => {
    setActiveTimer(prev => !prev);
    setReset(false)
  }
  const showCard = (index: number) => {
    if (!activeTimer) setActiveTimer(true)
    const newGrid = [...grid]
    const activeCards = newGrid.filter(el => el.status === true).map(el => el.number).sort();

    let cards = []
    for (let i = 0; i < activeCards.length; i++) {
      if (activeCards[i] === activeCards[i + 1] || activeCards[i] === activeCards[i - 1]) continue
      cards.push(activeCards[i])
    }
    if (cards.length === 2) return false
    newGrid[index].status = true
    setGrid(newGrid)
    return true
  }

  const resetTimer = () => {
    moves = 0;
    setActiveTimer(false)
    setReset(true)
    if (selectRef.current?.value === undefined) return
    setGrid(generateArrayOfRandomNumbers(+selectRef.current?.value))
    setActiveCard(null)
  }
  const lastClick = (num: number) => {

    if (activeCard === null) return setActiveCard(num)
    if (num === activeCard) {

      const newGrid = [...grid]
      newGrid.map(el => el.number === num ? { ...el, status: true } : el)
      setGrid(newGrid)
      if (grid.every(el => el.status)) {

        setActiveTimer(false)
      }

    }
    else {

      setTimeout(() => {
        setGrid(prev =>
          prev.map(el => el.number === num || el.number === activeCard ?
            { ...el, status: false } : el))


      }, 600)

    }
    moves++;
    setActiveCard(null)
  }

  const changeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setGrid(generateArrayOfRandomNumbers(+e.target.value))
    moves = 0;

  }
  return <>
    <Timer activeTimer={activeTimer} reset={reset} />
    <div>moves={moves}</div>
    <select name="" id="" ref={selectRef} onChange={changeMode}>
      <option value="4">Eeasy</option>
      <option value="6">Medium</option>
      <option value="8">Hard</option>
    </select>
    <div className="grid">

      {grid.map((el, i) => <Card key={i} showCard={showCard} num={el.number} index={i} show={el.status} lastClick={lastClick} />)}


    </div>
    <button onClick={startGame}>{activeTimer ? "Pause" : "Start"} Game</button>
    <button onClick={resetTimer}>New Game</button></>
}

export default App;
