import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { restorePassword } from './reducer'
// UI
import { TextField, RaisedButton } from 'material-ui'

class RestorePassword extends React.Component {
  state = {
    email: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  render() {
    return (
      <div
        className={'text-center'}
      >
        <div
          className={'wrapper'}
        >
          <h3>Type your email addres below to restore password:</h3>
          <TextField
            onChange={this.emailHandler}
            name={'email'}
            type={'email'}
            hintText={'Type your email adress here'}
            fullWidth={true}
          />
        </div>
        <RaisedButton
          onClick={() => this.props.restorePassword(this.state.email)}
          label={'Log in!'}
          secondary={true}
          className={'button-margins'}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  restorePassword: (email) => dispatch(restorePassword(email))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePassword)