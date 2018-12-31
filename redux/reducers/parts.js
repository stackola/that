//Reducers: Manages data, state
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
	combineReducers
} from 'redux';

//Define name and default value
export const parts = createReducer({}, {
	[types.SET_PARTS](state, action) {
		return action.payload;
	}
})