import { createReducer, createAction, combineReducers } from 'redux-starter-kit'

export const set = createAction('SET_SCORE')

const highest = createReducer(0, {
  [set.type]: (state, action) => {
    return action.payload > state ? action.payload : state
  }
})

const latest = createReducer(0, {
  [set.type]: (state, action) => {
    return action.payload
  }
})

export default combineReducers({
  highest,
  latest
})
