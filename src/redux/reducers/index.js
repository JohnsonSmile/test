//index.js
//combineReducers方法，用于 Reducer 的拆分，便于以后添加其他函数
import { combineReducers } from "redux";
import userReducer from "./user.js";
import walletReducer from "./wallet.js";
import statusReducer from "./status.js";
import contractsReducer from "./contracts";
import pageReducer from "./page";

export default combineReducers({
  userReducer,
  walletReducer,
  statusReducer,
  contractsReducer,
  pageReducer,
});