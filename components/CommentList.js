import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import CommentLoader from "that/components/CommentLoader";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";

export default class CommentList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.comments &&
          this.props.comments.map(c => {
            return (
              <CommentLoader
                key={c.id}
                linkToSelf={this.props.linkToSelf}
                path={c._ref.path}
                realtime={this.props.realtime}
                level={0}
              />
            );
          })}
      </View>
    );
  }
}
