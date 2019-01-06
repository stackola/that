import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import CollectionLoader from "that/components/CollectionLoader";
import CommentLoader from "that/components/CommentLoader";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";

export default class ChildComments extends PureComponent {
  render() {
    return (
      this.props.level < 3 && (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 35,
              alignItems: "center"
            }}
            onPress={() => {
              this.setState({
                collapsed: true,
                replying: false,
                input: ""
              });
            }}
          >
            <View
              style={{
                flex: 1,
                width: 4,
                backgroundColor: colors.seperator
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <CollectionLoader
              path={this.props.path}
              realtime={true}
              collection={"comments"}
            >
              {a => {
                console.log(a);
                return (
                  <View>
                    {a.map(c => {
                      return (
                        <CommentLoader
                          {...this.props}
                          key={c.id}
                          realtime={true}
                          path={c._ref.path}
                          level={this.props.level + 1}
                        />
                      );
                    })}
                  </View>
                );
              }}
            </CollectionLoader>
          </View>
        </View>
      )
    );
  }
}
