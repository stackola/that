import * as types from "./types";
import firebase from "react-native-firebase";
import { getUID } from "that/lib";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
export function setSettings(settings) {
	return {
		type: types.SET_SETTINGS,
		payload: settings
	};
}

export function settingsSubscribe() {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection("configuration")
			.doc("main")
			.onSnapshot(doc => {
				console.log("DATA FOR SETTINGS");
				console.log(doc);
				if (!doc._data) {
					dispatch(setSettings({}));
				} else {
					dispatch(setSettings(doc._data));
				}
			});
	};
}

/*
Example of an async function
export function click(id){
	return (dispatch, getState) => {
		let state=getState();		
		state.socket.socket.get('/user/click/14', function(body, jwr){
			//Dispatch redux action.
			dispatch(setUsername(body.username));
		} );
	}
}
*/
