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

class CreateEvent extends React.Component {
  state = {
    isMarkerShown: false,
    markerPosition: {},
    places: [],
    searchBoxValue: '',
    searchBoxRef: null
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
          <div className={'map-wrapper'}>
            {/* <div className={'searchBox-wrapper'}>
            </div> */}
            <Map
            // isMarkerShown={this.state.isMarkerShown}
            // handleClick={(event) => mapLogic.handleClick(event, this)}
            // markerPosition={this.state.markerPosition}
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