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
      anchorOrigin={{ "horizontal": "left", "vertical": "bottom" }}
      targetOrigin={{ "horizontal": "right", "vertical": "top" }}
    >
      <MenuItem primaryText="Dashboard" />
      <MenuItem primaryText="Upcoming events" />
      <MenuItem primaryText="Events nearby" />
      <Divider />
      <MenuItem primaryText="Create event" />
      <Divider />
      <MenuItem
        primaryText="Log out"
        onClick={props.onLogOutClick}
      />
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