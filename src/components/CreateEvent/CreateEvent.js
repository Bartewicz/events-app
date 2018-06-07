import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
// Reducer
import { addEventToFirebase, onNewHeaderChange, onNewDescChange } from './reducer'

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
)(
  (props) => (
    <PaperRefined>
      <h2>Create new event</h2>
      <div className={'event-title'}>
        <span>Title:&nbsp;</span>
        <br />
        <TextField
          name={'new-event'}
          hintText={'Type a title of your event here'}
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
            onChange={props.onNewDescChange}
            value={props.newEventDescription}
            name={'new-event'}
            hintText={'Type a description here'}
            multiLine={true}
          />
        </div>
        <RaisedButton
          primary={true}
          label={<b>CREATE</b>}
          onClick={props.onEventAdd}
        />
      </div>
    </PaperRefined>
  )
)