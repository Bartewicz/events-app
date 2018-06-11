import React from 'react'
import { compose, withProps } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

class Map extends React.Component {
  state = {
    defaultCenter: {
      lat: 53.4285,
      lng: 14.5528
    }
  }

  render() {
    return (
      <div>
        <GoogleMap
          center={this.state.defaultCenter}
          defaultZoom={12}
          onClick={this.props.handleClick}
        >
          {
            this.props.isMarkerShown ?
              <Marker
                position={this.props.markerPosition}
              />
              :
              null
          }
        </GoogleMap>
      </div>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLJXIYnOaSmYK2OT91_Vsn-mWT4bGufJ0",
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    loadingElement: <div>Loading resources...</div>,
    mapElement: <div style={{ width: '100%', height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map)
