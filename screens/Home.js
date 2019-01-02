import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Header from "that/components/Header";

import FloatButton from "that/components/FloatButton";
import CreationForm from "that/components/CreationForm";
import PostList from "that/components/PostList";
import TopBar from "that/components/TopBar";

import colors from "that/colors";
import { withRouter } from "react-navigation";

import firebase from "react-native-firebase";
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
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [] };
  }
  componentDidMount() {
    //subscribe to a sub.
  }
  componentWillUnmount() {}
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <TopBar
          title={"Home"}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />
      </View>
    );
  }
}
