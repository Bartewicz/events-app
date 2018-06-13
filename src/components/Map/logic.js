export const handleClick = (event, self) => {
  let markerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() }
  self.setState({ isMarkerShown: true, markerPosition })
}

export const setReftoSearchBox = (searchBoxRef, self) => {
  self.setState({ searchBoxRef })
}

export const changeHandler = (event, searchBoxValue, self) => {
  self.setState({ searchBoxValue })
}

export const onPlacesChanged = (place, self) => {
  self.setState({ place })
}

export const setRefToMap = (map, self) => {
  self.setState({ map })
}
