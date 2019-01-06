import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { sanitizeUser } from "that/lib";
import { withNavigation } from "react-navigation";
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

export default class UserLoader extends PureComponent {
  render() {
    return (
      <ItemLoader
        loading={this.props.loading || false}
        sanitize={i => {
          return sanitizeUser(i);
        }}
        path={"users/" + this.props.userId}
        realtime={this.props.realtime}
      >
        {d => {
          return this.props.children(d);
        }}
      </ItemLoader>
    );
  }
}
