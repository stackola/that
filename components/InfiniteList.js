import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import PostLoader from "that/components/PostLoader";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Text
} from "react-native";
import CollectionLoader from "that/components/CollectionLoader";

export default class InfiniteList extends PureComponent {
  constructor(p) {
    super(p);
    this.state = { refreshKey: 0 };
  }
  onRefresh() {
    console.log(this.state);
    this.setState({ refreshKey: this.state.refreshKey + 1 });
  }
  render() {
    return (
      <View style={{ flex: 1 }} key={"infList" + this.state.refreshKey}>
        <CollectionLoader
          path={this.props.path}
          realtime={false}
          collection={this.props.collection}
        >
          {(posts, loadMore, hasMore) => {
            return (
              <FlatList
                data={posts}
                style={{ flex: 1 }}
                onEndReached={() => {
                  hasMore && loadMore();
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      this.onRefresh();
                    }}
                  />
                }
                refreshing={false}
                keyExtractor={i => {
                  return i.id;
                }}
                ListHeaderComponent={
                  this.props.header ? this.props.header : null
                }
                ListFooterComponent={
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 80
                    }}
                  >
                    {hasMore ? (
                      <Text style={{ color: colors.text }}>Loading more!</Text>
                    ) : (
                      <Text style={{ color: colors.text }}>The end</Text>
                    )}
                  </View>
                }
                renderItem={i => {
                  return this.props.renderItem(i);
                }}
              />
            );
          }}
        </CollectionLoader>
      </View>
    );
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
