import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import CollectionLoader from "that/components/CollectionLoader";
import ReadMoreButton from "that/components/ReadMoreButton";
import Comment from "that/components/Comment";

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
    return this.props.level < 5 ? (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            width: 35,
            alignItems: "center"
          }}
          onPress={() => {
            this.props.onCollapse();
            this.setState({
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
            sort={this.props.sort ? this.props.sort : "new"}
            collection={"comments"}
            loadingComponent={
              <View
                style={{
                  height: 45,
                  backgroundColor: colors.backgroundColor,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator />
              </View>
            }
          >
            {a => {
              return (
                <View>
                  {a.map(c => {
                    return (
                      <Comment
                        {...this.props}
                        key={c.id}
                        realtime={false}
                        comment={c._data}
                        path={c._ref.path}
                        linkToSelf={false}
                        level={this.props.level + 1}
                        loadingComponent={
                          <View
                            style={{
                              height: 45,
                              backgroundColor: colors.backgroundColor,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <ActivityIndicator />
                          </View>
                        }
                      />
                    );
                  })}
                </View>
              );
            }}
          </CollectionLoader>
        </View>
      </View>
    ) : (
      <ReadMoreButton sort={this.props.sort} path={this.props.path} />
    );
  }
}
