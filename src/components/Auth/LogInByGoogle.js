import React from 'react'
// UI
import { RaisedButton } from 'material-ui'

const LogInByGoogle = (props) => (
  <div>
    <RaisedButton
      className={'button-margins'}
      label={'Log in by Google!'}
      onClick={props.onLogInClick}
      secondary={true}
    />
  </div>
)

export default LogInByGoogle