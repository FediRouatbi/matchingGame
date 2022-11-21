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

    const playAgain = () => {
        dispatch(cardActions.resetGame())
    }
    if (!win) return null
    return createPortal(
        <div className="modal">
            <div className='modal__info'>
                <div>Congrats 🎉🎉</div >
                <div> you just won the game on {`${min ? min + " min and" : ""}`}  {sec}sec with {moves} moves</div>
                <button onClick={playAgain}>Ok</button>
            </div>
        </div>
        , document.body);
}

export default Modal;