import React from 'react'
import './Styles.scss';

const SubmissionInfo = ({ correct }) => {
  const text = correct ? "✓ Correct" : "x Try again"
  const classModifier = `submissionInfo--${correct ? "correct" : "incorrect"}`
  return (
    <div className={`submissionInfo ${classModifier}`}>
      {text}
    </div>
  )
}

export default SubmissionInfo;