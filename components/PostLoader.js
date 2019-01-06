import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { withNavigation } from "react-navigation";
import Post from "that/components/Post";

import firebase from "react-native-firebase";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class PostLoader extends Component {
  constructor(p) {
    super(p);
    this.state = { loading: true, post: null };
  }
  subscribeToChanges() {
    let path = this.props.path;
    this.sub1 = firebase
      .firestore()
      .doc(path)
      .onSnapshot(snap => {
        console.log("got single post snap", snap);
        this.setState({ post: snap.data(), loading: false });
      });
  }
  updateOnce() {
    let path = this.props.path;
    this.sub1 = firebase
      .firestore()
      .doc(path)
      .get()
      .then(snap => {
        console.log("got single post snap", snap);
        this.setState({ post: snap.data(), loading: false });
      });
  }
  componentDidMount() {
    //
    if (this.props.realtime) {
      //subscribe to post
      this.subscribeToChanges();
    } else {
      //fetch post once
      this.updateOnce();
    }
  }
  render() {
    return this.state.loading ? (
      <View style={{height:100, backgroundColor:colors.postBackground, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator />
      </View>
    ) : (
      <Post linkToSelf={this.props.linkToSelf} data={this.state.post || {}} />
    );
  }
}
