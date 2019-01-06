import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import ItemLoader from "that/components/ItemLoader";
import Comment from "that/components/Comment";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class CommentLoader extends Component {
  render() {
    return (
      <ItemLoader path={this.props.path} realtime={this.props.realtime}>
        {comment => {
          return <Comment {...this.props} comment={comment} />;
        }}
      </ItemLoader>
    );
  }
}
