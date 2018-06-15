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
        let location = input.getPlace()
        console.log(location)
        if (location.name) {
          this.props.setPlaceFromAutocomplete(location)
        } else {
          this.props.clearPlace(location)
        }
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

export default connect(
  state => ({}),
  dispatch => ({
    clearPlace: (location) => dispatch(clearPlace(location)),
    setPlaceFromAutocomplete: (location) => dispatch(setPlaceFromAutocomplete(location))
  })
)(SearchBox)