import { combineReducers } from 'redux'

/* My reducers */
import utilsReducer from './utils'
import cardsReducer from './cards'
import sheetsReducer from './sheets'


/* Combine all reducers into one big state.
   The result is passed to the Provider in ../src/index.js */
export default combineReducers({
    utils: utilsReducer,
//    cards: cardsReducer,
//    sheets: sheetsReducer,
})


