import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "react-native-firebase";
export default class TestList extends Component {
  componentDidMount = () => {
    let f = new FirestoreCollection({
      path: "groups/mems",
      collection: "posts",
      live: true,
      preserveOrder: true
    });
  };

  render() {
    return (
      <View>
        <Text> TestList </Text>
      </View>
    );
  }
}

class FirestoreCollection {
  constructor({
    path,
    collection,
    pageSize = 10,
    live = false,
    preserveOrder = false,
    sort = ["time", "DESC"],
    secondarySort = null,
    where = null
  }) {
    this.path = path;
    this.sort = sort;
    this.secondarySort = secondarySort;
    this.collection = collection;
    this.pageSize = pageSize;
    this.live = live;
    this.preserveOrder = preserveOrder;
    this.pages = [];
    this.page = 0;
    this.pages.push(
      new FirebasePage({ pageSize, sort, path, collection, secondarySort })
    );
  }
}
class FirebasePage {
  constructor({ pageSize, sort, path, collection,secondarySort }) {
    this.pageSize = pageSize;
    this.sort = sort;
    this.secondarySort = secondarySort;
    this.path = path;
    this.collection = collection;
    this.query=this.getQuery();
    this.isLoaded=false;
    console.log(this.query);

  }
  getQuery(){
    let query = firebase.firestore().doc(this.path).collection(this.collection)
    if (this.sort){
      query = query.orderBy(this.sort[0], this.sort[1]);
    }
    query = query.limit(this.pageSize)
    return query;
  }
}
class QueryMaker {
  constructor({
    pageSize,
    path,
    collection,
    sort,
    secondarySort = null,
    where = null,
    paginate = a => {
      return a;
    }
  }) {
    this.pageSize = pageSize;
    this.path = path;
    this.collection = collection;
    this.sort = sort;
    this.secondarySort = secondarySort;
    this.where = where;
    this.paginate = paginate;
  }
}

class FirestoreItem {
  constructor({ data, initialSortValue, page }) {
    this.data = data;
    this.initialSortValue = initialSortValue;
    this.page = page;
  }
}
