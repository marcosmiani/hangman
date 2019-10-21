import React from 'react'
import logo from './logo.svg'
import { connect } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { startGame, attemptLetter } from './store/api'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

const LetterSpan = styled.button`
  font-size: 24px;
  color: white;
`

const Letter = ({ letter, show }) => (
  <LetterSpan>
    {show ? letter : '_'}
  </LetterSpan>
)

const AppWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);

  .App-logo {
    height: 40vmin;
  }
`

const Body = styled.div`
  text-align: center;
  width: calc(100vw - 20px);
  max-width: 600px;

  .hg-theme-default {
    color: black;
    margin: 30px 0;

    & .hg-button{
      &.hg-red {
        background: darkred;
        color: white;
      }
      &.hg-highlight {
        background: darkblue;
        color: white;
      }
    }
  }
`

const Button = styled.button`
  background-color: transparent;
  border: 2px solid white;
  border-radius: 2px;
  color: white;
`

/**
 * Returns the color that matches the game status
 * @param {props} param0
 */
const getStatusColor = ({ status }) => {
  switch(status) {
    case 'started':
      return 'lightgreen'
    case 'fail':
      return 'red'
    case 'win':
      return 'lightgreen'
    default:
      return 'transparent'
  }
}

const Status = styled.div`
  border: 2px solid ${getStatusColor};
  min-height: 20px;
  border-radius: 8px;
  margin: 26px;
  padding: 2px;
  text-transform: capitalize;
  color: ${getStatusColor};
`

const Strikes = styled.div`
  border: 2px solid red;
  min-height: 20px;
  border-radius: 8px;
  color: white;
`
// Default keyboard layout
const defaultLayout = [
  "1 2 3 4 5 6 7 8 9 0",
  "q w e r t y u i o p",
  "a s d f g h j k l",
  "z x c v b n m",
]

/**
 * Returns the highlighted letters on the keyboard on theme shape ofr the keyboard
 * @param {array} attempts
 */
const getKeyboardThemes = (attempts) => {
  const [failLetters, matchedLetters] = attempts.reduce(
    ([fails, matches], [letter, match]) => {
      return match
        ? [fails, matches + ' ' + letter]
        : [fails + ' ' + letter, matches]
    },
    ['', '']
  )

  // Add themes on the keyboard as needed
  const buttonTheme = []
  if (failLetters) {
    buttonTheme.push({
      class: "hg-red",
      buttons: failLetters
    })
  }
  if (matchedLetters) {
    buttonTheme.push({
      class: "hg-highlight",
      buttons: matchedLetters
    })
  }

  return buttonTheme
}

const connector = connect(
  state => ({
    word: state.game.word,
    status: state.game.status,
    attempts: state.attempts.list,
    strikes: state.attempts.strikes
  })
)

export const App = (props) => {
  const { dispatch, word, attempts, status, strikes } = props

  const onKeyPress = letter => {
    dispatch(attemptLetter(letter))
  }

  // Map the letters to ease its use
  const letterMap = new Map(attempts)

  return (
    <AppWrapper>
      <GlobalStyle />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Status status={status}>{status}</Status>
        <Strikes>Strikes: {strikes}</Strikes>
      </header>
      <Body>
        <p>
          {word && [...word].map((letter, index) => (
            <Letter key={index} letter={letter} show={letterMap.has(letter)} />
          ))}
        </p>
        {word && <Keyboard
          theme={"hg-theme-default hg-layout-default"}
          layoutName='default'
          onKeyPress={onKeyPress}
          layout={{ default: defaultLayout }}
          buttonTheme={getKeyboardThemes(attempts)}
        />}
        <Button onClick={() => dispatch(startGame())} >
          {!status ? 'START' : 'RESTART'}
        </Button>
      </Body>
    </AppWrapper>
  )
}

export default connector(App)
