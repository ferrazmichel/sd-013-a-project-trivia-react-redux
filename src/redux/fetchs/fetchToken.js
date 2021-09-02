import {
  actionGetTokenError,
  actionGetTokenSucess,
} from '../actions/index'

const fetchToken = () => async (dispatch) => {
  const resp = await fetch('https://opentdb.com/api_token.php?command=request')
}