import React, { PureComponent } from "react";
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
  Text,
  TouchableOpacity
} from "react-native";

export default class Header extends PureComponent {
  onChange(v) {
    if (v != this.props.value) {
      this.props.onChange(v);
    }
  }
  render() {
    let tabs = this.props.tabs || [];
    let value = this.props.value;
    return (
      <View style={{ flexDirection: "row", height: 40 }}>
        {tabs.map(t => {
          return (
            <TouchableOpacity
              key={t.value}
              onPress={() => {
                this.onChange(t.value);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRightWidth: 1,
                borderColor: colors.seperator,
                backgroundColor:
                  t.value == value ? colors.background : colors.background
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: t.value == value ? "500" : "400",
                  textDecorationLine: t.value == value ? "underline" : null
                }}
              >
                {t.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
