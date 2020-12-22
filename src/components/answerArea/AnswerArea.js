import React from 'react'

import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';

import './Styles.scss';

const AnswerArea = ({isLoading, possibleAnswers, handleNext}) => {

  possibleAnswers = possibleAnswers.map((answer, idx) => {
    answer.id = idx;
    return answer;
  });

  const initialSelectedAnswersState = possibleAnswers.reduce((acc, answer) => {
      acc[answer.id] = false
      return acc
  }, {})


  const [selectedAnswers, setSelectedAnswers] = React.useState(initialSelectedAnswersState);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);

  console.log(initialSelectedAnswersState)
  const handleChange = (e) => {
    const answerId = e.target.name;
    setSelectedAnswers((prevState) => ({...prevState, [answerId]: !prevState[answerId]}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist()
    if (!isCorrect) {
      const selectedAnswerIds = Object.keys(selectedAnswers)
          .filter((id) => selectedAnswers[id])
          .map((id) => Number(id));
      const allAnswersCorrect = possibleAnswers.every((answer) => {
        const isSelected = selectedAnswerIds.includes(answer.id);
        return (answer.isCorrect && isSelected) || (!answer.isCorrect && !isSelected);
      });
      if (allAnswersCorrect) {
        setIsCorrect(true);
        console.log('good job!');
      } else {
        console.log('try again');
      };
    };
    if (!isSubmitted) {
      setIsSubmitted(true);
    };
    if (isCorrect && isSubmitted) {
      setIsSubmitted(false)
      setIsCorrect(false)
      setSelectedAnswers(initialSelectedAnswersState)
      handleNext(e);
    }
  };

  const selectionBoxes = possibleAnswers.map((answer) => {
    return (
      <SelectionBox
        key={answer.id}
        answer={answer}
        handleChange={handleChange}
        checked={selectedAnswers[answer.id] || false}
        isSubmitted={isSubmitted}
        allAnswersCorrect={isCorrect}
      />
    )
  });

  const buttonInactive = Object.keys(selectedAnswers).every((id) => !selectedAnswers[id]);

  return (
    <form className="answerArea" onSubmit={handleSubmit}>
      <div className="answerArea__selections">
        {selectionBoxes}
      </div>
      <div className="answerArea__submitButtonContainer">
        <Button
          type="submit"
          label="Submit"
          inactive={buttonInactive}
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}

export default AnswerArea
