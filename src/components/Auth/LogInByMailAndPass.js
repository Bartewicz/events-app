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
      <div>
        <TextField
          fullWidth={true}
          hintText={'Type your email adress here'}
          name={'email'}
          onChange={this.emailHandler}
          type={'email'}
        />
        <TextField
          fullWidth={true}
          hintText={'Type your password here'}
          name={'password'}
          onChange={this.passwordHandler}
          type={'password'}
        />
        <span
          onClick={this.props.toggleRestorePassSection}
          className={'auth-label'}
        >
          Forgot password?
        </span>
        <RaisedButton
          className={'button-margins'}
          label={'Log in!'}
          onClick={() => this.props.logInByMailAndPass(this.state.email, this.state.password)}
          secondary={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  logInByMailAndPass: (email, password) => dispatch(logInByMailAndPass(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInByMailAndPass)