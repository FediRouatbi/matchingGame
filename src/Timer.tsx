import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./store/index"
import { cardActions } from "./store/CardsSlice"

export default function Timer() {

  const timer = useSelector((state: RootState) => state.cards.timer)
  const sec = timer.sec
  const min = timer.min
  const activeTimer = timer.active
  const dispatch = useDispatch()


  useEffect(() => {
    let timer: any = null;
    if (activeTimer)
      timer = setInterval(() =>
        dispatch(cardActions.incrementTimer())
        , 1000)

    return () => {
      clearInterval(timer);

    }

  }, [activeTimer])


  return <div className="timer">{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}</div>

}