import React, { Component } from "react";
import PostLoader from "that/components/PostLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

import CommentLoader from "that/components/CommentLoader";

import CollectionLoader from "that/components/CollectionLoader";
import InfiniteList from "that/components/InfiniteList";

export default class UserComments extends React.Component {
  render() {
    let userId = this.props.userId;
    return (
      <InfiniteList
        path={"users/" + userId}
        collection={"comments"}
        header={this.props.header}
        renderItem={i => {
          return (
            <CommentLoader
              linkToSelf={true}
              path={i.item._data.comment.path}
              marginBottom={2}
              loadChildren={false}
              realtime={true}
            />
          );
        }}
      />
    );
  }
}
