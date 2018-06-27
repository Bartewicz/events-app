import React from 'react'

class SingleEventMap extends React.Component {
  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById(`map-${this.props.uid}`), {
      center: this.props.location,
      mapTypeId: 'roadmap',
      zoom: 12
    })
    const marker = new window.google.maps.Marker({
      map: map,
      position: this.props.location,
      visible: true
    })
  }

  render() {
    return (
      <div id={`map-${this.props.uid}`} />
    )
  }
}

export default SingleEventMap