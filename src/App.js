import React, { Component } from 'react'
// Components
import AppBar from './components/AppBar'
// UI
import './ui/App.css'
import style from './ui/style'
import BottomNavigation from './components/BottomNavigation';
import CreateEvent from './components/CreateEvent/CreateEvent';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <h1 style={style.centered}>
          Hello, World!
        </h1>
        <CreateEvent />
        <BottomNavigation />
      </div>
    )
  }
}

export default App