import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';
import SubmissionInfo from '../submissionInfo/SubmissionInfo';

import './Styles.scss';

const initialCheckedState = {
  0: false,
  1: false,
  2: false,
  3: false
}

const checkAnswer = (possibleAnswers, userAnswers) => {
  return possibleAnswers.every((answer, idx) => answer.isCorrect === userAnswers[idx])
}

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)
  const [checkedState, setCheckedState] = React.useState(initialCheckedState);
  const [solved, setSolved] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  const inactive = Object.values(checkedState).every(el => el === false);

  React.useEffect(()=>{
    getQuizData();
  },[]);

  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions){
        setIsLoading(true)
        const isCorrect = checkAnswer(currentQuestion.possibleAnswers, checkedState);
        if (isCorrect && solved) {
          const nextId = currentQuestionId+1;
          setTimeout(function(){
            if (nextId < quizData.totalQuestions) {
              setCurrentQuestionId(nextId);
              setIsLoading(false);
              setCheckedState(initialCheckedState);
              setShowInfo(false);
              setSolved(false);
            } else {
              setCurrentQuestionId(0);
              setIsComplete(false);
              setGameStatus('new');
            }
          }, 700 );
        } else if (isCorrect) {
          setSolved(true);
          setShowInfo(true);
          setIsLoading(false);
        } else {
          setShowInfo(true);
          setTimeout(function() {
            setShowInfo(false);
            setCheckedState(initialCheckedState);
          }, 1000)
          setIsLoading(false);
        }
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }

  const handleChange = e => {
    const id = e.target.id;
    setCheckedState({...checkedState, [id]: !checkedState[id]});
  }

  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox 
                id={index} 
                key={index} 
                answer={answer} 
                checked={checkedState[index]} 
                infoColor={showInfo}
                solved={solved}
                onChange={handleChange} 
              />
    })
  }

  return (
    <div className="learningModule">
      { currentQuestion.title && !isComplete &&
        <>
          <ProgressBar total={quizData.totalQuestions + 1} current={currentQuestion.id + 1} />
          <div className="learningModule__header">
            <div className="learningModule__title">
              { currentQuestion.title }
            </div>
            <div className="learningModule__subHeader">
              { currentQuestion.additionalInfo }
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">
              { possibleAnswers }
            </div>
            <div className="learningModule__submitButtonContainer">
              {showInfo ? <SubmissionInfo correct={solved} /> : null}
              <Button 
                label={solved ? "Next" : "Submit"} 
                inactive={inactive}
                isLoading={isLoading}
                handleSubmit={ handleSubmit } 
              />
            </div>
          </div>
        </>
      }
      {isComplete &&
        <Intro message="Congratulations. You've completed this level!" buttonLabel="Play again"  buttonClick={handleSubmit} />
      }
    </div>
  )
}

export default LearningModule;
