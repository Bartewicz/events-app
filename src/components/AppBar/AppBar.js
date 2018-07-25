import React from 'react'
import { NavLink } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
// UI
import logo from '../../img/logo.gif'
import Nav from './Nav'

const AppBar = (props) => (
  <div className={'appbar'}>
    <div>
      <NavLink exact
        to={'/'}
        className={'link'}
      >
        <img className={'logo'} src={logo} alt={'Logo'} />
        <span className={'brand'}>
          Eve.nt
        </span>
        <span className={'brand-follower'}>
          | Make it happen!
        </span>
      </NavLink>
    </div>
    {
      props.isUserLoggedIn ?
        <Nav />
        :
        null
    }
  </div>
)

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isUserLoggedIn
  }),
  dispatch => ({
  })
)(AppBar)