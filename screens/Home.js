import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Header from "that/components/Header";
import Post from "that/components/Post";
import FloatButton from "that/components/FloatButton";
import { SwipeListView } from "react-native-swipe-list-view";
import colors from "that/colors";
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
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <Header />
        <SwipeListView
          useFlatList
          data={[{key:"1",data:{}}, {key:"2",data:{}}, {key:"3",data:{}},{key:"4",data:{}}]}
          closeOnRowBeginSwipe={true}
          swipeToOpenPercent={20}
          swipeToClosePercent={20}
          renderItem={(data, rowMap) => <Post margin={true} />}
          renderHiddenItem={(data, rowMap) => (
            <View style={{backgroundColor:colors.hidden, flex:1, marginBottom:4}}>
              <Text>Left</Text>
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
