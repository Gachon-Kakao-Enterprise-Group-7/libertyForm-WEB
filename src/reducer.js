import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //react-persist를 사용해 localStorage에 저장


import testReducer from './reducers/test'
import userReducer from './reducers/user'
//만들어져있는 리듀서 2개를 import 해온다.

const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage,
    // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ["auth"]
    // blacklist -> 그것만 제외합니다
  };


const rootReducer = combineReducers({
    test:testReducer,
    users:userReducer,
})  // rootReducer를 만들어서 testReducer와 userReducer를 combine해준다음에 export 해준다.

export default persistReducer(persistConfig, rootReducer);