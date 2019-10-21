import { configureStore } from 'redux-starter-kit'
import game from './game'
import attempts from './attempts'

const store = configureStore({
  reducer: {
    game,
    attempts: attempts
  }
})

export default store