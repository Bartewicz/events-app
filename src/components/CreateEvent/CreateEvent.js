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
    map: null,
    marker: null,
    place: {}
  }

  render() {
    return (
      <PaperRefined>
        <div className={'events-wrapper'}>
          <div className={'wrapper'}>
            <h2>Create new event</h2>
            <div>
              <h3 className={'text-left no-margins'}>Localization:</h3>
              <span className={'display-block'}>{this.state.place.formatted_address}</span>
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
                marker={this.state.marker}
                setPlaceFromResponse={(place) => mapLogic.setPlaceFromResponse(place, this)}
              />
            </div>
            <Map
              context={this}
              setRefToMap={(map) => mapLogic.setRefToMap(map, this)}
              setRefToMarker={(marker) => mapLogic.setRefToMarker(marker, this)}
              setPlaceFromResponse={(place) => mapLogic.setPlaceFromResponse(place, this)}
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