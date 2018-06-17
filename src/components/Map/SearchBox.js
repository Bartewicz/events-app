import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { clearPlace, setPlaceFromAutocomplete } from './reducer'
// UI
import { TextField } from 'material-ui'

class SearchBox extends React.Component {
  componentDidMount() {
    let input = new window.google.maps.places.Autocomplete(document.getElementById('pac-input'))

    input.addListener('place_changed', () => {
      if (input.getPlace().geometry) {
        let place = input.getPlace()
        if (place.name) {
          let location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          this.props.map.panTo(location)

          this.props.marker.setPosition(location)
          this.props.marker.setVisible(true)
          
          this.props.setPlaceFromAutocomplete(place)
        } else { }
      } else {
        this.props.marker.setVisible(false)
        this.props.clearPlace()
      }
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <TextField
          id={'pac-input'}
          fullWidth={true}
          inputStyle={{ color: '#0097A7' }}
          onChange={this.props.changeHandler}
          name={'search-box'}
          type={'text'}
          value={this.props.value}
        />
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    clearPlace: (location) => dispatch(clearPlace(location)),
    setPlaceFromAutocomplete: (location) => dispatch(setPlaceFromAutocomplete(location))
  })
)(SearchBox)