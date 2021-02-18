import { combineReducers } from 'redux'


import createEnvreducer from './createEnvreducer'


const rootReducer = combineReducers({
  
  createEnvDetails: createEnvreducer,
 
})

export default rootReducer