import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class PostImage extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 200
        }}
      >
        <Image
          source={{
            uri: this.props.image.url
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "black",
            bottom: 8,
            right: 0
          }}
          resizeMode="contain"
        />
      </View>
    );
  }
}
