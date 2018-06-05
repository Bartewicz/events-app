import React from 'react'
// UI
import logo from '../../img/logo.gif'
import style from '../../ui/style'
import DropDownMenu from './DropDownMenu'

export default (props) => (
  <div className={'appbar'}>
    <div>
      <img className={'logo'} src={logo} alt={'Logo'} />
      <span className={'brand'}>
        Eve.nt | Make it happen!
      </span>
    </div>
        <DropDownMenu />
  </div>
)