import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const mapWrapperWidth = document.getElementsByClassName('map-wrapper').offsetWidth

const style = {
  height: mapWrapperWidth / 7 * 5,
  width: mapWrapperWidth
}

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onInfoWindowClose = () => this.setState({showingInfoWindow: false})

  render() {
    return (
      <Map
        google={window.google}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        onClick={this.onMapClicked}
        style={style}
        zoom={14}
      >
        <Marker
          name={'SOMA'}
          onClick={this.onMarkerClick}
          position={{
            lat: 37.778519,
            lng: -122.405640
          }}
          title={'The marker`s title will appear as a tooltip.'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDLJXIYnOaSmYK2OT91_Vsn-mWT4bGufJ0')
})(MapContainer)