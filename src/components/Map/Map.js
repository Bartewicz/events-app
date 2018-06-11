import React from 'react'
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'

class Map extends React.Component {
  state = {
    location: {
      lat: 53.4285,
      lng: 14.5528
    }
  }

  render() {
    return (
      <div>
        <GoogleMap
          center={this.state.location}
          defaultZoom={12}
        />
      </div>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    containerElement: <div style={{ width: '100%', height: '100%' }}/>,
    loadingElement: <div>Loading resources...</div>,
    mapElement: <div style={{ width: '100%', height: '100%' }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(Map)
