import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Reducer
import {
  updateEventAtDB,
  onNewHeaderChange,
  onNewDescChange
} from '../Events/reducer'
// Components
import Map from '../Map/EditMap'
// Logic
import * as mapLogic from '../Map/logic'
// Material-ui
import PaperRefined from '../../ui/PaperRefined'
import { TextField, RaisedButton } from 'material-ui'
import SearchBox from '../Map/SearchBox'
import DateAndTime from './DateAndTime'

class EditEvent extends React.Component {
  state = {
    map: null,
    marker: null
  }

  render() {
    return (
      <main>
        <div className={'paper'}>
          <h1 className={'text-center no-margins'}>
            {'Edit event: ' + this.props.newEventHeader}
          </h1>
        </div>
        <PaperRefined>
          <div className={'add-event-wrapper'}>
            <div className={'text-left wrapper'}>
              <div>
                <div className={'flex-space-between'}>
                  <h3 className={'section-title display-inline no-margins'}>
                    Created by:
                  </h3>
                  <h3 className={'display-inline no-margins text-colorized'}>
                    {
                      this.props.user.displayName ?
                        this.props.user.displayName
                        :
                        this.props.user.email
                    }
                  </h3>
                </div>
                <h3 className={'section-title no-margins'}>
                  Localization:
                </h3>
                {
                  this.props.place.name ?
                    <div className={'flex-center'}>
                      <p className={'event-location text-center text-colorized'}>
                        {this.props.place.name}
                        <br />
                        {this.props.place.formatted_address}
                      </p>
                    </div>
                    :
                    <div className={'flex-center'}>
                      <p className={'event-location text-colorized'}>
                        {this.props.place.formatted_address}
                      </p>
                    </div>
                }
                <DateAndTime
                  defaultDate={this.props.newEventDate}
                  defaultTime={this.props.newEventTime}
                />
                <h3 className={'section-title text-left no-margins'}>Title:</h3>
                <TextField
                  fullWidth={true}
                  hintText={'Type a title of your event here'}
                  inputStyle={{ color: '#0097A7' }}
                  name={'new-event'}
                  type={'text'}
                  onChange={this.props.onNewHeaderChange}
                  value={this.props.newEventHeader}
                />
              </div>
              <hr />
              <div>
                <h3 className={'section-title text-left no-margins'}>Description:</h3>
                <TextField
                  fullWidth={true}
                  hintText={'Type a description here'}
                  textareaStyle={{ color: '#0097A7' }}
                  multiLine={true}
                  name={'new-event'}
                  type={'text'}
                  onChange={this.props.onNewDescChange}
                  value={this.props.newEventDescription}
                />
              </div>
            </div>
            <div className={'wrapper'}>
              <h3 className={'section-title no-margins'}>
                Specify location:
              </h3>
              <div className={'searchBox-wrapper'}>
                <SearchBox
                  onPlacesChanged={(place) => mapLogic.onPlacesChanged(place, this)}
                  map={this.state.map}
                  marker={this.state.marker}
                />
              </div>
              <Map
                context={this}
                setRefToMap={(map) => mapLogic.setRefToMap(map, this)}
                setRefToMarker={(marker) => mapLogic.setRefToMarker(marker, this)}
              />
            </div>
          </div>
          <br />
          <div className={'event-add-button-wrapper'}>
            <div className={'auth-wrapper'}>
              <RaisedButton
                className={'button-margins'}
                fullWidth={true}
                label={<b>Save changes!</b>}
                onClick={this.props.onEventEdit}
                primary={true}
              />
            </div>
          </div>
        </PaperRefined>
      </main >
    )
  }
}

export default connect(
  state => ({
    events: state.events.events,
    user: state.auth.user,
    newEventHeader: state.events.newEventHeader,
    newEventDescription: state.events.newEventDescription,
    newEventDate: state.events.newEventDate,
    newEventTime: state.events.newEventTime,
    place: state.maps.place
  }),
  dispatch => ({
    onEventEdit: () => dispatch(updateEventAtDB()),
    onNewHeaderChange: (event, value) => dispatch(onNewHeaderChange(value)),
    onNewDescChange: (event, value) => dispatch(onNewDescChange(value))
  })
)(EditEvent)