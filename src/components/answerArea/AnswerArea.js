import React from 'react'

import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';

import './Styles.scss';

const AnswerArea = ({isLoading, possibleAnswers, handleNext}) => {

  const selectionBoxes = possibleAnswers.map((answer, index) => {
    return <SelectionBox id={index} key={index} answer={answer} />
  })

  return (
    <form className="answerArea" onSubmit={handleNext}>
      <div className="answerArea__selections">
        {selectionBoxes}
      </div>
      <div className="answerArea__submitButtonContainer">
        <Button
          type="submit"
          label="Submit"
          inactive
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}

export default AnswerArea
