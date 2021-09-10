import { ENABLE_NEXT_QUESTION,
  GET_QUESTIONS,
  TIMER_TOGLE,
  UPDATE_TIME } from '../actions';

const initialState = {
  questions: [],
  loading: true,
  answered: false,
  time: 0,
  timerIsOn: false,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS: {
    return { ...state, questions: action.payload, loading: false };
  }
  case ENABLE_NEXT_QUESTION: {
    return { ...state, answered: action.payload };
  }
  case UPDATE_TIME:
    return {
      ...state,
      time: action.payload,
    };
  case TIMER_TOGLE:
    return {
      ...state,
      timerIsOn: action.payload,
    };
  default:
    return state;
  }
};

export default matchReducer;
