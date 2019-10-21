import { createReducer, createAction } from 'redux-starter-kit'

export const attemptLetter = createAction('ATTEMPT_A_LETTER')

export const attempts = createReducer([], {
  [attemptLetter.type]: (state, action) => {
    const { letter = '', correct = false } = action.payload
    const attemptMap = new Map(state)
    attemptMap.set(letter, correct)
    return [...attemptMap]
  }
})

export default attempts
