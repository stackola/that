import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import PostContent from "that/components/PostContent";
import PostCredit from "that/components/PostCredit";
import PostBackside from "that/components/PostBackside";
import { withNavigation } from "react-navigation";
import { vote, genderColor, getUID, getAge, notLoggedInAlert } from "that/lib";
import { distanceInWordsToNow } from "date-fns";
import { SwipeRow } from "react-native-swipe-list-view";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";

class Post extends Component {
  onVote(dir) {
    this.canVote() &&
      vote({
        path:
          "/groups/" + this.props.data.group + "/posts/" + this.props.data.id,
        id: this.props.data.id,
        vote: dir == "up" ? "up" : "down"
      });

    !this.canVote() &&
      notLoggedInAlert(r => {
        this.props.navigation.navigate(r);
      });
  }
  canVote() {
    return this.props.user && this.props.user.id;
  }
  isOwnPost() {
    return this.state.user && getUID() == this.state.user.id;
  }
  touchWrapper = props => {
    return (
      <TouchableOpacity
        style={props.style}
        onPress={() => {
          this.onPress();
        }}
      >
        {props.children}
      </TouchableOpacity>
    );
  };
  slideWrapper = props => {
    return (
      <View style={{ flex: 1 }}>
        <SwipeRow
          recalculateHiddenLayout={true}
          leftOpenValue={100}
          stopLeftSwipe={200}
          disableLeftSwipe={true}
          swipeToOpenPercent={10}
          swipeToClosePercent={10}
          preview={true}
          ref={ref => {
            this.ref = ref;
          }}
        >
          {props.backside}
          {props.children}
        </SwipeRow>
      </View>
    );
  };
  onPress() {
    let id = this.props.data.id;
    let group = this.props.data.group;
    this.props.navigation.navigate({
      routeName: "Details",
      params: { postId: id, group: group },
      key: id
    });
  }
  normalWrapper(props) {
    return <View style={props.style}>{props.children}</View>;
  }
  render() {
    let data = this.props.data || {};
    let Wrapper = this.props.linkToSelf
      ? this.touchWrapper
      : this.normalWrapper;

    let SlideWrapper = this.slideWrapper;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.postBackground,
          marginBottom:this.props.marginBottom || 0,
        }}
      >
        <View style={{ paddingLeft: 4, paddingRight: 4 }}>
          <VoteButtons
            points={data.upvotes - data.downvotes}
            upvoters={data.upvoters}
            downvoters={data.downvoters}
            onUpvote={() => {
              this.onVote("up");
            }}
            onDownvote={() => {
              this.onVote("down");
            }}
          />
        </View>
        <SlideWrapper backside={<PostBackside />}>
          <View
            style={{
              paddingRight: 8,
              backgroundColor: colors.postBackground,
              paddingLeft: 8
            }}
          >
            <Wrapper style={{}}>
              <PostContent data={data} />
            </Wrapper>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <PostInfo comments={data.comments} time={data.time} />
              </View>
              <View style={{ flex: 1 }} />
              {data.user && data.user.id && (
                <PostCredit group={data.group} userId={data.user.id} />
              )}
            </View>
          </View>
        </SlideWrapper>
      </View>
    );
  }
}

function PostInfo(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: colors.textMinor, fontSize: 11 }}>
        <Icon size={9} name={"message"} color={colors.textMinor} />{" "}
        {props.comments}
      </Text>
      <View style={{ width: 10 }} />
      <Text style={{ color: colors.textMinor, fontSize: 11 }}>
        {distanceInWordsToNow(props.time, { includeSeconds: true })}
      </Text>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
