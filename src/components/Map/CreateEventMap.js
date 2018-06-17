import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { setPlaceOnMapClick } from './reducer'

class Map extends React.Component {
  state = {
    defaultCenter: {
      lat: 53.4285,
      lng: 14.5528
    }
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.defaultCenter,
      mapTypeId: 'roadmap',
      zoom: 12
    })

    let marker = new window.google.maps.Marker({
      map: map
    })

    map.addListener('click', (event) => {
      if (event) {
        let location = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        marker.setVisible(true)
        marker.setPosition(location)

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
  state => ({}),
  dispatch => ({
    setPlaceOnMapClick: (location) => dispatch(setPlaceOnMapClick(location))
  })
)(Map)