import { combineReducers } from "redux";

import * as userReducer from "./user";
import * as partsReducer from "./parts";
import * as notificationReducer from "./notification";

export default combineReducers(
	Object.assign({}, userReducer, partsReducer, notificationReducer)
);
