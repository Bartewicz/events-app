import { auth, database, googleProvider } from '../../firebase'
import { handleSuccess, handleInternalError, handleExternalError } from '../Alerts/reducer'

// ACTIONS TYPES
const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'

// ACTIONS
const loggedIn = (user) => ({ type: LOGGED_IN, user })

const loggedOut = () => ({ type: LOGGED_OUT })

// INITIAL STATE
const initialState = {
  isLoggedIn: false,
  user: null
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      }
    case LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

// LOGIC
export const initAuthUserSync = () => (dispatch, getState) => {
  auth.onAuthStateChanged(
    user => {
      if (user) {
        dispatch(loggedIn(user))
        dispatch(logUserLogIn())
        dispatch(handleSuccess('You were successfully logged in :)'))
      } else {
        dispatch(loggedOut())
        dispatch(handleSuccess('You were logged out :) See you next time!'))
      }
    }
  ).catch(error => dispatch(handleExternalError(error)))
}

export const logInByGoogle = () => (dispatch, getState) => {
  auth.signInWithPopup(googleProvider)
    .catch(error => dispatch(handleExternalError(error)))
}

export const logInByMailAndPass = (email, password) => (dispatch, getState) => {
  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(user => dispatch(loggedIn(user)))
      .catch(error => dispatch(handleExternalError(error)))
  } else if (!email) {
    dispatch(handleInternalError('Email is required'))
  } else if (!password) {
    dispatch(handleInternalError('Password is required'))
  }
}

export const createUser = (email, password, passwordRetyped) => (dispatch, getState) => {
  if (email && password && password === passwordRetyped) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => dispatch(loggedIn(user)))
      .catch(error => alert(error))
  } else if (!password) {
    dispatch(handleInternalError('Password is required'))
  } else if (!email) {
    dispatch(handleInternalError('Email is required'))
  } else if (password !== passwordRetyped) {
    dispatch(handleInternalError('Passwords do not match'))
  }
}

export const restorePassword = (email) => (dispatch, getState) => {
  if (email) {
    auth.sendPasswordResetEmail(email)
      .then(() => alert('An email has been sent :) Check your mailbox.'))
      .catch(error => dispatch(handleExternalError(error)))
  }
}

const logUserLogIn = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  database.ref(`/users/${userUid}/loginsLogs`)
    .push({ timestamp: Date.now() })
    .catch(error => dispatch(handleExternalError(error)))
}

export const logOut = () => (dispatch, getState) => {
  auth.signOut()
    .catch(error => dispatch(handleExternalError(error)))
}
