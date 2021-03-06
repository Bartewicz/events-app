import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByMailAndPass } from './reducer'
// UI
import { TextField, RaisedButton } from 'material-ui'

class LogInByMailAndPass extends React.Component {
  state = {
    email: '',
    password: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  passwordHandler = (e, password) =>
    this.setState({ password })

  render() {
    return (
      <div className={'text-center mb-05'}>
        <TextField
          fullWidth={true}
          hintText={'Type your email adress here'}
          inputStyle={{ color: '#0097A7' }}
          name={'email'}
          onChange={this.emailHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.logInByMailAndPass(this.state.email, this.state.password)
            }
          }}
          type={'email'}
        />
        <TextField
          fullWidth={true}
          hintText={'Type your password here'}
          inputStyle={{ color: '#0097A7' }}
          name={'password'}
          onChange={this.passwordHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.logInByMailAndPass(this.state.email, this.state.password)
            }
          }}
          type={'password'}
        />
        <span
          onClick={this.props.toggleRestorePassSection}
          className={'auth-label mb-05'}
        >
          Forgot password?
        </span>
        <RaisedButton
          className={'button-margins'}
          label={'Log in!'}
          onClick={() => this.props.logInByMailAndPass(this.state.email, this.state.password)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.logInByMailAndPass(this.state.email, this.state.password)
            }
          }}
          secondary={true}
        />
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    logInByMailAndPass: (email, password) => dispatch(logInByMailAndPass(email, password))
  })
)(LogInByMailAndPass)