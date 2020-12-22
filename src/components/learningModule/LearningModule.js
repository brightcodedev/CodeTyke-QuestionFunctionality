import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Styles.scss';
import Feedback from '../feedback/Feedback';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [choicesSelected, setChoicesSelected] = React.useState([]);
  const [correctChoicesSelected, setCorrectChoicesSelected] = React.useState(null);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};

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

  const selectionsCompletelyCorrect = () => {
    if (choicesSelected.length) {
      for (let id = 0; id < currentQuestion.possibleAnswers.length; id++) {
        let possibleAnswer = currentQuestion.possibleAnswers[id];
        if (possibleAnswer.isCorrect && !choicesSelected.includes(id)) return false;
        if (!possibleAnswer.isCorrect && choicesSelected.includes(id)) return false;
      }
      return true;
    }
  }

  const handleSubmit=()=> {
    if (correctChoicesSelected) { 
      setChoicesSelected([]);
      setCorrectChoicesSelected(null);

      if(currentQuestionId < quizData.totalQuestions-1){
        setIsLoading(true)
        setTimeout(function(){
          setCurrentQuestionId(currentQuestionId+1);
          setIsLoading(false)
        }, 700 );
      } else if (!isComplete) {
        setIsComplete(true);
      } else {
        setCurrentQuestionId(0);
        setIsComplete(false);
        setGameStatus('new');
      }
    } else {
      if (selectionsCompletelyCorrect()) {
        setCorrectChoicesSelected(true);
      } else {
        setCorrectChoicesSelected(false);
      }
    }
    
  }
  
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} setChoicesSelected={setChoicesSelected} choicesSelected={choicesSelected} correctChoicesSelected={correctChoicesSelected} setCorrectChoicesSelected={setCorrectChoicesSelected}/>
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

            <div className="learningModule__resultContainer">
              {correctChoicesSelected !== null && <Feedback correct={correctChoicesSelected} />}
              
              <div className="learningModule__submitButtonContainer">
                <Button 
                  label={correctChoicesSelected ? "Next" : "Submit"} 
                  inactive={!choicesSelected.length}
                  isLoading={isLoading}
                  handleSubmit={handleSubmit} 
                  customIcon={<FontAwesomeIcon icon={faArrowRight} />}
                />
              </div>
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
