import { configureStore } from 'redux-starter-kit'
import game from './game'
import attempts from './attempts'
import scores from './scores'

const store = configureStore({
  reducer: {
    game,
    attempts,
    scores
  }
})

export default store