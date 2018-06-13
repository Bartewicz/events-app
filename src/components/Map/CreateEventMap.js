import React from 'react'

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
      let location = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      marker.setVisible(true)
      marker.setPosition(location)

      let place = new window.google.maps.Geocoder().geocode({ location }, (array, status) => {
        this.props.setPlaceFromResponse(array[0])
        console.log(array[0])
      })
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

export default Map