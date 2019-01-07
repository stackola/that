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
  Text
} from "react-native";
import CollectionLoader from "that/components/CollectionLoader";

export default class InfinitePosts extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CollectionLoader
          path={this.props.path}
          realtime={false}
          collection={this.props.collection}
        >
          {(posts, loadMore, hasMore) => {
            console.log(posts);
            return (
              <FlatList
                data={posts}
                onEndReached={() => {
                  loadMore();
                }}
                keyExtractor={i => {
                  return i.id;
                }}
                ListFooterComponent={
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 80
                    }}
                  >
                    {this.props.hasMore ? (
                      <Text style={{ color: colors.text }}>Loading more!</Text>
                    ) : (
                      <Text style={{ color: colors.text }}>The end</Text>
                    )}
                  </View>
                }
                renderItem={i => {
                  return (
                    <PostLoader
                      linkToSelf={true}
                      path={i.item._ref.path}
                      marginBottom={4}
                      realtime={true}
                    />
                  );
                }}
              />
            );
          }}
        </CollectionLoader>
      </View>
    );
  }
}
