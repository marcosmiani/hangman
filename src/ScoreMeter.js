import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const ScoreWrapper = styled.div`
  border: 2px solid yellow;
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  color: white;
`

const Score = styled.div`
  min-height: 20px;
  margin: 16px;
  color: white;
`

const connector = connect(
  state => ({
    highest: state.scores.highest,
    latest: state.scores.latest
  })
)

const ScoreMeter = ({ highest, latest }) => (
  <ScoreWrapper>
    <Score>Highest so far: {highest}</Score>
    {latest > 0 && <Score>Latest game: {latest}</Score>}
  </ScoreWrapper>
)

export default connector(ScoreMeter)
