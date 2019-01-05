import React, { Component } from "react";
import CommentLoader from "that/components/CommentLoader";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { TouchableOpacity, View, Text } from "react-native";

export default class UserComments extends React.Component {
  constructor(props) {
    super(props);
    //initialize local state
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    let userId = this.props.user.id;
    this.sub1 = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("comments")
      .get()
      .then(snap => {
        console.log("got comments snap", snap);
        this.setState(
          {
            loaded: 5,
            comments: snap.docs.map(d => {
              return d.data().comment || {};
            })
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }
  loadMore() {
    if (this.state.loaded < this.state.comments.length) {
      console.log("loading more");
      this.setState({ loaded: this.state.loaded + 5 });
    }
  }
  componentWillUnmount() {}
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {this.state.comments &&
          this.state.comments.slice(0, this.state.loaded).map(r => {
            return (
              <CommentLoader
                canVote={this.props.canVote}
                navigate={(a, b, c) => {
                  this.props.navigate(a, b, c);
                }}
                onPress={path => {
                  console.log("comment pressed");
                  this.props.navigate(
                    "SingleComment",
                    { commentPath: path },
                    path
                  );
                }}
                key={r.path.toString()}
                path={r}
                loadChildren={false}
              />
            );
          })}
        {this.state.comments && (
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
