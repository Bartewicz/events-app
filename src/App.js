import React, { Component } from 'react'
// Components
import AppBar from './components/AppBar'
// UI
import './ui/App.css'
import style from './ui/style'

class App extends Component {
  render() {
    return (
      <div style={style.centered}>
        <AppBar />
        <h1>
          Hello, World!
        </h1>
      </div>
    )
  }
}

export default App