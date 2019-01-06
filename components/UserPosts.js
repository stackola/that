import React, { Component } from "react";
import PostLoader from "that/components/PostLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

import CollectionLoader from "that/components/CollectionLoader";

export default class UserPosts extends React.Component {
  render() {
    let userId = this.props.userId;
    return (
      <CollectionLoader
        path={"users/" + userId}
        realtime={false}
        collection={"posts"}
      >
        {posts => {
          console.log(posts);
          return (
            <View>
              {posts.map(p => {
                console.log(p.id);
                return (
                  <PostLoader
                    key={p.id}
                    path={p._data.post.path}
                    marginBottom={2}
                    realtime={true}
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
