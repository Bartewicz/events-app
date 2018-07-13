import React from 'react'
// React-Redux
import { connect } from 'react-redux'
import { deleteEventFromDB } from './reducer'
// Components
import SingleEventMap from '../Map/SingleEventMap'
// Moment
import Moment from 'moment'
// UI
import PaperRefined from '../../ui/PaperRefined'


const EventCard = (props) => (
  <PaperRefined
    className={'card'}
  >
    <div
      className={'single-event-wrapper'}
    >
      <h3 className={'section-title no-margins align-center'}>
        {props.event.header}
      </h3>
      <div className={'flex-space-between mb-05'}>
        <div>
          <p className={'section-title no-margins'}>
            Date:
          </p>
          <p className={'text-colorized no-margins'}>
            {Moment(props.event.timestamp.date).format('ddd, Do MMM YYYY')}
          </p>
        </div>
        {
          props.event.timestamp.wholeDay ?
            <div className={'align-flex-end'}>
              <p className={'text-colorized no-margins'}>
                Whole day
              </p>
            </div>
            :
            <div>
              <p className={'section-title no-margins align-flex-start'}>
                Start:
                </p>
              <p className={'text-colorized no-margins'}>
                {Moment(props.event.timestamp.time, 'HH:mmZ').local().format('HH:mm')}
              </p>
            </div>
        }
      </div>
      <div className={'mb-05'}>
        <p className={'section-title no-margins align-flex-start'}>
          Location:
          </p>
        {
          props.event.place.name ?
            <span className={'text-colorized'}>
              {props.event.place.name}
              <br />
              {props.event.place.formatted_address}
            </span>
            :
            <span className={'text-colorized'}>
              {props.event.place.formatted_address}
            </span>
        }
      </div>
      <div className={'align-flex-end'}>
        <p className={'section-title text-right no-margins'}>
          {'created by: '}
          <span className={'text-colorized'}>
            <b>
              {
                props.event.createdBy ?
                  props.event.createdBy.displayName
                  ||
                  props.event.createdBy.email
                  :
                  'Mr. Robot'
              }
            </b>
          </span>
        </p>
        <p className={'section-title text-right no-margins'}>
          {'at: '}
          <span className={'text-colorized'}>
            <b>
              {Moment(props.event.createdAt).format('dddd, Do MMM YYYY')}
            </b>
          </span>
        </p>
        {
          props.event.createdBy.uid === props.user.uid ?
            <div className={'text-right mt-05'}>
              <button className={'mx-05'}
                onClick={() => props.actionHandler('edit', props.event)}
              >
                Edit
              </button>
              <button
                onClick={() => props.actionHandler('delete', props.event)}
              >
                Delete
              </button>
            </div>
            :
            null
        }
      </div>
      <p>{props.event.description}</p>
      <SingleEventMap
        location={props.event.place.location}
        uid={props.event.key}
      />
    </div>
  </PaperRefined >
)

export default connect(
  state => ({}),
  dispatch => ({
    deleteEventFromDB: (event) => dispatch(deleteEventFromDB(event))
  })
)(EventCard)