import React from 'react'
// React-Redux
import { connect } from 'react-redux'
// UI
import PaperRefined from '../../ui/PaperRefined'
import EventCard from './EventCard'
import Dialog from '../Dialog'

class Dashboard extends React.Component {
  state = {
    dialogContext: '',
    dialogEvent: {}
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
      this.setState({ dialogContext: '', dialogEvent: {} })
    }, 300)
  }

  completeRequest = () => {
    const context = this.state.dialogContext
    if (context === 'edit') {
        alert('You try to edit this event\n' + this.state.dialogEvent.header)
        this.closeDialog()
    } else if (context === 'delete') {
        alert('You try to delete this event\n' + this.state.dialogEvent.header)
        this.closeDialog()
    } else {
      alert('error')
    }
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
  })
)(Dashboard)