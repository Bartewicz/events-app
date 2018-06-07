import React from 'react'
// Material-ui
import { Paper } from 'material-ui'

const PaperRefined = (props) => (
  <Paper className={'paper text-center'}>
    {props.children}
  </Paper>
)

export default PaperRefined