import React from 'react'
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
        <div>
        <p className={'section-title no-margins align-left'}>
            Location:
                    </p>
          <span className={'text-colorized'}>
            {
              props.event.place.name ?
                <div>
                  {props.event.place.name}
                  <br />
                  {props.event.place.formatted_address}
                </div>
                :
                props.event.place.formatted_address
            }
          </span>
        </div>
        <div>
        <p className={'section-title text-right no-margins align-right'}>
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
        </div>
      <p>{props.event.description}</p>
      <SingleEventMap
        location={props.event.place.location}
        uid={props.event.key}
      />
    </div>
  </PaperRefined>
)

export default EventCard