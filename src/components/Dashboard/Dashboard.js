import React from 'react'
// React-Redux
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  editEvent,
  deleteEventFromDB
} from '../Events/reducer'
// UI
import PaperRefined from '../../ui/PaperRefined'
import EventCard from './EventCard'
import Dialog from '../Dialog'

class Dashboard extends React.Component {
  state = {
    dialogContext: '',
    dialogEvent: {},
    eventToEdit: ''
  }

  eventActionHandler = (context, event) => {
    const dialog = window.document.getElementById('dialog')
    dialog.classList.add('active')
    this.setState({ dialogContext: context, dialogEvent: event })
  }

  closeDialog = () => {
    const dialog = window.document.getElementById('dialog')
    dialog.classList.add('hide')
    setTimeout(() => {
      dialog.classList.remove('active')
      dialog.classList.remove('hide')
    }, 300)
  }

  completeRequest = (event) => {
    const context = this.state.dialogContext
    if (context === 'edit') {
      this.setState({ eventToEdit: event.key })
      this.props.editEvent(event)
      this.closeDialog()
    } else if (context === 'delete') {
      this.props.deleteEvent(event)
      this.closeDialog()
    } else {
      alert('error')
    }
  }

  render() {
    if (this.state.eventToEdit) {
        return <Redirect to={`/edit-event/${this.state.eventToEdit}`} />
    }
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
                this.props.events.filter((e, i) => i >= this.props.events.length - 2).map((event, index) =>
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
          onRequestComplete={this.completeRequest}
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
    editEvent: (event) => dispatch(editEvent(event)),
    deleteEvent: (event) => dispatch(deleteEventFromDB(event))
  })
)(Dashboard)