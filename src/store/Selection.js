import { ADD_ANSWER, REMOVE_ANSWER, SET_ANSWER } from './type';

const defaultState = {
  answers: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ANSWER:
      return {
        ...state,
        answers: action.payload
      }
    case ADD_ANSWER: 
      return {
        ...state, 
        answers: [...state.answers, action.payload]
      }
    case REMOVE_ANSWER: 
      const filteredAnswers = state.answers.filter(ans => ans !== action.payload);
      return {
        ...state,
        answers: [...filteredAnswers]
      }
    default:
      return state
  }
}

export default reducer;