import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { withNavigation } from "react-navigation";
import Post from "that/components/Post";
import Loading from "that/components/Loading";
import firebase from "react-native-firebase";
import ItemLoader from "that/components/ItemLoader";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class PostLoader extends Component {
  render() {
    return (
      <ItemLoader path={this.props.path} realtime={this.props.realtime}>
        {post => {
          return <Post marginBottom={this.props.marginBottom} linkToSelf={this.props.linkToSelf} data={post || {}} />;
        }}
      </ItemLoader>
    );
  }
}
