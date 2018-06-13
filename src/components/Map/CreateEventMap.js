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
      map: map,
      visible: this.props.isMarkerShown,
      position: this.props.markerPosition
    })

    map.addListener('click', (event) => {
      this.props.handleClick(event)
      marker.setVisible(this.props.isMarkerShown)
      marker.setPosition(this.props.markerPosition)

      let geocoder = new window.google.maps.Geocoder().geocode({location: this.props.markerPosition}, (array, status) => {
        this.props.setPlaceFromResponse(array[0])
      })
    })

    this.props.setRefToMap(map)
  }

  render() {
    return (
      <div id='map' />
    )
  }
}

export default Map