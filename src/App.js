import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
import { clearError } from './components/Alerts/reducer'
// Components
import Auth from './components/Auth'
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
        <Auth>
          <AppBar />
          <CreateEvent />
          <BottomNavigation />
        </Auth>
        <Snackbar
          className={'snackbar'}
          autoHideDuration={4000}
          open={this.props.imWithAlert}
          message={this.props.alert}
          bodyStyle={{
            backgroundColor: "gray",
            textAlign: 'center',
            borderRadius: '10px 10px 0 0',
            marginBottom: this.props.isUserLoggedIn ? '56px' : '0'
          }}
          onRequestClose={this.props.clearError}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    imWithAlert: state.alerts.imWithAlert,
    alert: state.alerts.alert
  }),
  dispatch => ({
    clearError: () => dispatch(clearError())
  })
)(App)