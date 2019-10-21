import { createReducer, createAction } from 'redux-starter-kit'

export const start = createAction('START_GAME')
export const fail = createAction('FAIL_GAME')
export const win = createAction('WIN_GAME')

// List of available words
const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']

const stopGame = (reason) => (state) => {
  return {
    ...state,
    status: reason
  }
}

export const game = createReducer({ word: '', status: null }, {
  [start.type]: () => {
    const index = Math.floor(Math.random() * 5) + 1
    return {
      word: words[index],
      status: 'started'
    }
  },
  [fail.type]: stopGame('fail'),
  [win.type]: stopGame('win')
})

export default game
