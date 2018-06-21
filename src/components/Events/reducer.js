// Firebase
import { database } from '../../firebase'

// Actions types
const SET_EVENTS = 'events/SET_EVENTS'

// Actions creators
const setEvents = (events) => ({ type: SET_EVENTS, events })

// Initial state
const initialState = {
  events: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events
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