import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
// Reducer
import { addEventToFirebase, onNewHeaderChange, onNewDescChange } from './reducer'

const CreateEvent = (props) => (
  <PaperRefined>
    <div className={'wrapper'}>
      <h2>Create new event</h2>
      <div className={'event-title'}>
        <span>Title:&nbsp;</span>
        <br />
        <TextField
          hintText={'Type a title of your event here'}
          name={'new-event'}
          onChange={props.onNewHeaderChange}
          value={props.newEventHeader}
        />
      </div>
      <hr />
      <div className={'add-event-wrapper'}>
        <div>
          <span>Description:&nbsp;</span>
          <br />
          <TextField
            hintText={'Type a description here'}
            multiLine={true}
            name={'new-event'}
            onChange={props.onNewDescChange}
            value={props.newEventDescription}
          />
        </div>
        <RaisedButton
          label={<b>CREATE</b>}
          onClick={props.onEventAdd}
          primary={true}
        />
      </div>
    </div>
  </PaperRefined>
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