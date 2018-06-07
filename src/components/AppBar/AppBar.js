import React from 'react'
// Redux
import { connect } from 'react-redux'
// UI
import logo from '../../img/logo.gif'
import Nav from './Nav'

const AppBar = (props) => (
  <div className={'appbar'}>
    <div>
      <img className={'logo'} src={logo} alt={'Logo'} />
      <span className={'brand'}>
        Eve.nt
      </span>
      <span className={'brand-follower'}>
        | Make it happen!
      </span>
    </div>
    {
      props.isLoggedIn ?
        <Nav />
        :
        null
    }
  </div>
)

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
  })
)(AppBar)