//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

//Define name and default value
export const notification = createReducer(
	{ shown: false, text: "" },
	{
		[types.SHOW_NOTI](state, action) {
			return { ...state, shown: true, text: action.payload };
		},
		[types.HIDE_NOTI](state, action) {
			return { ...state, shown: false };
		}
	}
);
