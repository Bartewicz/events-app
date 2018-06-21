import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// Moment
import Moment from 'moment'
// UI
import PaperRefined from '../ui/PaperRefined'

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
              <div key={index}>
                <div className={'flex-space-between'}>
                  <h3 className={'section-title display-inline no-margins'}>
                    {event.header}
                  </h3>
                  <h3 className={'display-inline text-right no-margins text-gray'}>
                    created at: {JSON.stringify(Moment(event.createdAt).format('dddd, Do MMM YYYY,'))}
                    <br />
                    {JSON.stringify(Moment(event.createdAt).format('h:mm:ss'))}
                  </h3>
                </div>
                <p>{event.description}</p>
                {
                  index !== props.events.length - 1 ?
                    <hr />
                    :
                    null
                }
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
    events: state.events.events
  }),
  dispatch => ({
  })
)(Dashboard)