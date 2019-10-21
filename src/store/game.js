import { createReducer, createAction } from 'redux-starter-kit'

export const startGame = createAction('START_GAME')
export const failGame = createAction('FAIL_GAME')
export const winGame = createAction('WIN_GAME')

const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']

const stopGame = (gameState) => (state) => {
  return {
    ...state,
    state: gameState
  }
}

export const game = createReducer({ word: '', state: null }, {
  [startGame.type]: () => {
    const index = Math.floor(Math.random() * 5) + 1
    return {
      word: words[index],
      state: 'started'
    }
  },
  [failGame.type]: stopGame('fail'),
  [winGame.type]: stopGame('fail')
})

export default game
