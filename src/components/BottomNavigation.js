import React from 'react'
import { NavLink } from 'react-router-dom'
// UI
import { BottomNavigationItem } from 'material-ui/BottomNavigation'
import Restore from 'material-ui/svg-icons/action/restore'
import Favorite from 'material-ui/svg-icons/action/favorite'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'

export default () => (
  <div className={'bottom-nav fixed-bottom'}>
    {/* <NavLink
      to={'/upcoming'}
      className={'link'}
      activeClassName={'active'}
    > */}
      <BottomNavigationItem
        label="Upcoming"
        icon={<Restore />}
      />
    {/* </NavLink> */}
    <NavLink exact strict
      to={'/'}
      className={'link'}
      activeClassName={'active'}
    >
      <BottomNavigationItem
        label="Your events"
        icon={<Favorite />}
      />
    </NavLink>
    {/* <NavLink
      to={'/nearby'}
      className={'link'}
      activeClassName={'active'}
    > */}
      <BottomNavigationItem
        label="Nearby"
        icon={<IconLocationOn />}
      />
    {/* </NavLink> */}
  </div>
)