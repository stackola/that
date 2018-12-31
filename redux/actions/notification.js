import * as types from "./types";

export function displayNotification(text, delay = 4000) {
	return (dispatch, getState) => {
		dispatch(showNotification(text));
		setTimeout(() => {
			dispatch(hideNotification());
		}, delay);
	};
}
export function showNotification(text) {
	return {
		type: types.SHOW_NOTI,
		payload: text
	};
}

export function hideNotification() {
	return {
		type: types.HIDE_NOTI
	};
}
