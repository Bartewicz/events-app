export const handleClick = (event, self) => {
  let markerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() }
  self.setState({ isMarkerShown: true, markerPosition })
}

export const onSearchBoxMounted = (searchBoxRef, self) => {
  self.setState({ searchBoxRef })
}

export const changeHandler = (event, searchBoxValue, self) => {
  self.setState({ searchBoxValue })
}

export const onPlacesChanged = (self) => {
  const places = self.state.searchBoxRef.getPlaces()
  console.log('This are the places', places)
}
