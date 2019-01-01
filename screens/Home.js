import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Header from "that/components/Header";
import Post from "that/components/Post";
import FloatButton from "that/components/FloatButton";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={{ backgroundColor: "#001955", flex: 1 }}>
        <Header />
        <SwipeListView
          useFlatList
          disableLeftSwipe={true}
          data={[{key:1,data:{}}, {key:2,data:{}}, {key:3,data:{}}]}
          closeOnRowBeginSwipe={true}
          swipeToOpenPercent={20}
          swipeToClosePercent={20}
          renderItem={(data, rowMap) => <Post />}
          renderHiddenItem={(data, rowMap) => (
            <View>
              <Text>Left</Text>
              <Text>Right</Text>
            </View>
          )}
          leftOpenValue={155}
          rightOpenValue={0}
        />
        <FloatButton/>
      </View>
    );
  }
}
