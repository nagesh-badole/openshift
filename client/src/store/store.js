import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
  }
  
  let createStoreWithMiddleware = ''
  // if (process.env.REACT_APP_ENV === 'dev') {
  //   createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)
  // } else {
  //   createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
  // }
  createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)
export default createStoreWithMiddleware(rootReducer)