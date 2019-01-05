import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import colors from "that/colors";
import TopBar from "that/components/TopBar";
import SortBar from "that/components/SortBar";
import CommentLoader from "that/components/CommentLoader";
import Icon from "react-native-vector-icons/Entypo";

import { TouchableOpacity, View, ScrollView, Text } from "react-native";

class Comment extends Component {
  static navigationOptions = {
    header: null
  };
  parentIsPost(path) {
    return path.split("/").length == 6;
  }
  getParentPath(path) {
    let l = path.split("/").length;
    return path
      .split("/")
      .filter((a, i) => {
        return i < l - 2;
      })
      .join("/");
  }
  viewParentPost() {
    let commentPath = this.props.navigation.getParam("commentPath", null);
    if (commentPath) {
      console.log("parent is post");
      let tp = this.getParentPath(commentPath).split("/");
      console.log(tp);
      this.props.navigation.navigate({
        routeName: "Details",
        params: {
          postId: tp[3],
          group: tp[1]
        },
        key: tp[3]
      });
    }
  }
  viewParent() {
    let commentPath = this.props.navigation.getParam("commentPath", null);
    if (commentPath) {
      if (this.parentIsPost(commentPath)) {
        console.log("parent is post");
        let tp = this.getParentPath(commentPath).split("/");
        console.log(tp);
        this.props.navigation.navigate({
          routeName: "Details",
          params: {
            postId: tp[3],
            group: tp[1]
          },
          key: tp[3]
        });
      } else {
        this.props.navigation.navigate({
          routeName: "SingleComment",
          params: {
            commentPath: this.getParentPath(commentPath)
          },
          key: this.getParentPath(commentPath)
        });
      }
    }
  }
  render() {
    let commentPath = this.props.navigation.getParam("commentPath", null);
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TopBar
          title={""}
          back={() => {
            this.props.navigation.goBack();
          }}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              this.viewParentPost();
            }}
            style={{
              height: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: colors.text }}>
              <Icon name="arrow-up" color={colors.text} /> View parent post{" "}
              <Icon name="arrow-up" color={colors.text} />
            </Text>
          </TouchableOpacity>
          {!this.parentIsPost(commentPath) && (
            <TouchableOpacity
              onPress={() => {
                this.viewParent();
              }}
              style={{
                height: 30,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: colors.text }}>
                <Icon name="arrow-up" color={colors.text} /> View parent comment{" "}
                <Icon name="arrow-up" color={colors.text} />
              </Text>
            </TouchableOpacity>
          )}
          <SortBar noTime={true} />
          <CommentLoader
            canVote={this.props.user && this.props.user.id}
            navigate={(a, b, c) => {
              this.props.navigation.navigate({
                routeName: a,
                params: b,
                key: c
              });
            }}
            key={commentPath}
            path={{ path: commentPath }}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
