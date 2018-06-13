import React from 'react'
// UI
import { TextField } from 'material-ui'

class SearchBox extends React.Component {
  componentDidMount() {
    let input = new window.google.maps.places.Autocomplete(document.getElementById('pac-input'))

    input.addListener('place_changed', () => {
      let place = input.getPlace()
      console.log(place)
      if (place.name) {
        let lat = place.geometry.location.lat()
        let lng = place.geometry.location.lng()
        this.props.setPlaceFromResponse(place)
        this.props.marker.setPosition({ lat, lng })
      } else {
        this.props.marker.setVisible(false)
        this.props.setPlaceFromResponse(place)
      }
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <TextField
          id={'pac-input'}
          fullWidth={true}
          onChange={this.props.changeHandler}
          name={'search-box'}
          type={'text'}
          value={this.props.value}
        />
      </div>
    )
  }
}

export default SearchBox