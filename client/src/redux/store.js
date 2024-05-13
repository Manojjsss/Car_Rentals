import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk directly from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { carsReducer } from './reducers/carsReducers';
import { alertsReducer } from './reducers/alertsReducers';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    carsReducer,
    alertsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
