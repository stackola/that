import * as types from "./types";
import firebase from "react-native-firebase";
import { getUID } from "that/lib";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
export function setEvents(events) {
	return {
		type: types.SET_EVENTS,
		payload: events
	};
}

export function eventsSubscribe() {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection("users")
			.doc(getUID())
			.collection("events")
			.orderBy("time", "DESC")
			.onSnapshot(doc => {
				console.log("DATA FOR EVENTS: ");
				console.log(doc);
				if (!doc._docs) {
					dispatch(setEvents([]));
				} else {
					dispatch(
						setEvents(
							doc._docs.map(d => {
								return d.data();
							})
						)
					);
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
