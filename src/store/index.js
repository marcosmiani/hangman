import { configureStore } from 'redux-starter-kit'
import game from './game'
import attempt from './attempt'

const store = configureStore({
  reducer: {
    games: game,
    attempt: attempt
  }
})

export default store