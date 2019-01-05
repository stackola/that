import { combineReducers } from "redux";

import * as userReducer from "./user";
import * as partsReducer from "./parts";
import * as eventsReducer from "./events";
import * as homePostsReducer from "./homePosts";
import * as notificationReducer from "./notification";

export default combineReducers(
	Object.assign({}, userReducer, partsReducer, notificationReducer, eventsReducer, homePostsReducer)
);
