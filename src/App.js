import React from 'react'
import logo from './logo.svg'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { startGame } from './store/game'
import { attemptLetter } from './store/attempts'
import styled, { createGlobalStyle } from 'styled-components'
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
    margin-top: 30px;

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

const connector = connect(
  state => ({
    word: get(state, 'game.word'),
    status: get(state, 'game.status'),
    attempts: new Map(get(state, 'attempts', []))
  })
)

export const App = (props) => {
  const { dispatch, word, attempts } = props

  const onKeyPress = letter => {
    console.log("Button pressed", letter);
    dispatch(attemptLetter({
      letter,
      correct: word.indexOf(letter) !== -1
    }))
  }

  return (
    <AppWrapper>
      <GlobalStyle />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Body>
        <p>
          {word && [...word].map((letter, index) => (
            <Letter key={index} letter={letter} show={attempts.has(letter)} />
          ))}
        </p>
        <Button onClick={() => dispatch(startGame())} >START</Button>
        {word && <Keyboard
          theme={"hg-theme-default hg-layout-default"}
          layoutName='default'
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "1 2 3 4 5 6 7 8 9 0",
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "z x c v b n m",
            ]
          }}
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "Q W E R T Y q w e r t y"
            },
            {
              class: "hg-highlight",
              buttons: "Q q"
            }
          ]}
        />}
      </Body>
    </AppWrapper>
  )
}

export default connector(App)
