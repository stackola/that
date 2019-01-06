import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import PostImage from "./PostImage";

export default class PostContent extends Component {
  render() {
    return (
      <View style={{ minHeight: 120, marginTop: 8 }}>
        {this.props.data.title ? (
          <View style={{ paddingBottom: 8 }}>
            <Text
              style={{
                fontSize: 15,
                color: colors.text,
                fontWeight: "500",
                paddingRight: 12
              }}
            >
              {this.props.data.title}!
            </Text>
          </View>
        ) : null}

        {this.props.data.image && this.props.data.image.url && (
          <PostImage image={this.props.data.image} />
        )}

        {this.props.data.text ? (
          <Text style={{ color: colors.text, paddingBottom: 8 }}>
            {this.props.data.text}
          </Text>
        ) : null}
      </View>
    );
  }
}
