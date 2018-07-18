// Firebase
import { database } from '../../firebase'
// Moment
import Moment from 'moment'
// Reducers
import { handleSuccess, handleInternalError, handleExternalError } from '../Alerts/reducer'
import { clearPlace } from '../Map/reducer'

// Actions types
const SET_EVENTS = 'events/SET_EVENTS'
const DELETE_EVENT = 'events/DELETE_EVENT'
const CREATE_EVENT = 'events/CREATE_EVENT'
const NEW_DATE_CHANGE = 'events/NEW_DATE_CHANGE'
const NEW_TIME_CHANGE = 'events/NEW_TIME_CHANGE'
const TOGGLE_WHOLE_DAY = 'events/TOGGLE_WHOLE_DAY'
const NEW_HEADER_CHANGE = 'events/NEW_HEADER_CHANGE'
const NEW_DESC_CHANGE = 'events/NEW_DESC_CHANGE'

// Actions creators
const setEvents = (events) => ({ type: SET_EVENTS, events })
const deleteEvent = () => ({ type: DELETE_EVENT })
const createEvent = () => ({ type: CREATE_EVENT })
export const onDateChange = (value) => ({ type: NEW_DATE_CHANGE, value })
export const onTimeChange = (value) => ({ type: NEW_TIME_CHANGE, value })
export const toggleWholeDay = (value) => ({ type: TOGGLE_WHOLE_DAY, value })
export const onNewHeaderChange = (value) => ({ type: NEW_HEADER_CHANGE, value })
export const onNewDescChange = (value) => ({ type: NEW_DESC_CHANGE, value })

// Initial state
const initialState = {
  events: {},
  newEventDate: '',
  newEventTime: '',
  wholeDay: false,
  newEventHeader: '',
  newEventDescription: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events
      }
    case DELETE_EVENT:
      return state
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
export const getEventsFromDB = () => (dispatch, getState) => {
  database.ref(`/events`)
    .on('value', snapshot => {
      const events =
        (Object.entries(snapshot.val() || {})
          .map(([key, value]) => (
            { ...value, key }
          ))
        )
      dispatch(setEvents(events))
      console.log(events)
    })
}

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

export const addEventToFirebase = () => (dispatch, getState) => {
  const createdAt = Date.now()
  const createdBy = {
    email: getState().auth.user.email,
    uid: getState().auth.user.uid
  }
  const description =
    String(getState().createEvent.newEventDescription.charAt(0).toUpperCase()) +
    String(getState().createEvent.newEventDescription.substr(1))
  const header =
    String(getState().createEvent.newEventHeader.charAt(0).toUpperCase()) +
    String(getState().createEvent.newEventHeader.substr(1))
  const place = {}
  const timestamp = {
    date: getState().createEvent.newEventDate,
    wholeDay: getState().createEvent.wholeDay
  }
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
  if (!getState().createEvent.wholeDay && getState().createEvent.newEventTime) {
    timestamp.time = getState().createEvent.newEventTime
  }
  if (!getState().createEvent.newEventDate) {
    dispatch(handleInternalError("Specify a date first."))
  } else if (!Moment(getState().createEvent.newEventDate, 'YYYYMMDD').isValid) {
    dispatch(handleInternalError("A date is invalid.\nCorrect date and try again."))
  } else if (!Moment(getState().createEvent.newEventTime, 'HH:mmZ').isValid) {
    dispatch(handleInternalError("A time is invalid.\nCorrect time or mark as whole day and try again."))
  } else if (!getState().createEvent.wholeDay && !getState().createEvent.newEventTime) {
    dispatch(handleInternalError("Specify a time or mark as a whole day."))
  } else if (!place.place_id) {
    dispatch(handleInternalError("Specify a location."))
  } else if (!header) {
    dispatch(handleInternalError('You need to add a title. Remember:\nYour title must be at least 10 characters long.'))
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
      place,
      timestamp
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
