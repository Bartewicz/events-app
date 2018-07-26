import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { setPlaceFromEvent, setPlaceOnMapClick } from './reducer'

class Map extends React.Component {
  state = {
    defaultCenter: {
      lat: 53.4285,
      lng: 14.5528
    }
  }

  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.defaultCenter,
      mapTypeId: 'roadmap',
      zoom: 12
    })
    const marker = new window.google.maps.Marker({
      map: map
    })

    const service = new window.google.maps.places.PlacesService(map)

    service.getDetails(
      { placeId: this.props.place.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          let location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          marker.setVisible(true)
          marker.setPosition(location)
          this.props.setPlaceFromEvent(place)
        } else {
          console.log(status)
        }
      })

    map.addListener('click', (event) => {
      if (event) {
        let location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        marker.setVisible(true)
        marker.setPosition(location)

        map.panTo(location)

        this.props.setPlaceOnMapClick(location)
      }
    })
    this.props.setRefToMap(map)
    this.props.setRefToMarker(marker)
  }

  render() {
    return (
      <div id='map' />
    )
  }
}

export default connect(
  state => ({
    place: state.maps.place
  }),
  dispatch => ({
    setPlaceFromEvent: (place) => dispatch(setPlaceFromEvent(place)),
    setPlaceOnMapClick: (location) => dispatch(setPlaceOnMapClick(location))
  })
)(Map)