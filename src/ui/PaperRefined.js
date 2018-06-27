import React from 'react'
// Material-ui
import { Paper } from 'material-ui'

const PaperRefined = (props) => (
  <Paper className={
    props.centered ?
      `paper flex-center text-center ${props.className}`
      :
      `paper ${props.className}`
  }>
    {props.children}
  </Paper>
)

export default PaperRefined