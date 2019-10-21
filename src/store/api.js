import { clear, attempt } from './attempts'
import { start, fail, win } from './game'

export const startGame = () => (dispatch) => {
  dispatch(clear())
  dispatch(start())
}

export const attemptLetter = (letter) => (dispatch, getState) => {
  const { game: { word } } = getState()
  const exp = new RegExp(letter, 'gi')
  const letterMatches = word.match(exp)

  dispatch(attempt({
    letter,
    matches: letterMatches || []
  }))

  const { attempts: { strikes, matches }, game: { status } } = getState()

  if (status === 'started') {
    if (strikes <= 0) {
      dispatch(fail())
    } else if (matches >= word.length) {
      dispatch(win())
    }
  }
}
