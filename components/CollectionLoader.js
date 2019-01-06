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
let pageSize = 5;
export default class CollectionLoader extends PureComponent {
  constructor(p) {
    super(p);
    this.state = { loading: true, items: null };
  }
  getRef() {
    let path = this.props.path;
    let collection = this.props.collection;
    return firebase
      .firestore()
      .doc(path)
      .collection(collection)
      .orderBy("time", "DESC");
  }
  subscribeToChanges() {
    this.sub1 = this.getRef()
      .onSnapshot(snap => {
        this.process(snap);
      });
  }
  updateOnce() {
    this.getRef()
      .limit(pageSize)
      .get()
      .then(snap => {
        this.process(snap);
      });
  }
  process(snap) {
    this.setState({ items: snap._docs, loading: false });
  }
  addRows(rows) {
    this.setState({
      items: [].concat.apply([], [this.state.items, rows]),
      loading: false
    });
  }
  loadMore() {
    if (!this.props.realtime) {
      this.getRef()
        .startAfter(this.state.items[this.state.items.length - 1])
        .limit(pageSize)
        .get()
        .then(rows => {
          this.addRows(rows._docs);
        });
    }
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
          : this.state.items,
        () => {
          this.loadMore();
        }
      )
    ) : this.props.loading == false ? null : this.props.loadingComponent ? (
      this.props.loadingComponent
    ) : (
      <Loading />
    );
  }
}
