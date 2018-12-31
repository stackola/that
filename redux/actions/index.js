import * as userActions from './user';
import * as partsActions from './parts';
import * as notificationActions from './notification';

export const ActionCreators = Object.assign({}, userActions, partsActions, notificationActions);