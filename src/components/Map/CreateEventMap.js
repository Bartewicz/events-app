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
    console.log('markers', this.props.markers)
    return (
      <div>
        <GoogleMap
          center={this.state.defaultCenter}
          defaultZoom={12}
        >
        {
          this.props.markers.map((el, i) => (
            <Marker
            key={i}
            position={el.position}
            />
          )
        )
        }
        </GoogleMap>
      </div>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLJXIYnOaSmYK2OT91_Vsn-mWT4bGufJ0&libraries=geometry,drawing,places",
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    loadingElement: <div>Loading resources...</div>,
    mapElement: <div style={{ width: '100%', height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map)
