import React from 'react'
// UI
import { RaisedButton } from 'material-ui'

const LogInByGoogle = (props) => (
  <RaisedButton
  className={'button-margins'}
    label={'Log in by Google!'}
    onClick={props.onLogInClick}
    secondary={true}
  />
)

export default LogInByGoogle