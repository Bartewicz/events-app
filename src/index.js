import React from 'react'
import ReactDOM from 'react-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Components
import App from './App'
// Material-UI Provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// UI
import './ui/index.css'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Auth>
        <App />
      </Auth>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'))
