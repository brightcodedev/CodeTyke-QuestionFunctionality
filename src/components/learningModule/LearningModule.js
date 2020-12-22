import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_ANSWER, REMOVE_ANSWER, SET_ANSWER } from '../../store/type';

import './Styles.scss';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inactive, setInactive] = React.useState(true);
  
  const answers = useSelector(state => state.selection.answers);
  const dispatch = useDispatch();

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};

  React.useEffect(()=>{
    getQuizData();
    if (answers.length !== 0) {
      setInactive(false);
    } else {
      setInactive(true);
    }
  },[answers]);

  const checkAnswers = () => {
    let allCorrect;
    const question = quizData.questionArr.find(ans => ans.id === currentQuestionId);
    // TO LATER CHECK IF USER IS PARTIALLY RIGHT DECREASE THE totalAnswers LENGTH TO 0
    // let totalAnswers = question.possibleAnswers.filter(ans => ans.isCorrect).length;
    
    question.possibleAnswers.map(ans => {
      if(answers.includes(ans.text)) {
        allCorrect = true
      } else {
        // alert user they did not get it right
        setInactive(!inactive)
        dispatch({ type: SET_ANSWER, payload: [] })
        allCorrect = false
      }
    })
    return allCorrect;
  }

  const collectChoices = (boxId) => {
    if (!answers.includes(boxId)) {
      dispatch({ type: ADD_ANSWER, payload: boxId });
    } else {
      dispatch({ type: REMOVE_ANSWER, payload: boxId });
    }
  }

  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        console.log("data ->", data)
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions-1){
        const proceed = checkAnswers()

        if (proceed) {
          setIsLoading(true)
          setTimeout(function(){
            setCurrentQuestionId(currentQuestionId+1);
            setIsLoading(false)
          }, 700 );
          dispatch({ type: SET_ANSWER, payload: [] })
        }

    } else if (!isComplete) {
      setIsComplete(true);
    } else {
      setCurrentQuestionId(0);
      setIsComplete(false);
      setGameStatus('new');
    }
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox 
        id={index} 
        key={index} 
        answer={answer} 
        collectChoices={collectChoices}
        />
    })
  }

  console.log("answers", answers)

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
              <Button 
                label="Submit" 
                inactive={inactive}
                isLoading={isLoading}
                customIcon={<FontAwesomeIcon icon={faArrowRight} />}
                handleSubmit={handleSubmit} 
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
