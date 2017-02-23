import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  loading: false,
  showOnlyAt: null, // 'home', 'campus'
  games: [
    {
      _id: '1234',
      name: 'Betrayal',
      minPlayerCount: 3,
      maxPlayerCount: 5,
      atCampus: true
    }
  ],
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
