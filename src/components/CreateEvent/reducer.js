// Firebase
import { database } from '../../firebase'
// Reducers
import { handleSuccess, handleInternalError, handleExternalError } from '../Alerts/reducer'
import { clearPlace } from '../Map/reducer'

// Actions types
const CREATE_EVENT = 'createEvent/CREATE_EVENT'
const NEW_DATE_CHANGE = 'createEvent/NEW_DATE_CHANGE'
const NEW_TIME_CHANGE = 'createEvent/NEW_TIME_CHANGE'
const TOGGLE_WHOLE_DAY = 'createEvent/TOGGLE_WHOLE_DAY'
const NEW_HEADER_CHANGE = 'createEvent/NEW_HEADER_CHANGE'
const NEW_DESC_CHANGE = 'createEvent/NEW_DESC_CHANGE'

// Actions creators
const createEvent = () => ({ type: CREATE_EVENT })
export const onDateChange = (value) => ({ type: NEW_DATE_CHANGE, value })
export const onTimeChange = (value) => ({ type: NEW_TIME_CHANGE, value })
export const toggleWholeDay = (value) => ({ type: TOGGLE_WHOLE_DAY, value })
export const onNewHeaderChange = (value) => ({ type: NEW_HEADER_CHANGE, value })
export const onNewDescChange = (value) => ({ type: NEW_DESC_CHANGE, value })

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
    case CREATE_EVENT:
      return {
        ...state,
        newEventHeader: '',
        newEventDescription: ''
      }
    case TOGGLE_WHOLE_DAY:
      return {
        ...state,
        wholeDay: !action.value
      }
    case NEW_DATE_CHANGE:
      return {
        ...state,
        newEventDate: action.value
      }
    case NEW_TIME_CHANGE:
      return {
        ...state,
        newEventTime: action.value
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
  const createdAt = Date.now()
  const createdBy = {
    email: getState().auth.user.email,
    uid: getState().auth.user.uid
  }
  const description = getState().createEvent.newEventDescription
  const header = getState().createEvent.newEventHeader
  const place = {}
  if (getState().auth.user.displayName) {
    createdBy.displayName = getState().auth.user.displayName
  }
  if (getState().auth.user.photoURL) {
    createdBy.photoURL = getState().auth.user.photoURL
  }
  if (getState().maps.place.geometry) {
    place.location = {
      lat: getState().maps.place.geometry.location.lat(),
      lng: getState().maps.place.geometry.location.lng()
    }
    place.formatted_address = getState().maps.place.formatted_address
    place.place_id = getState().maps.place.place_id
  }
  if (getState().maps.place.name) {
    place.name = getState().maps.place.name
  }
  if (!place.place_id) {
    dispatch(handleInternalError("You need to specify a location!"))
  } else if (!header) {
    dispatch(handleInternalError('You need to add a title!'))
  } else if (header.length < 10) {
    dispatch(handleInternalError('Your title must be at least 10 characters long.'))
  } else if (!description) {
    dispatch(handleInternalError("You need to add a description!"))
  } else if (getState().createEvent.newEventHeader.length >= 10 && getState().createEvent.newEventDescription) {
    const newEventKey = database.ref(`/events`).push().key
    const newEvent = {
      createdAt,
      createdBy,
      description,
      header,
      place
    }
    database.ref(`/events/${newEventKey}`)
      .set(newEvent)
      .then(() => dispatch(createEvent()))
      .then(() => dispatch(clearPlace()))
      .then(() => dispatch(handleSuccess('Great! Your event was succesfully created!')))
      .catch(error => dispatch(handleExternalError(error)))
  } else {
    dispatch(handleInternalError('Something went wrong...'))
  }
}
