import { database } from '../../firebase'

// Actions types
const CREATE_EVENT = 'createEvent/CREATE_EVENT'
const NEW_HEADER_CHANGE = 'createEvent/NEW_HEADER_CHANGE'
const NEW_DESC_CHANGE = 'createEvent/NEW_DESC_CHANGE'

// Actions creators
const addEvent = () => ({ type: CREATE_EVENT })
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
  if (getState().createEvent.newEventHeader && getState().createEvent.newEventDescription) {
    const newEventKey = database.ref(`/events`).push().key
    const newEvent = {
      header: getState().createEvent.newEventHeader,
      description: getState().createEvent.newEventDescription,
    }
    database.ref(`/events/${newEventKey}`)
      .set(newEvent)
      .then(() => dispatch(addEvent()))
  } else { }
}
