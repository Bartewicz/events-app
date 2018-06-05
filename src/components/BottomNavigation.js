import React from 'react'
// UI
import style from '../ui/style'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import Restore from 'material-ui/svg-icons/action/restore'
import Favorite from 'material-ui/svg-icons/action/favorite'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'

export default (props) => (
  <div style={style.fixedBottom}>
    <Paper zDepth={1}>
      <BottomNavigation selectedIndex={1}>
        <BottomNavigationItem
          label="Recents"
          icon={<Restore />}
          onClick={() => { }}
        />
        <BottomNavigationItem
          label="Favorites"
          icon={<Favorite />}
          onClick={() => { }}
        />
        <BottomNavigationItem
          label="Nearby"
          icon={<IconLocationOn />}
          onClick={() => { }}
        />
      </BottomNavigation>
    </Paper>
  </div>
)