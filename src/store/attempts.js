import { createReducer, createAction, combineReducers } from 'redux-starter-kit'

export const attempt = createAction('ATTEMPT_A_LETTER')
export const clear = createAction('CLEAR_ATTEMPTS')

// We use an array to transform it into a map, making easy to identify letters and state
const list = createReducer(
  [],
  {
    [attempt.type]: (state, action) => {
      const { letter = '', matches = [] } = action.payload
      const attemptMap = new Map(state)
      attemptMap.set(letter, matches.length)
      return [...attemptMap]
    },
    [clear.type]: () => []
  }
)

const strikes = createReducer(
  5,
  {
    [clear.type]: () => 5,
    [attempt.type]: (state, { payload: { matches } }) => {
      return state - (matches.length ? 0 : 1)
    }
  }
)

const matches = createReducer(
  0,
  {
    [clear.type]: () => 0,
    [attempt.type]: (state, { payload: { matches } }) => {
      return state + matches.length
    }
  }
)

export default combineReducers({
  list,
  strikes,
  matches
})
