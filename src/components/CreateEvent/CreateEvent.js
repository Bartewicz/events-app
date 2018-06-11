import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Components
import Map from '../Map/CreateEventMap'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
// Reducer
import { addEventToFirebase, onNewHeaderChange, onNewDescChange } from './reducer'

class CreateEvent extends React.Component {
  state = {
    isMarkerShown: false,
    markerPosition: {}
  }

  handleClick = (event) => {
    let markerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    this.setState({ isMarkerShown: true, markerPosition })
  }

  render() {
    return (
      <PaperRefined>
        <div className={'events-wrapper'}>
          <div className={'wrapper'}>
            <h2>Create new event</h2>
            <div>
              <span>Title:</span>
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
              <span>Description:</span>
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
          <div id={'map-wrapper'} className={'map-wrapper'}>
            <Map
              isMarkerShown={this.state.isMarkerShown}
              handleClick={this.handleClick}
              markerPosition={this.state.markerPosition}
            />
          </div>
          <RaisedButton
            className={'button-margins'}
            fullWidth={true}
            label={<b>Let's make it happen!</b>}
            primary={true}
          />
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