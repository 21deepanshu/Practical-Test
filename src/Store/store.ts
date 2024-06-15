import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import recordReducer from "../Redux-services/reducers/recordReducer";
const rootReducer = combineReducers({
  recordData: recordReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
