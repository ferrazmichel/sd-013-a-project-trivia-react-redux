import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  const { player } = store.getState();
  localStorage.setItem('state', JSON.stringify({
    player,
  }));
});

if (window.Cypress) {
  window.store = store;
}

export default store;
