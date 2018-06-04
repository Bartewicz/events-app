import React from 'react'
import ReactDOM from 'react-dom'
import './ui/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// Material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'))
registerServiceWorker()
