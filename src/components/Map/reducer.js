
// Actions types
const SET_PLACE = 'createEvent/SET_PLACE'
const CLEAR_PLACE = 'createEvent/CLEAR_PLACE'
const SHOW_MARKER = 'createEvent/SHOW_MARKER'

// Actions creators
export const setPlace = (location) => ({ type: SET_PLACE, location })
export const clearPlace = () => ({ type: CLEAR_PLACE })
export const showMarker = (markerPosition) => ({ type: SHOW_MARKER, markerPosition })

// Initial state
const initialState = {
  place: {},
  markerPosition: {},
  isMarkerShown: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACE:
      return {
        ...state,
        place: action.location,
      }
    case SHOW_MARKER:
      return {
        ...state,
        markerPosition: action.markerPosition,
        isMarkerShown: true
      }
    case CLEAR_PLACE:
      return {
        ...state,
        place: {},
        markerPosition: {},
        isMarkerShown: false
      }
    default:
      return state
  }
}

// Logic
export const setPlaceOnMapClick = (location) => (dispatch, getState) => {
  new window.google.maps.Geocoder().geocode({ location }, (array, status) => {
    if (array) {
      dispatch(setPlace(array[0]))
      if (array[0].name) {
        let lat = array[0].geometry.location.lat()
        let lng = array[0].geometry.location.lng()
        let markerPosition = { lat, lng }
        dispatch(showMarker(markerPosition))
      } else { }
    }
  })
}

export const setPlaceFromAutocomplete = (place) => (dispatch, getState) => {
  dispatch(setPlace(place))
  let lat = place.geometry.location.lat()
  let lng = place.geometry.location.lng()
  let markerPosition = { lat, lng }
  dispatch(showMarker(markerPosition))
}

export const setPlaceFromEvent = (place) => (dispatch, getState) => {
  dispatch(setPlace(place))
}