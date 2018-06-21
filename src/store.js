// Redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// Reducers
import alerts from './components/Alerts/reducer'
import auth from './components/Auth/reducer'
import createEvent from './components/CreateEvent/reducer'
import events from './components/Events/reducer'
import maps from './components/Map/reducer'
// utils
import { initAuthUserSync } from './components/Auth/reducer'
import { getEventsFromDB } from './components/Events/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  alerts,
  auth,
  createEvent,
  events,
  maps
})

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store

store.dispatch(initAuthUserSync())
store.dispatch(getEventsFromDB())