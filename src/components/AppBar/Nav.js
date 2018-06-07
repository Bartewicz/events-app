import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logOut } from '../Auth/reducer'
// UI
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'

const Nav = (props) => (
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
      <MenuItem value="3" primaryText="Your events" />
      <Divider />
      <MenuItem value="4" primaryText="Help" />
      <Divider />
      <MenuItem value="5" primaryText="Log out" />
    </IconMenu>
  </div >
)

export default connect(
  state => ({
  }),
  dispatch => ({
    onLogOutClick: () => dispatch(logOut())
  })
)(Nav)