import * as userActions from "./user";
import * as partsActions from "./parts";
import * as eventsActions from "./events";
import * as settingsActions from "./settings";
import * as homePostsActions from "./homePosts";

export const ActionCreators = Object.assign(
	{},
	userActions,
	partsActions,
	homePostsActions,
	settingsActions,
	eventsActions
);
