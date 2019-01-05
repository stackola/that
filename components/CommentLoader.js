import React, { Component } from "react";
import Comment from "that/components/Comment";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { ActivityIndicator, View } from "react-native";

export default class CommentLoader extends React.Component {
  constructor(props) {
    super(props);
    //initialize local state
    this.state = {
      comment: null
    };
  }
  componentDidMount() {
    let ref = this.props.path;
    this.sub1 = firebase
      .firestore()
      .doc(ref.path)
      .onSnapshot(snap => {
        console.log("got single comment snap snap", snap);
        this.setState({ comment: { path: ref.path, ...snap.data() } }, () => {
          console.log(this.state);
        });
      });
  }
  componentWillUnmount() {
    this.sub1 && this.sub1();
  }
  render() {
    return this.state.comment ? (
      <Comment
        key={this.state.comment.id}
        level={0}
        canVote={this.props.canVote}
        data={this.state.comment}
        onPress={d => {
          this.props.onPress(d);
        }}
        loadChildren={this.props.loadChildren}
        navigate={(a, b, c) => {
          console.log("navigat!");
          this.props.navigate(a, b, c);
        }}
      />
    ) : (
      <View
        style={{
          height: 80,
          backgroundColor: colors.backgroundOffset,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}
