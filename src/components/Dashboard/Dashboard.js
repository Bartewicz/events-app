import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// UI
import PaperRefined from '../../ui/PaperRefined'
import EventCard from './EventCard'

const Dashboard = (props) => (
  <main>
    <div className={'paper'}>
      <h1 className={'text-center no-margins'}>
        Dashboard
      </h1>
    </div>
    <PaperRefined>
      <div className={'dashboard'}>
        {
          props.events.length ?
            props.events.map((event, index) => 
                <EventCard
                  event={event}
                  key={index}
                  user={props.user}
                />
            )
            :
            'Loading events...'

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