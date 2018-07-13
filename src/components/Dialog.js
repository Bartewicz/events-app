import React from 'react'

const Dialog = (props) => (
  <div id={'dialog'} className={'dialog'}>
    <div className={'dialog-background flex-center'}>
      <div className={'dialog-wrapper flex-center'}>
        <p className={'dialog-content flex-center no-margin-bottom'}>
          Do you want to {props.context} this event?
        </p>
        <h3 className={'text-center'}>
          {props.event.header}
        </h3>
        <div className={'align-flex-end'}>
          <button
            className={'mx-05'}
            onClick={props.onRequestClose}
          >
            Cancel
          </button>
          <button
            onClick={props.onRequestComplete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Dialog