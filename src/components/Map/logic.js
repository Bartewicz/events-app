
export const setPlaceFromResponse = (place, self) => {
  self.setState({ place })
  if (place.name) {
    let lat = place.geometry.location.lat()
    let lng = place.geometry.location.lng()
    let markerPosition = { lat, lng }
    self.setState({ isMarkerShown: true })
  } else {}
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

export const setRefToMarker = (marker, self) => {
  self.setState({ marker })
}

export const setReftoSearchBox = (searchBoxRef, self) => {
  self.setState({ searchBoxRef })
}
