import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import firebase from "react-native-firebase";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,

  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";

export default class LiveList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      itemsArray: []
    };
    if (Platform.OS === "android") {
      //UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  addItem(item, id, page, isLastItem) {
    //do some updateKey magic
    console.log("add item", id, { page });
    item = { ...item, page: page };
    let newPage = { ...(this.state.items[page] || []), [id]: item };
    let newState = { items: { ...this.state.items, [page]: newPage } };
    if (isLastItem) {
      //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      newState = {
        ...newState,
        itemsArray:
          this.props.sort == "points"
            ? this.sortByPoints(newState.items)
            : this.sortByTime(newState.items)
      };
    }
    this.setState(newState, () => {});
  }

  removeItem(id, page, isLastItem) {
    console.log("remove item item", id, { page });
    let newPage = { ...(this.state.items[page] || []), [id]: null };
    delete newPage[id];
    let newState = { items: { ...this.state.items, [page]: newPage } };
    if (isLastItem) {
      //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      newState = {
        ...newState,
        itemsArray:
          this.props.sort == "points"
            ? this.sortByPoints(newState.items)
            : this.sortByTime(newState.items)
      };
    }

    this.setState(newState, () => {});
  }

  processChange(c, page, isLastItem) {
    console.log("change is process", c, { page });
    if (c.type == "added" || c.type == "modified") {
      let id = c._document.id;
      let item = { data: c._document._data, id: id, ref:c._document };
      this.addItem(item, id, page, isLastItem);
    }
    if (c.type == "removed") {
      let id = c._document.id;
      this.removeItem(id, page, isLastItem);
    }
  }

  sortByTime(items) {
    let seen = {};
    return Object.values(
      Object.values(items).reduce((a, b) => {
        return Object.values(a).concat(Object.values(b));
      })
    )
      .sort((a, b) => {
        return new Date(b.data.time) - new Date(a.data.time);
      })
      .filter(p => {
        if (!seen[p.id]) {
          seen[p.id] = true;
          return true;
        } else {
          return false;
        }
      });
  }

  sortByPoints(items) {
    let seen = {};
    return Object.values(
      Object.values(items).reduce((a, b) => {
        return Object.values(a).concat(Object.values(b));
      })
    )
      .sort((a, b) => {
        return b.data.points - a.data.points;
      })
      .filter(p => {
        if (!seen[p.id]) {
          seen[p.id] = true;
          return true;
        } else {
          return false;
        }
      });
  }

  componentDidMount() {
    //get first x posts
    this.getter = new LiveGetter(
      {
        processChange: (item, page, isLastItem) => {
          this.processChange(item, page, isLastItem);
        }
      },
      this.props.path,
      this.props.collection,
      this.props.sort || "time",
      this.props.timeFrame || "hour",
      this.props.pageSize
    );
    //
  }
  componentWillUnmount = () => {
    this.getter.destructor();
  };
  shouldLoadMore() {
    let pageSize = this.props.pageSize ? this.props.pageSize : 10;
    console.log(pageSize);
    console.log(
      this.state.itemsArray,
      this.state.itemsArray.length != 0,
      this.state.itemsArray.length % pageSize == 0
    );
    return (
      this.state.itemsArray &&
      this.state.itemsArray.length != 0 &&
      this.state.itemsArray.length % pageSize == 0
    );
  }
  loadMore() {
    console.log("flatlist trying to load stuff");
    if (this.shouldLoadMore()) {
      console.log("doing so.");
      this.getter.nextPage(
        this.state.itemsArray[this.state.itemsArray.length - 1]
      );
    }
  }
  render() {
    let Item = this.props.item;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={i => {
            return i.id;
          }}
          onLayout={()=>{
            
          }}
          onEndReached={() => {
            this.loadMore();
          }}
          onEndReachedThreshold={0.01}
          style={{ flex: 1 }}
          data={this.state.itemsArray}
          renderItem={i => {
            return Item(i);
          }}
        />
      </View>
    );
  }
}

class LiveGetter {
  constructor(
    funcs,
    path,
    collection,
    sort = "time",
    timeFrame = "day",
    pageSize = 10
  ) {
    this.processChange = funcs.processChange;
    this.path = path;
    this.collection = collection;
    this.sort = sort;
    this.page = 0;
    this.hasMore = false;
    this.timeFrame = timeFrame;
    this.pageSize = pageSize;
    this.query = this.defaultQuery();
    this.listeners = [];
    this.page = 0;
    //console.log(this.query);
    //perform initial query.
    let sub = this.query.limit(this.pageSize).onSnapshot(stuff => {
      //console.log("GOT SNAP", stuff);
      //console.log("got page " + 0 + " snap!", stuff);
      this.processUpdate(stuff, 0);
    });
    this.listeners.push(sub);
  }
  nextPage(lastItem) {
    this.page++;
    let page = this.page;
    let q = this.defaultQuery();
    let sub = this.defaultAfter(q, lastItem).onSnapshot(stuff => {
      this.processUpdate(stuff, page);
      //console.log("got page " + page + " snap!", stuff);
    });
    this.listeners.push(sub);
  }

  defaultAfter(q, item) {
    if (this.sort == "time") {
      return q.startAfter(item.data.time).limit(this.pageSize);
    }
    if (this.sort == "points") {
      return q
        .startAt(item.ref)
        .startAfter(item.data.time)
        .limit(this.pageSize + 1);
    }
  }
  destructor() {
    this.listeners.map(l => {
      if (l) {
        l();
      }
    });
  }
  processUpdate(stuff, page) {
    let arr = stuff._changes;
    if (this.sort == "points" && page != 0) {
      arr = arr.slice(1);
    }
    arr.map((c, i) => {
      console.log("updating row!");
      console.log(c, page, i == arr.length - 1);
      this.processChange(c, page, i == arr.length - 1);
    });
  }
  defaultQuery() {
    if (this.sort == "time") {
      return this.getPath().orderBy("time", "DESC");
    }
    if (this.sort == "points") {
      return this.getPath()
        .orderBy("points", "DESC")
        .orderBy("time", "DESC");
    }
  }
  getPath() {
    return firebase
      .firestore()
      .doc(this.path)
      .collection(this.collection);
  }
}
