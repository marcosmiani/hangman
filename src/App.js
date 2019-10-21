import React from 'react'
import logo from './logo.svg'
import { connect } from 'react-redux'
import { startGame } from './store/game'
import './App.css'

export const App = (props) => {
  const { dispatch } = props
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => dispatch(startGame())} >START</button>
      </header>
    </div>
  )
}

export default connect()(App)
