import { database } from '../../firebase'
import { handleSuccess, handleInternalError, handleExternalError } from '../Alerts/reducer'
import { clearPlace } from '../Map/reducer'

// Actions types
const CREATE_EVENT = 'createEvent/CREATE_EVENT'
const NEW_HEADER_CHANGE = 'createEvent/NEW_HEADER_CHANGE'
const NEW_DESC_CHANGE = 'createEvent/NEW_DESC_CHANGE'

// Actions creators
const createEvent = () => ({ type: CREATE_EVENT })
export const onNewHeaderChange = (value) => ({ type: NEW_HEADER_CHANGE, value })
export const onNewDescChange = (value) => ({ type: NEW_DESC_CHANGE, value })

// Initial state
const initialState = {
  newEventHeader: '',
  newEventDescription: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        newEventHeader: '',
        newEventDescription: ''
      }
    case NEW_HEADER_CHANGE:
      return {
        ...state,
        newEventHeader: action.value
      }
    case NEW_DESC_CHANGE:
      return {
        ...state,
        newEventDescription: action.value
      }
    default:
      return state
  }
}

// Logic
export const addEventToFirebase = () => (dispatch, getState) => {
  if (getState().createEvent.newEventHeader.length >= 10 && getState().createEvent.newEventDescription) {
    const newEventKey = database.ref(`/events`).push().key
    let user = getState().auth.user.displayName || getState().auth.user.email
    const newEvent = {
      createdAt: Date.now(),
      createdBy: user,
      header: getState().createEvent.newEventHeader,
      description: getState().createEvent.newEventDescription,
      place: getState().maps.place.place_id
    }
    database.ref(`/events/${newEventKey}`)
      .set(newEvent)
      .then(() => dispatch(createEvent()))
      .then(() => dispatch(clearPlace()))
      .then(() => dispatch(handleSuccess('Great! Your event was succesfully created!')))
      .catch(error => dispatch(handleExternalError(error)))
    } else if (0 < getState().createEvent.newEventHeader < 10) {
      dispatch(handleInternalError('Your title must be at least 10 characters long.'))
  } else if (!getState().createEvent.newEventHeader) {
    dispatch(handleInternalError('You need to add a title!'))
  } else if (!getState().createEvent.newEventDescription) {
    dispatch(handleInternalError("You need to add a description!"))
  } else {
    dispatch(handleInternalError('Something went wrong'))
  }
}
