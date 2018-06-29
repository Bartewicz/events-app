import React from 'react'
// Redux
import { connect } from 'react-redux'
// Reducer
import { onDateChange, onTimeChange, toggleWholeDay } from './reducer'
// Material ui
import { DatePicker, TimePicker, Toggle } from 'material-ui'

const DateAndTime = (props) => (
  <div>
    <div className={'flex-space-between'}>
      <h3 className={'section-title text-left no-margins'}>Specify date:</h3>
      <Toggle
        style={{ width: 'auto !important' }}
        name="wholeDay"
        value="wholeDay"
        label={
          props.wholeDay ?
            'Whole day? Yes'
            :
            'Whole day? No'
        }
        toggled={props.wholeDay}
        onToggle={() => props.toggleWholeDay(props.wholeDay)}
      />
    </div>
    <div className={'flex-space-between'}>
      <DatePicker
        textFieldStyle={{
          cursor: 'pointer',
          marginRight: '10px',
          width: 'auto'
        }}
        inputStyle={{ color: '#0097A7' }}
        hintText="Click and pick a date"
        mode="portrait"
        onChange={(event, value) => {
          props.onDateChange(value)
        }}
      />
      <TimePicker
        disabled={props.wholeDay}
        onChange={(event, value) => {
          props.onTimeChange(value)
        }}
        format="24hr"
        hintText="Start time"
        textFieldStyle={{
          cursor: 'pointer',
          marginLeft: '10px',
          width: 'auto'
        }}
        inputStyle={{ color: '#0097A7' }}
      />
    </div>
  </div>
)

export default connect(
  state => ({
    wholeDay: state.createEvent.wholeDay,
  }),
  dispatch => ({
    onDateChange: (value) => {console.log(value), dispatch(onDateChange(value))},
    onTimeChange: (value) => {console.log(value), dispatch(onTimeChange(value))},
    toggleWholeDay: (value) => dispatch(toggleWholeDay(value))
  })
)(DateAndTime)