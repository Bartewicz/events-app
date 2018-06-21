import React from 'react'
// Firebase
import { database } from '../firebase'
// UI
import PaperRefined from '../ui/PaperRefined'

class Dashboard extends React.Component {
  render() {
    return (
      <main>
        <div className={'paper'}>
          <h1 className={'text-center no-margins'}>
            Dashboard
          </h1>
        </div>
        <PaperRefined>
          <div>
            events
          </div>
        </PaperRefined>
      </main>
    )
  }
}

export default Dashboard