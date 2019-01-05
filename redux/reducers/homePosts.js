//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

//Define name and default value
export const homePosts = createReducer(
	[],
	{
		[types.SET_HOME_POSTS](state, action) {
			return  action.payload;
        }
    }
);
