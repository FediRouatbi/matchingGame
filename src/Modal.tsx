import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { cardActions } from './store/CardsSlice';

const Modal = () => {

    const state = useSelector((state: RootState) => state.cards)
    const win = state.win
    const sec = state.timer.sec;
    const min = state.timer.min;
    const moves = state.moves;

    const dispatch = useDispatch()
    const playAgain = (e: MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget || (e.target as HTMLButtonElement).tagName === "BUTTON")
            dispatch(cardActions.resetGame())

    }

    if (!win) return null
    return createPortal(
        <div className="modal" onClick={playAgain}>

            <div className='modal__info'>
                <div>Congrats 🎉🎉</div >
                <div> You just won the game within {`${min ? min + " min and" : ""}`}  {sec} seconds  in  {moves} shots.</div>
                <button >Ok</button>
            </div>
        </div >
        , document.body);
}

export default Modal;