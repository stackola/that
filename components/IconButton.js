import React, { Component } from "react";
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

export default function IconButton(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.background || colors.upvote
      }}
    >
      <TouchableOpacity
        style={{
          width: props.horizontal ? "auto" : 100,
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
