import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

import { withNavigation } from "react-navigation";

class Link extends Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        disabled={this.props.disabled}
        onPress={() => {
          console.log("LINK", this.props);
          this.props.navigation.navigate({
            routeName: this.props.to,
            params: this.props.params,
            key: this.props.viewKey
          });
        }}
      >
        <Text style={{ fontWeight: "bold", ...this.props.textStyle }}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Link);
