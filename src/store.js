// Redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// Reducers
import createEvent from './components/CreateEvent/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  createEvent
})

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store