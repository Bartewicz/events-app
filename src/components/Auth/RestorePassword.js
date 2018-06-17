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
        <h3>Type your email addres below to restore password:</h3>
        <TextField
          fullWidth={true}
          hintText={'Type your email adress here'}
          inputStyle={{ color: '#0097A7' }}
          onChange={this.emailHandler}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.restorePassword(this.state.email)
            }
          }}
          name={'email'}
          type={'email'}
        />
        <RaisedButton
          className={'button-margins'}
          label={'Log in!'}
          onClick={() => this.props.restorePassword(this.state.email)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.restorePassword(this.state.email)
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
  restorePassword: (email) => dispatch(restorePassword(email))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePassword)