import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
import { clearError } from './components/Alerts/reducer'
// Components
import AppBar from './components/AppBar'
import Snackbar from 'material-ui/Snackbar'
// UI
import './ui/App.css'
import BottomNavigation from './components/BottomNavigation'
import CreateEvent from './components/CreateEvent/CreateEvent'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <CreateEvent />
        <Snackbar
          autoHideDuration={4000}
          open={this.props.imWithAlert}
          message={this.props.alert}
          bodyStyle={{ backgroundColor: "gray", textAlign: 'center' }}
          onRequestClose={this.props.clearError}
        />
        <BottomNavigation />
      </div>
    )
  }
}

export default connect(
  state => ({
    imWithAlert: state.alerts.imWithAlert,
    alert: state.alerts.alert
  }),
  dispatch => ({
    clearError: () => dispatch(clearError())
  })
)(App)