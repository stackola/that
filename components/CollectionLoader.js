import React, { PureComponent } from "react";
import colors from "that/colors";
import Loading from "that/components/Loading";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  subHours,
  subMonths
} from "date-fns";
import firebase from "react-native-firebase";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

function getHourIndex(d) {
  if (!d) {
    d = new Date();
  }
  var datestring =
    d.getUTCFullYear() +
    "-" +
    ("0" + (d.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getUTCDate()).slice(-2) +
    "-" +
    ("0" + d.getUTCHours()).slice(-2) +
    "-";
  return datestring;
}

function getDayIndex(d) {
  if (!d) {
    d = new Date();
  }
  var datestring =
    d.getUTCFullYear() +
    "-" +
    ("0" + (d.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getUTCDate()).slice(-2) +
    "-";
  return datestring;
}

function getMonthIndex(d) {
  if (!d) {
    d = new Date();
  }
  var datestring =
    d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-";
  return datestring;
}

function getYearIndex(d) {
  if (!d) {
    d = new Date();
  }
  var datestring = d.getUTCFullYear() + "-";
  return datestring;
}

let pageSize = 5;
export default class CollectionLoader extends PureComponent {
  constructor(p) {
    super(p);
    this.state = { loading: true, items: null, adding: true, hasMore: true };
  }
  getRef() {
    let path = this.props.path;
    let collection = this.props.collection;
    if (this.props.sort && this.props.sort == "points") {
      if (this.props.timeFrame == "hour") {
        return firebase
          .firestore()
          .doc(path)
          .collection(collection)
          .where(
            "hourIndex",
            ">=",
            getHourIndex(subHours(new Date(), 1)) + "99999999999"
          )
          .orderBy("hourIndex", "DESC")
          .orderBy("time", "DESC");
      }
      if (this.props.timeFrame == "day") {
        return firebase
          .firestore()
          .doc(path)
          .collection(collection)
          .where(
            "dayIndex",
            ">=",
            getDayIndex(subDays(new Date(), 1)) + "99999999999"
          )
          .orderBy("dayIndex", "DESC")
          .orderBy("time", "DESC");
      }
      if (this.props.timeFrame == "month") {
        return firebase
          .firestore()
          .doc(path)
          .collection(collection)
          .where(
            "monthIndex",
            ">=",
            getMonthIndex(subMonths(new Date(), 1)) + "99999999999"
          )
          .orderBy("monthIndex", "DESC")
          .orderBy("time", "DESC");
      }
      return firebase
        .firestore()
        .doc(path)
        .collection(collection)
        .orderBy("points", "DESC")
        .orderBy("time", "DESC");
    }
    return firebase
      .firestore()
      .doc(path)
      .collection(collection)
      .orderBy(this.props.sort || "time", this.props.dir || "DESC");
  }
  subscribeToChanges() {
    this.sub1 = this.getRef().onSnapshot(snap => {
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
    this.setState({
      items: snap._docs,
      loading: false,
      adding: false,
      hasMore: snap._docs.length == pageSize
    });
  }
  addRows(rows) {
    this.setState(
      {
        items: [].concat.apply([], [this.state.items, rows]),
        adding: false,
        hasMore: rows.length == pageSize
      },
      () => {
        //console.log(this.state);
      }
    );
  }
  loadMore() {
    if (!this.props.realtime && !this.state.adding && this.state.hasMore) {
      this.setState({ adding: true }, () => {
        let r = this.getRef();
        if (this.props.sort && this.props.sort == "points") {
          r.startAt(this.state.items[this.state.items.length - 1])
            .startAfter(this.state.items[this.state.items.length - 1].time)
            .limit(pageSize + 1)
            .get()
            .then(rows => {
              this.addRows(rows._docs.slice(1));
            });
        } else {
          r.startAfter(this.state.items[this.state.items.length - 1])
            .limit(pageSize)
            .get()
            .then(rows => {
              this.addRows(rows._docs);
            });
        }
      });
    } else {
      //console.log("wont even try");
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
        },
        this.state.hasMore
      )
    ) : this.props.loading == false ? null : this.props.loadingComponent ? (
      this.props.loadingComponent
    ) : (
      <Loading />
    );
  }
}
