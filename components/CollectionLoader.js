import React, { PureComponent } from "react";
import colors from "that/colors";
import Loading from "that/components/Loading";

import firebase from "react-native-firebase";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class CollectionLoader extends PureComponent {
  constructor(p) {
    super(p);
    this.state = { loading: true, items: null };
  }
  subscribeToChanges() {
    let path = this.props.path;
    let collection = this.props.collection;
    this.sub1 = firebase
      .firestore()
      .doc(path)
      .collection(collection)
      .onSnapshot(snap => {
        this.process(snap);
      });
  }
  updateOnce() {
    let path = this.props.path;
    let collection = this.props.collection;
    firebase
      .firestore()
      .doc(path)
      .collection(collection)
      .get()
      .then(snap => {
        this.process(snap);
      });
  }
  process(snap) {
    this.setState({ items: snap._docs, loading: false });
  }
  componentDidMount() {
    if (this.props.realtime) {
      //subscribe to item
      this.subscribeToChanges();
    } else {
      //fetch item once
      this.updateOnce();
    }
  }
  componentWillUnmount() {
    this.sub1 && this.sub1();
  }
  render() {
    return !this.state.loading ? (
      this.props.children(
        this.props.sanitize
          ? this.props.sanitize(this.state.items)
          : this.state.items
      )
    ) : this.props.loading == false ? null : this.props.loadingComponent ? (
      this.props.loadingComponent
    ) : (
      <Loading />
    );
  }
}
