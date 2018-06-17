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
import logoBig from '../../img/logo-big.gif'
import PaperRefined from '../../ui/PaperRefined'
import LogInByMailAndPass from './LogInByMailAndPass'
import QuestionAnswer from 'material-ui/svg-icons/action/help-outline'

class Auth extends React.Component {
  state = {
    isRestorePasswordOpen: false,
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
            <main>
              <AppBar />
              <PaperRefined centered>
                <div className={'auth-wrapper'}>
                  <h3 className={'no-margin-top'}>Welcome to</h3>
                  <img className={'logo-big'} src={logoBig} alt={'Logo'} />
                  <h1>Eve</h1>
                  <h3 className={'no-margin-top'}>
                    <em>probably best events organiser</em>
                  </h3>
                  <span>
                    Log in to start:
                      <div
                      className={'help-icon'}
                    >
                      <QuestionAnswer
                        color={'#808080'}
                      />
                      <span
                        className={'tooltip'}
                      >
                        <em>
                          You can try this: trial@event.app password123
                        </em>
                      </span>
                    </div>
                  </span>
                  <LogInByMailAndPass
                    toggleRestorePassSection={this.toggleRestorePassSection}
                  />
                  <span>
                    or
                  </span>
                  <LogInByGoogle
                    onLogInClick={this.props.logInByGoogle}
                  />
                  <span
                    className={'auth-label'}
                    onClick={this.toggleSignUpSection}
                  >
                    Don't have any account yet?
                  </span>
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
            </main>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isUserLoggedIn
  }),
  dispatch => ({
    logInByGoogle: () => dispatch(logInByGoogle()),
  })
)(Auth)