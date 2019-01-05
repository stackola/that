import React, { Component } from "react";
import PostLoader from "that/components/PostLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    //initialize local state
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    let userId = this.props.user.id;
    this.sub1 = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("posts")
      .get()
      .then(snap => {
        console.log("got posts snap", snap);
        this.setState(
          {
            loaded: 1,
            posts: snap.docs.map(d => {
              return d.data().post || {};
            })
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }
  loadMore() {
    if (this.state.loaded < this.state.posts.length) {
      console.log("loading more");
      this.setState({ loaded: this.state.loaded + 1 });
    }
  }
  componentWillUnmount() {}
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {this.state.posts &&
          this.state.posts.slice(0, this.state.loaded).map(r => {
            return (
              <PostLoader
                navigate={(a, b, c) => {
                  this.props.navigate(a, b, c);
                }}
                key={r.path.toString()}
                path={r}
              />
            );
          })}
        {this.state.posts && (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              borderBottomWidth: 0,
              borderColor: colors.seperator
            }}
            onPress={() => {
              this.loadMore();
            }}
          >
            <Text style={{ color: colors.text }}>Load more</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
