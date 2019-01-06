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
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class PostBackside extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingRight: 100,
          backgroundColor: colors.background
        }}
      >
        <IconButton name="share-variant" background={colors.hidden} />
        <IconButton name="flag-variant" background={colors.downvote} />
        <IconButton name="trash-can" background={"#888"} />
      </View>
    );
  }
}
