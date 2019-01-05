import React, { Component } from "react";
import TopBar from "that/components/TopBar";

import colors from "that/colors";
import { View } from "react-native";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [] };
  }
  componentDidMount() {
    //subscribe to a sub.
  }
  componentWillUnmount() {}
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <TopBar
          title={"Home"}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />
      </View>
    );
  }
}
