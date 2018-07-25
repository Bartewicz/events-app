import React from 'react'
// UI
import { RaisedButton } from 'material-ui'

const LogInByGoogle = (props) => (
  <div>
    <RaisedButton
      className={'button-margins mb-05'}
      label={'Log in by Google!'}
      onClick={props.onLogInClick}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          props.onLogInClick()
        }
      }}
      secondary={true}
    />
  </div>
)

export default LogInByGoogle