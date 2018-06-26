import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Moment
import Moment from 'moment'
// UI
import PaperRefined from '../ui/PaperRefined'
import SingleEventMap from './Map/SingleEventMap';

const Dashboard = (props) => (
  <main>
    <div className={'paper'}>
      <h1 className={'text-center no-margins'}>
        Dashboard
      </h1>
    </div>
    <PaperRefined>
      <div>
        {
          props.events.length ?
            props.events.map((event, index) =>
              <div
                className={'auth-wrapper'}
                key={event.key}
              >
                <PaperRefined>
                  <h3 className={'section-title no-margins'}>
                    {event.header}
                  </h3>
                  <div className={'flex-space-between'}>
                    <div>
                      <p className={'section-title no-margins'}>
                        Location:
                    </p>
                      <span className={'text-colorized'}>
                        {
                          event.place.name ?
                            <div>
                              {event.place.name}
                              <br />
                              {event.place.formatted_address}
                            </div>
                            :
                            event.place.formatted_address
                        }
                      </span>
                    </div>
                    <div>
                      <p className={'section-title text-right no-margins'}>
                        {'created by: '}
                        <span className={'text-colorized'}>
                          <b>
                            {
                              event.createdBy ?
                                event.createdBy.displayName
                                ||
                                event.createdBy.email
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
                            {Moment(event.createdAt).format('dddd, Do MMM YYYY')}
                          </b>
                        </span>
                      </p>
                    </div>
                  </div>
                  <p>{event.description}</p>
                  <hr />
                  <SingleEventMap
                    location={event.place.location}
                    uid={event.key}
                  />
                </PaperRefined>
              </div>
            )
            :
            'Loading...'

        }
      </div>
    </PaperRefined>
  </main>
)

export default connect(
  state => ({
    events: state.events.events,
    user: state.auth.user
  }),
  dispatch => ({
  })
)(Dashboard)