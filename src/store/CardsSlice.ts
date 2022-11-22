import { createSlice } from "@reduxjs/toolkit";
import { generateArrayOfRandomNumbers } from "../controllers"
type cardState = {
    cards: { number: number, status: boolean }[],
    difficulty: number,
    moves: number,
    timer: { min: number, sec: number, active: boolean }
    matchedCards: number[]
    win: boolean

}

const initialState: cardState = {
    cards: generateArrayOfRandomNumbers(4),
    difficulty: 4, moves: 0,
    timer: { min: 0, sec: 0, active: false }, matchedCards: [], win: false
}

const Cardsslice = createSlice({
    name: 'Cards',
    initialState,
    reducers: {

        incrementTimer(state) {

            if (state.timer.sec === 59) {
                state.timer.sec = 0
                state.timer.min++
            }
            else
                state.timer.sec++
        }
        ,
        resetGame(state) {
            return {
                ...state,
                cards: generateArrayOfRandomNumbers(state.difficulty),
                moves: 0,
                timer: { min: 0, sec: 0, active: false }, matchedCards: [], win: false
            }
        },
        activateTimer(state) {
            state.timer.active = true
        }
        , flipCard(state, action) {
            if (!state.timer.active) state.timer.active = true
            const index = action.payload
            state.cards[index].status = true
            state.matchedCards.push(index)


        }, checkEquality(state, action) {
            const activeCardIndex = state.matchedCards[0];
            const nextCardIndex = action.payload
            const activeCard = state.cards[activeCardIndex].number
            const nextCard = state.cards[nextCardIndex].number
            if (activeCard === nextCard) state.matchedCards = []
            state.moves++
        }

        , closeCards(state,) {
            if (!state.matchedCards.length) return

            const activeCardIndex = state.matchedCards[0];
            const nextCardIndex = state.matchedCards[1]

            state.cards[activeCardIndex].status = false
            if (typeof nextCardIndex === "number") state.cards[nextCardIndex].status = false

            state.matchedCards = []


        },
        changeDifficulty(state, action) {
            const difficulty = action.payload
            state.difficulty = difficulty;
            state.cards = generateArrayOfRandomNumbers(difficulty)

        }, checkForWin(state) {
            const wining = state.cards.every(el => el.status)
            if (wining) {
                state.timer.active = false;
                state.win = true
            }
        }



    },
})

const cardReducer = Cardsslice.reducer
export default cardReducer;
export const cardActions = Cardsslice.actions 