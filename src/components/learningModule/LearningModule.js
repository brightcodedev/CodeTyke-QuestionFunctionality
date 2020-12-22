import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import AnswerArea from '../answerArea/AnswerArea'
import Intro from '../intro/Intro';

import './Styles.scss';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  let possibleAnswers = currentQuestion.possibleAnswers || [];

  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = () => {
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleNext = (event) => {
    event.preventDefault();
    if(currentQuestionId < quizData.totalQuestions-1){
        setIsLoading(true);
        setTimeout(function(){
          setCurrentQuestionId(currentQuestionId+1);
          setIsLoading(false);
        }, 700 );
    } else if (!isComplete) {
      setIsComplete(true);
    } else {
      setCurrentQuestionId(0);
      setIsComplete(false);
      setGameStatus('new');
    }
  }

  return (
    <div className="learningModule">
      {currentQuestion.title && !isComplete &&
        <>
          <ProgressBar total={quizData.totalQuestions + 1} current={currentQuestion.id + 1} />
          <div className="learningModule__header">
            <div className="learningModule__title">
              {currentQuestion.title}
            </div>
            <div className="learningModule__subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>
          <AnswerArea isLoading={isLoading} possibleAnswers={possibleAnswers} handleNext={handleNext}/>
        </>
      }
      {isComplete &&
        <Intro message="Congratulations. You've completed this level!" buttonLabel="Play again"  buttonClick={handleNext} />
      }
    </div>
  )
}

export default LearningModule;
