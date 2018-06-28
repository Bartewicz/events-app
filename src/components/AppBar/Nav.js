import React from 'react'
import { NavLink } from 'react-router-dom'
// Redux & state
import { connect } from 'react-redux'
import { logOut } from '../Auth/reducer'
// UI
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'

class Nav extends React.Component {
  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><Menu color={"white"} /></IconButton>}
          anchorOrigin={{ "horizontal": "left", "vertical": "bottom" }}
          targetOrigin={{ "horizontal": "right", "vertical": "top" }}
        >
          <NavLink exact strict
            to={'/'}
            className={'link'}
            activeStyle={{ color: '#0097A7' }}
          >
            <MenuItem
              className={'menu-item'}
              primaryText={'Dashboard'}
            />
          </NavLink>
          <NavLink
            to={'/upcoming'}
            className={'link'}
            activeStyle={{ color: '#0097A7' }}
          >
            <MenuItem
              className={'menu-item'}
              primaryText="Upcoming events"
            />
          </NavLink>
          <NavLink
            to={'/nearby'}
            className={'link'}
            activeStyle={{ color: '#0097A7' }}
          >
            <MenuItem
              className={'menu-item'}
              primaryText="Events nearby"
            />
          </NavLink>
          <Divider />
          <NavLink
            to={'/create-event'}
            className={'link'}
            activeStyle={{ color: '#0097A7' }}
          >
            <MenuItem
              className={'menu-item'}
              primaryText={'Create event'}
            />
          </NavLink>
          <Divider />
          <MenuItem
            primaryText="Log out"
            onClick={this.props.onLogOutClick}
          />
        </IconMenu>
      </div >
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({
    onLogOutClick: () => dispatch(logOut())
  })
)(Nav)