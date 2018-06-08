import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
// Reducer
import { addEventToFirebase, onNewHeaderChange, onNewDescChange } from './reducer'

const CreateEvent = (props) => (
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
          onChange={props.onNewHeaderChange}
          value={props.newEventHeader}
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
          onChange={props.onNewDescChange}
          value={props.newEventDescription}
        />
      </div>
    </div>
    <div className={'map-margins'}>
      <img src="http://via.placeholder.com/350x250" />
    </div>
  </div>
)

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