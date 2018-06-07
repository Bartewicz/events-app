// Redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// Reducers
import auth from './components/Auth/reducer'
import createEvent from './components/CreateEvent/reducer'
// utils
import { initAuthUserSync } from './components/Auth/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  auth,
  createEvent
})

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store

store.dispatch(initAuthUserSync())