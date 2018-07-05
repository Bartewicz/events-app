import React from 'react'
// React-Redux
import { connect } from 'react-redux'
import { deleteEventFromDB, updateEventAtDB } from './Dashboard/reducer'

class Dialog extends React.Component {
  state = {
    open: this.props.open
  }

  componentDidMount() {
    const Dialog = document.getElementById('dialog')
    this.state.open ?
      Dialog.classList.add('visible')
      :
      Dialog.classList.remove('visible')
  }

  onRequestComplete = () => {
    if (this.props.context === 'edit') {
      this.props.updateEventAtDB(this.props.event)
    } else if (this.props.context === 'delete') {
      this.props.deleteEventFromDB(this.props.event)
    }
  }

  render() {
    return (
      <div id={'dialog'} className={'dialog'}>
        <div className={'dialog-background flex-center'}>
          <div className={'dialog-wrapper'}>
            <p className={'dialog-content'}>
              Do you want to {this.props.content} this event?
              </p>
            <h3>
              {this.props.event.header}
            </h3>
            <div className={'flex-space-around'}>
              <button onClick={this.props.onRequestClose}>Cancel</button>
              <button onClick={this.onRequestComplete}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({
    deleteEventFromDB: (event) => dispatch(deleteEventFromDB(event)),
    updateEventAtDB: (event) => dispatch(updateEventAtDB(event))
  })
)(Dialog)