import { combineReducers } from "redux";

import testReducer from './reducers/test'
import userReducer from './reducers/user'


const rootReducer = combineReducers({
    test:testReducer,
    users:userReducer,
})

export default rootReducer