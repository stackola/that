import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import PostLoader from "that/components/PostLoader";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.posts}
          style={{}}
          keyExtractor={i => {
            return i.id;
          }}
          renderItem={i => {
            return (
              <PostLoader
                linkToSelf={true}
                path={i.item._ref.path}
                realtime={this.props.realtime}
              />
            );
          }}
        />
      </View>
    );
  }
}
