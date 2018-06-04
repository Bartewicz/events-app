import React from 'react'
// UI
import logo from '../img/logo.gif'
import style from '../ui/style'
import IconButton from 'material-ui/IconButton'
import Power from 'material-ui/svg-icons/action/power-settings-new'

export default (props) => (
  <div className={'appbar'}>
    <div>
      <img className={'logo'} src={logo} alt={'Logo'} />
      <span className={'brand'}>
        EVE.nt
      </span>
    </div>
        <IconButton
          onClick={() => alert('Logged in, logged out... Who cares?... ;)')}
          iconStyle={style.mediumIcon}
          style={style.medium}
        >
          <Power />
        </IconButton>
  </div>
)