import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { SwipeRow } from "react-native-swipe-list-view";
import ItemLoader from "that/components/ItemLoader";
import VoteButtons from "that/components/VoteButtons";
import { withNavigation } from "react-navigation";
import CommentBackside from "that/components/CommentBackside";
import CommentContent from "that/components/CommentContent";
import ChildComments from "that/components/ChildComments";
import NewComment from "that/components/NewComment";

import Icon from "react-native-vector-icons/Entypo";

import { vote, genderColor, getUID, getAge, notLoggedInAlert } from "that/lib";
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

class Comment extends Component {
  constructor(p) {
    super(p);
    this.state = {
      replying: false,
      collapsed: false
    };
  }
  onVote(dir) {
    this.canVote()
      ? vote({
          path: this.props.path,
          id: this.props.comment.id,
          vote: dir == "up" ? "up" : "down"
        })
      : this.notLoggedIn();
  }
  notLoggedIn() {
    notLoggedInAlert(r => {
      this.props.navigation.navigate(r);
    });
  }
  canVote() {
    return this.props.user && this.props.user.id;
  }
  rowPress(){
    console.log("row pressed", this.props)
    if (this.props.linkToSelf){
      this.props.navigation.navigate({
        routeName: "SingleComment",
        params: { commentPath: this.props.path },
        key: this.props.path
      });
    }else{
      if (this.canVote()){
        this.setState({replying:true})
      }
    }
  }
  slideWrapper = props => {
    return (
      <View style={{ flex: 1 }}>
        <SwipeRow
          recalculateHiddenLayout={true}
          leftOpenValue={200}
          onRowPress={()=>{
            this.rowPress();
          }}
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
  isOwnComment() {
    let data = this.props.comment;
    return data.user && getUID() == data.user.id;
  }
  isOp() {
    return (
      this.props.op &&
      this.props.comment.user &&
      this.props.comment.user.id &&
      this.props.op == this.props.comment.user.id
    );
  }
  render() {
    let SlideWrapper = this.slideWrapper;
    let data = this.props.comment;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 2,
            backgroundColor: colors.backgroundOffset
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
          <SlideWrapper
            backside={
              <CommentBackside
                onReply={() => {
                  if (this.canVote()) {
                    this.setState({
                      replying: true
                    });
                    this.ref.closeRow();
                  } else {
                    this.notLoggedIn();
                    this.ref.closeRow();
                  }
                }}
              />
            }
          >              
            <CommentContent
              {...this.props}
              isOp={this.isOp()}
              comment={data}
              navigate={(a, b, c) => {
                this.props.navigation.navigate({
                  routeName: a,
                  params: b,
                  key: c
                });
              }}
              isOwnComment={this.isOwnComment()}
              userId={this.props.user.id}
            />
          
          </SlideWrapper>
        </View>
        {this.state.replying && (
          <NewComment
            path={this.props.path}
            rules={{}}
            onCancel={() => {
              this.setState({ replying: false });
            }}
          />
        )}
        {this.state.collapsed && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              borderColor: colors.seperator,
              borderBottomWidth: 1,
              marginLeft: 35,
              paddingBottom: 0,
              justifyContent: "center"
            }}
            onPress={() => {
              this.setState({ collapsed: false });
            }}
          >
            <Icon
              size={20}
              name="dots-three-horizontal"
              color={colors.textMinor}
            />
          </TouchableOpacity>
        )}
        {this.props.loadChildren!==false && data.comments > 0 && !this.state.collapsed && (
          <ChildComments
            {...{ ...this.props, level: this.props.level + 1 }}
            onCollapse={() => {
              this.setState({ collapsed: true });
            }}
          />
        )}
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

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment)
);
