import React from 'react'
// Redux
import { connect } from 'react-redux'
import { logInByGoogle } from './reducer'
// Components
import AppBar from '../AppBar'
import LogInByGoogle from './LogInByGoogle'
import RestorePassword from './RestorePassword'
import CreateUser from './CreateUser'
// UI
import PaperRefined from '../../ui/PaperRefined'
import LogInByMailAndPass from './LogInByMailAndPass'

class Auth extends React.Component {
  state = {
    isRestorePasswordOpen: true,
    isSingUpOpen: false
  }

  toggleSignUpSection = () =>
    this.setState({ isSingUpOpen: !this.state.isSingUpOpen })

  toggleRestorePassSection = () =>
    this.setState({ isRestorePasswordOpen: !this.state.isRestorePasswordOpen })

  render() {
    return (
      <div>
        {
          this.props.isUserLoggedIn ?
            this.props.children
            :
            <div>
              <AppBar />
              <PaperRefined centered>
                <div className={'wrapper'}>
                  <h3>Welcome to</h3>
                  <h1>Eve</h1>
                  <h3>best events organiser</h3>
                  <span>
                    Log in to start:
                  </span>
                  <LogInByMailAndPass
                    toggleRestorePassSection={this.toggleRestorePassSection}
                  />
                  <span>
                    or
                  </span>
                  <br />
                  <LogInByGoogle
                    onLogInClick={this.props.logInByGoogle}
                  />
                  <br />
                  <span
                    className={'auth-label'}
                    onClick={this.toggleSignUpSection}
                  >
                    Don't have any account yet?
                  </span>
                  <br />
                  {
                    this.state.isRestorePasswordOpen ?
                      <div>
                        <RestorePassword />
                      </div>
                      :
                      <div></div>
                  }
                  {
                    this.state.isSingUpOpen ?
                      <div>
                        <CreateUser />
                      </div>
                      :
                      <div></div>
                  }
                </div>
              </PaperRefined>
            </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    logInByGoogle: () => dispatch(logInByGoogle()),
  })
)(Auth)