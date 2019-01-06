import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import IconButton from "that/components/IconButton";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class CommentBackside extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ width: 200, flexDirection: "row" }}>
          <IconButton
            name={"share-variant"}
            background={colors.hidden}
            horizontal={true}
          />

          <IconButton
            name={"flag-variant"}
            background={colors.downvote}
            horizontal={true}
          />
          <IconButton name="trash-can" background={"#888"} horizontal={true} />

          <IconButton
            name={"reply"}
            background={colors.upvote}
            horizontal={true}
          />
        </View>
      </View>
    );
  }
}
