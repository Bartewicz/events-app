// Firebase
import { database } from '../../firebase'
// Alerts
import { handleSuccess, handleExternalError } from '../Alerts/reducer'

// Actions types
const DELETE_EVENT = 'actions/DELETE_EVENT'
const EDIT_EVENT = 'actions/EDIT_EVENT'

// Actions creators
const deleteEvent = () => ({ type: DELETE_EVENT })
const editEvent = () => ({ type: EDIT_EVENT })

// Initial state
const initialState = {
  newEventDate: '',
  newEventTime: '',
  wholeDay: false,
  newEventHeader: '',
  newEventDescription: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EVENT:
      return state
    default:
      return state
  }
}

// Logic

export const updateEventAtDB = (event) => (dispatch, getState) => {
  // database.ref(`/events/${event.key}`)
  //   .update(() => {
  //     dispatch(editEvent())
  //   })
  dispatch(handleSuccess(`You succesfully edited event ${event.key}`))
}

export const deleteEventFromDB = (event) => (dispatch, getState) => {
  database.ref(`/events/${event.key}`)
    .remove(() => {
      dispatch(handleSuccess('Event was deleted.'))
      dispatch(deleteEvent())
    })
    .catch((error) => {
      dispatch(handleExternalError(error))
    })
}