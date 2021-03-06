import * as types from "./types";
import firebase from "react-native-firebase";
import { getUID, getHomePosts } from "that/lib";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
export function setHomePosts(posts) {
  return {
    type: types.SET_HOME_POSTS,
    payload: posts
  };
}

export function subHomePosts() {
  return (dispatch, getState) => {
    return getHomePosts().then(list => {
      return Promise.all(
        list.map(g => {
          return firebase
            .firestore()
            .collection("groups")
            .doc(g.slug)
            .collection("posts")
            .orderBy("time", "DESC")
            .limit(25)
            .get()
            .then(s => {
              return s._docs;
            });
        })
      ).then(s => {
        if (s) {
          dispatch(setHomePosts([].concat.apply([], s)));
        }
        return;
      });
    });
  };
}
