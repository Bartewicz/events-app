import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
import CreateEvent from './components/CreateEvent/'
import Dashboard from './components/Dashboard/'
import EditEvent from './components/EditEvent'

class App extends Component {
  render() {
    return (
      <div>
        <Auth>
          <Router>
            <div>
              <AppBar
                pathname={this.props.match}
              />
              <Route exact strict
                path={'/'}
                component={Dashboard}
              />
              <Route exact
                path={'/create-event'}
                component={CreateEvent}
              />
              <Route exact
                path={'/edit-event/:key'}
                component={EditEvent}
              />
              <BottomNavigation />
            </div>
          </Router>
        </Auth>
        <Snackbar
          className={'snackbar'}
          autoHideDuration={4000}
          open={this.props.imWithAlert}
          message={this.props.alert}
          bodyStyle={{
            backgroundColor: "gray",
            height: 'auto',
            whiteSpace: 'pre-line',
            textAlign: 'center',
            borderRadius: '10px 10px 0 0',
            padding: '12px',
            marginBottom: this.props.isUserLoggedIn ? '56px' : '0'
          }}
          contentStyle={{
            lineHeight: '24px'
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