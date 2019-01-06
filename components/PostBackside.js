import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

function IconButton(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.background || colors.upvote
      }}
    >
      <TouchableOpacity
        style={{
          width: 100,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon name={props.name} size={30} color={props.color || colors.text} />
      </TouchableOpacity>
    </View>
  );
}
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
