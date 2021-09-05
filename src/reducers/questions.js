import {
  IS_LOADING,
  REQUEST_SHOW_MILHAO_SUCESS,
  REQUEST_FAILED,
} from '../actions/actionsTypes';

// const testState = {
//   isLoading: false,
//   token: {
//     response_code: 0,
//     response_message: 'Token Generated Successfully!',
//     token: 'c5aee20b51fda8468199057d1c4b8a5638a329a9742364432e4b152e2ff4ef75',
//   },
//   questions: {
//     response_code: 0,
//     results: [
//       {
//         category: 'Entertainment: Video Games',
//         type: 'multiple',
//         difficulty: 'medium',
//         question: 'Which of these songs does NOT play during the Ruins segments of the 2015 game &quot;Undertale&quot;?',
//         correct_answer: 'Another Medium',
//         incorrect_answers: [
//           'Anticipation',
//           'Unnecessary Tension',
//           'Ruins',
//         ],
//       },
//       {
//         category: 'Entertainment: Television',
//         type: 'multiple',
//         difficulty: 'easy',
//         question: 'Who won Big Brother 2014 UK?',
//         correct_answer: 'Helen Wood',
//         incorrect_answers: [
//           'Christopher Hall',
//           'Pauline Bennett',
//           'Pavandeep &quot;Pav&quot; Paul',
//         ],
//       },
//       {
//         category: 'General Knowledge',
//         type: 'multiple',
//         difficulty: 'easy',
//         question: 'What was the first ever London Underground line to be built?',
//         correct_answer: 'Metropolitan Line',
//         incorrect_answers: [
//           'Circle Line',
//           'Bakerloo Line',
//           'Victoria Line',
//         ],
//       },
//       {
//         category: 'Entertainment: Video Games',
//         type: 'multiple',
//         difficulty: 'medium',
//         question: 'What is the name of the common, gun-toting enemies of the &quot;Oddworld&quot; video game series?',
//         correct_answer: 'Sligs',
//         incorrect_answers: [
//           'Scrabs',
//           'Slogs',
//           'Glukkons',
//         ],
//       },
//       {
//         category: 'Entertainment: Video Games',
//         type: 'multiple',
//         difficulty: 'hard',
//         question: 'In the &quot;Pikmin&quot; games, which of the following pikmin colors lacks it&#039;s own &quot;Onion&quot; nest?',
//         correct_answer: 'Purple',
//         incorrect_answers: [
//           'Winged',
//           'Blue',
//           'Rock',
//         ],
//       },
//     ],
//   },
// };

const INITIAL_STATE = {
  isLoading: true,
  token: '',
  questions: {},
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return { ...state, isLoading: true };

  case REQUEST_SHOW_MILHAO_SUCESS:
    return { ...state,
      isLoading: false,
      token: action.token,
      questions: action.questions,
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };

  default:
    return state;
  }
};

export default questions;
