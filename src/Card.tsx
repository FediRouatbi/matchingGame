import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./store/index"
import { cardActions } from "./store/CardsSlice"

type CardProps = {
  number: number,
  status: boolean,
  index: number,
}


export default function Card({ number, status, index }: CardProps) {
  const dispatch = useDispatch()
  const openCardsLength = useSelector((state: RootState) => state.cards.matchedCards.length)

  const handelCardCLick = () => {

    if (status) return
    if (openCardsLength === 2) return

    dispatch(cardActions.flipCard(index))


    if (openCardsLength === 1) {

      dispatch(cardActions.checkEquality(index))

      setTimeout(() => {
        dispatch(cardActions.closeCards())
        dispatch(cardActions.checkForWin())
        
      }, 600)
    }

  }



  return (<div className={`card ${status ? "rotate" : ""}`}
    onClick={handelCardCLick}>
    <div className="backCard">?</div>
    <img className="img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`} />
  </div >)
}
