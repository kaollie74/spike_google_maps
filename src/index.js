import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';


//Reducer to retrieve information from Google
function* rootSaga() {
  yield takeEvery('GOOGLE_SEARCH', getSearch)
  yield takeEvery('POST_GOOGLE', postGoogle)
}

function* getSearch() {
  try {
    const response = yield Axios.get('/search');

    yield put({ type: 'SET_SEARCH', payload: response.data.results })
    console.log('response', response.data.results)
  }
  catch (error) {
    console.log('error', error);


  }
}

function* postGoogle (action){

  try {
    const response = yield Axios.post('/api/search', action.payload)
    yield put({type:'SET_SEARCH', payload: response.data.results})
    
  }
  catch(error){
    console.log('Error With POST', error);
    
  }
}

// function* fetchSearch (action){
//   try{
//     const response = yield Axios.post('/search', action.payload)
//     yield put ({type: 'SET_SEARCH', payload: response.data.data})

//   }
//   catch(error){
//     console.log('Error on Fetch', error);

//   }
// }

const googleApi = (state = [], action) => {
  if (action.type === 'SET_SEARCH') {
    return action.payload
  }
  return state
}



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

serviceWorker.unregister();

const reduxStore = createStore(
  combineReducers({
    googleApi,
    

  }),
  applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));
