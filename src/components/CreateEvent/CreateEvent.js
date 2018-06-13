import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Reducer
import { addEventToFirebase, onNewHeaderChange, onNewDescChange } from './reducer'
// Components
import Map from '../Map/CreateEventMap'
// Logic
import * as mapLogic from '../Map/logic'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
import SearchBox from '../Map/SearchBox';

class CreateEvent extends React.Component {
  state = {
    isMarkerShown: false,
    markerPosition: {},
    place: {},
    searchBoxRef: null,
    map: null
  }

  setPlaceFromResponse = (place) => {
    this.setState({ place })
    let lat = place.geometry.location.lat()
    let lng = place.geometry.location.lng()
    let markerPosition = { lat, lng }
    this.setState({ markerPosition })
    console.log('CreateEvent markerPosition at state', this.state.markerPosition)
    this.setState({ isMarkerShown: true })
    console.log('CreateEvent isMarkerShown at state', this.state.isMarkerShown)
  }

  render() {
    return (
      <PaperRefined>
        <div className={'events-wrapper'}>
          <div className={'wrapper'}>
            <h2>Create new event</h2>
            <div>
              <h3 className={'text-left no-margins'}>Localization:</h3>
              <span>{this.state.place.formatted_address}</span>
              <h3 className={'text-left no-margins'}>Title:</h3>
              <br />
              <TextField
                fullWidth={true}
                hintText={'Type a title of your event here'}
                name={'new-event'}
                onChange={this.props.onNewHeaderChange}
                value={this.props.newEventHeader}
              />
            </div>
            <hr />
            <div>
              <h3 className={'text-left no-margins'}>Description:</h3>
              <br />
              <TextField
                fullWidth={true}
                hintText={'Type a description here'}
                multiLine={true}
                name={'new-event'}
                onChange={this.props.onNewDescChange}
                value={this.props.newEventDescription}
              />
            </div>
          </div>
          <div className={'map-wrapper'}>
            <div className={'searchBox-wrapper'}>
              <SearchBox
                onPlacesChanged={(place) => mapLogic.onPlacesChanged(place, this)}
                map={this.state.map}
                setPlaceFromResponse={this.setPlaceFromResponse}
              />
            </div>
            <Map
              context={this}
              isMarkerShown={this.state.isMarkerShown}
              handleClick={(event) => mapLogic.handleClick(event, this)}
              markerPosition={this.state.markerPosition}
              setRefToMap={(map) => mapLogic.setRefToMap(map, this)}
              setPlaceFromResponse={this.setPlaceFromResponse}
            />
            <RaisedButton
              className={'button-margins'}
              fullWidth={true}
              label={<b>Let's make it happen!</b>}
              onClick={this.props.onEventAdd}
              primary={true}
            />
          </div>
        </div>
      </PaperRefined>
    )
  }
}

export default connect(
  state => ({
    newEventHeader: state.createEvent.newEventHeader,
    newEventDescription: state.createEvent.newEventDescription
  }),
  dispatch => ({
    onEventAdd: () => dispatch(addEventToFirebase()),
    onNewHeaderChange: (event, value) => dispatch(onNewHeaderChange(value)),
    onNewDescChange: (event, value) => dispatch(onNewDescChange(value))
  })
)(CreateEvent)