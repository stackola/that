import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import PostCredit from "that/components/PostCredit";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

import { distanceInWordsToNow } from "date-fns";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class CommentContent extends PureComponent {
  getBorderColor() {
    if (this.props.isOp) {
      return this.props.isOwnComment ? colors.hidden : colors.background;
    } else {
      return this.props.isOwnComment ? colors.hidden : colors.background;
    }
  }
  render() {
    return (
      <View
        style={{
          minHeight: 80,
          paddingLeft: 4,
          paddingRight: 8,
          backgroundColor: colors.backgroundOffset,
          borderRightWidth: 4,
          borderColor: this.getBorderColor()
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text }}>{this.props.comment.text}</Text>
          {this.props.comment.image && this.props.comment.image.url ? (
            <TouchableOpacity
              style={{ width: 100, height: 100 }}
              onPress={() => {
                this.props.navigate(
                  "ImageView",
                  {
                    image: this.props.comment.image
                  },
                  this.props.comment.image.url
                );
              }}
            >
              <Image
                source={{
                  uri: this.props.comment.image.url
                }}
                style={{
                  width: 100,
                  height: 100
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: colors.textMinor, fontSize: 11, flex: 1 }}>
            {distanceInWordsToNow(this.props.comment.time, {
              includeSeconds: true
            })}
          </Text>
          
        </View>
      </View>
    );
  }
}
