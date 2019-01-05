import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";
import { subscribe, unsub } from "that/lib";
import {
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

const Rule = props => {
  return (
    <View style={{ marginRight: 12 }}>
      <Text style={{ color: colors.text }}>
        <Icon
          color={props.allowed ? colors.upvote : colors.downvote}
          name={props.allowed ? "check" : "close"}
        />
        {props.title}
      </Text>
    </View>
  );
};

export default class GroupInfo extends Component {
  isSubbed() {
    let groupId = this.props.group && this.props.group.slug;
    let subs =
      this.props.subs.map(i => {
        return i.id;
      }) || [];
    console.log(groupId, subs);
    return subs.includes(groupId);
  }
  render() {
    let group = this.props.group || {};
    let groupColor = group.color ? group.color : colors.upvote;
    return (
      <View style={{ flexDirection: "row", height: 60 }}>
        {/*<View
          style={{ width: 60, alignItems: "center", justifyContent: "center" }}
        >
          <Icon name="account" size={30} color={colors.text} />
          <Text style={{ color: colors.text }}>150</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <Rule allowed={group.allowText} title={"Text Posts"} />
          <Rule allowed={group.allowPhotos} title={"Photos"} />
          <Rule allowed={group.allowUploaded} title={"Uploads"} />
          <Rule allowed={group.allowTextComments} title={"Text comments"} />
          <Rule allowed={group.allowAnon} title={"Anonymous posting"} />
        </View>*/}
        <View style={{ flex: 1 }} />
        <View
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="information-variant" color={colors.text} size={30} />
          <Text style={{ color: colors.text, fontSize: 12 }}>info</Text>
        </View>
        {!this.isSubbed() ? (
          <TouchableOpacity
            onPress={() => {
              subscribe(group.slug);
            }}
            style={{
              width: 69,
              height: 60,
              backgroundColor: colors.upvote,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="plus" color={colors.text} size={30} />
            <Text style={{ color: colors.text, fontSize: 10 }}>follow</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
            onPress={() => {
              unsub(group.slug);
            }}
            style={{
              width: 69,
              height: 60,
              backgroundColor: colors.downvote,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="close" color={colors.text} size={30} />
            <Text style={{ color: colors.text, fontSize: 12 }}>unfollow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
