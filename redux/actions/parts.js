import * as types from "./types";

export function setParts(parts) {
	return {
		type: types.SET_PARTS,
		payload: parts
	};
}
