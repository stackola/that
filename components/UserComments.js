import React, { Component } from "react";
import PostLoader from "that/components/PostLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

import CommentLoader from "that/components/CommentLoader";

import CollectionLoader from "that/components/CollectionLoader";

export default class UserComments extends React.Component {
  render() {
    let userId = this.props.userId;
    return (
      <CollectionLoader
        path={"users/" + userId}
        realtime={false}
        collection={"comments"}
      >
        {comments => {
          console.log(comments);
          return (
            <View>
              {comments.map(c => {
                return (
                  <CommentLoader
                    loadChildren={false}
                    key={c.id}
                    path={c._data.comment.path}
                    marginBottom={2}
                    realtime={false}
                    linkToSelf={true}
                  />
                );
              })}
            </View>
          );
        }}
      </CollectionLoader>
    );
  }
}
