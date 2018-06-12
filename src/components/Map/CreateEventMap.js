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
      this.props.handleClick(event)
      marker.setVisible(this.props.isMarkerShown)
      marker.setPosition(this.props.markerPosition)
    })
  }

  render() {
    return (
      <div id='map' />
    )
  }
}

export default Map