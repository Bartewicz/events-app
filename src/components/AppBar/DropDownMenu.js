import React from 'react'
// UI
import style from '../../ui/style'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'

export default (props) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><Menu color={"white"}/></IconButton>}
      onChange={props.handleChangeSingle}
      value={props.valueSingle}
      anchorOrigin={{ "horizontal": "left", "vertical": "bottom" }}
      targetOrigin={{ "horizontal": "right", "vertical": "top" }}
    >
      <MenuItem value="1" primaryText="Home" />
      <MenuItem value="2" primaryText="Events nearby" />
      <Divider />
      <MenuItem value="3" primaryText="Settings" />
      <MenuItem value="4" primaryText="Help" />
      <Divider />
      <MenuItem value="5" primaryText="Sign out" />
    </IconMenu>
  </div >
)