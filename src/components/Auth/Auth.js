import React from 'react'
import { connect } from 'react-redux'
import { logInByGoogle } from './reducer'
// Components
import LogInByGoogle from './LogInByGoogle'
import AppBar from '../AppBar'
// UI
import style from '../../ui/style'
import PaperRefined from '../../ui/PaperRefined'

const Auth = (props) => (
  <div>
    {
      props.isUserLoggedIn ?
        props.children
        :
        <div>
          <AppBar />
          <div style={styles.wrappe}>
            <PaperRefined centered>
              <h3>welcome to</h3>
              <h3>DUCK ON FIRE</h3>
              <h3>ToDo List</h3>
              <LogInByGoogle
                onLogInClick={props.logInByGoogle}
              />
            </PaperRefined>
          </div>
        </div>
    }
  </div>
)

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    logInByGoogle: () => dispatch(logInByGoogle()),
  })
)(Auth)