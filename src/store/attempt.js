import { createReducer, createAction } from 'redux-starter-kit'

const attemptLetter = createAction('ATTEMPT_A_LETTER')

export const attempt = createReducer([], {
  [attemptLetter.type]: (state, action) => {
    const { game = null, letter = '', correct = false } = action.payload
    const newMap = new Map(state)
    const id = state.length + 1
    newMap.set(id, { id, game, letter, correct })
    return [...newMap]
  }
})

export default attempt
