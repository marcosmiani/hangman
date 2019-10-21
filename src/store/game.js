import { createReducer, createAction } from 'redux-starter-kit'

export const startGame = createAction('START_GAME')
export const failGame = createAction('FAIL_GAME')
export const winGame = createAction('WIN_GAME')

const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']

const stopGame = (gameState) => (state, action) => {
  const { game = null } = action.payload
  const previousMap = new Map(state)
  const previousGame = previousMap.get(game)

  const newMap = new Map(...state)
  newMap.set(previousGame.id, { ...previousGame, state: gameState })
  return [...newMap]
}

export const game = createReducer([], {
  [startGame.type]: (state) => {
    const index = Math.floor(Math.random() * 6) + 1
    const newMap = new Map(state)
    const id = state.length + 1
    newMap.set(id, { id, word: words[index], state: 'started' })
    return [...newMap]
  },
  [failGame.type]: stopGame('fail'),
  [winGame.type]: stopGame('fail')
})

export default game
