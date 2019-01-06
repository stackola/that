import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { sanitizeUser } from "that/lib";
import { withNavigation } from "react-navigation";
import firebase from "react-native-firebase";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class UserLoader extends Component {
  constructor(p) {
    super(p);
    this.state = { loading: true, user: null };
  }
  subscribeToChanges() {
    let userId = this.props.userId;
    this.sub1 = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot(snap => {
        console.log("userlaoder", snap);
        this.setState({ user: snap.data() });
      });
  }
  updateOnce() {
    let userId = this.props.userId;
    this.sub1 = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then(snap => {
        console.log("userlaoder", snap);
        this.setState({ user: snap.data() });
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
    return this.state.user
      ? this.props.children(
          this.props.sanitize ? sanitizeUser(this.state.user) : this.state.user
        )
      : null;
  }
}
