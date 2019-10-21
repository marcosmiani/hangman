import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Strikes = styled.div`
  min-height: 20px;
  color: white;
`

const connector = connect(
  state => ({
    strikes: state.attempts.strikes
  })
)

const ScoreMeter = ({ strikes }) => (
  <div>
    <Strikes>Stikes available: {strikes}</Strikes>
  </div>
)

export default connector(ScoreMeter)
