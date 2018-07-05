import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// UI
import PaperRefined from '../../ui/PaperRefined'
import EventCard from './EventCard'
import Dialog from '../Dialog';

class Dashboard extends React.Component {
  state = {
    isDialogOpen: false,
    dialogContext: '',
    dialogEvent: {}
  }

  eventActionHandler = (context, event) => {
    this.setState({ isDialogOpen: true, dialogContext: context, dialogEvent: event })
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false, dialogContext: '', dialogEvent: {} })
  }

  render() {
    return (
      <main>
        <div className={'paper'}>
          <h1 className={'text-center no-margins'}>
            Dashboard
      </h1>
        </div>
        <PaperRefined>
          <div className={'dashboard'}>
            {
              this.props.events.length ?
                this.props.events.map((event, index) =>
                  <EventCard
                    event={event}
                    key={index}
                    user={this.props.user}
                    actionHandler={(context, event) => this.eventActionHandler(context, event)}
                  />
                )
                :
                'Loading events...'

            }
          </div>
        </PaperRefined>
        <Dialog
          open={this.state.isDialogOpen}
          context={this.state.dialogContext}
          event={this.state.dialogEvent}
          onRequestClose={this.closeDialog}
        />
      </main>
    )
  }
}

export default connect(
  state => ({
    events: state.events.events,
    user: state.auth.user
  }),
  dispatch => ({
  })
)(Dashboard)