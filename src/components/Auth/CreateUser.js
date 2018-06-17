import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { createUser } from './reducer'
// UI
import { TextField, RaisedButton } from 'material-ui'

class LogInByMailAndPass extends React.Component {
  state = {
    email: '',
    password: '',
    passwordRetyped: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  passwordHandler = (e, password) =>
    this.setState({ password })

  passwordRetypedHandler = (e, passwordRetyped) =>
    this.setState({ passwordRetyped })

  render() {
    return (
      <div
        className={'text-center'}
      >
        <h3>Fill all fields below to create an account and login:</h3>
        <TextField
          fullWidth={true}
          hintText={'Type your email adress here'}
          onChange={this.emailHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)
            }
          }}
          name={'email'}
          type={'email'}
        />
        <TextField
          fullWidth={true}
          hintText={'Type your password here'}
          onChange={this.passwordHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)
            }
          }}
          name={'password'}
          type={'password'}
        />
        <TextField
          fullWidth={true}
          hintText={'Retype your password here'}
          name={'password-retyped'}
          onChange={this.passwordRetypedHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)
            }
          }}
          type={'password'}
        />
        <RaisedButton
          className={'button-margins'}
          label={'Sign up and log in!'}
          onClick={() => this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)
            }
          }}
          secondary={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, passwordRetyped) => dispatch(createUser(email, password, passwordRetyped))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInByMailAndPass)