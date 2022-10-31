import { createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer)

export default store

// store는 createStore를 해서 rootReducer의 내용을 담을 수 있다. 
// 이 store는 export를 해서 index.js에서 provider해서 리액트 프로젝트 전역에서 useDispatch와 useSelector를 해서 전역에서 관리 가능하다