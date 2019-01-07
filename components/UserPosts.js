import React, { Component } from "react";
import PostLoader from "that/components/PostLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

import InfiniteList from "that/components/InfiniteList";

export default class UserPosts extends React.Component {
  render() {
    let userId = this.props.userId;
    return (
      <InfiniteList
        path={"users/" + userId}
        collection={"posts"}
        header={this.props.header}
        renderItem={i => {
          return (
            <PostLoader
              linkToSelf={true}
              path={i.item._data.post.path}
              marginBottom={4}
              realtime={true}
            />
          );
        }}
      />
    );
  }
}
