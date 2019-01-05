import React, { Component } from "react";
import SortBar from "that/components/SortBar";
import colors from "that/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import Post from "that/components/Post";
import GroupInfo from "that/components/GroupInfo";
import { View, Text, RefreshControl, FlatList } from "react-native";


export default class Header extends Component {
  render() {
    return (
      <SwipeListView
        useFlatList
        data={this.props.posts}
        keyExtractor={item => {
          return item.id;
        }}
          refreshControl={this.props.onRefresh &&<RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={()=>{this.props.onRefresh()}}
          />}
        ListHeaderComponent={this.props.group ?<GroupInfo group={this.props.group} subs={this.props.subs}/>:<View/>}
        closeOnRowBeginSwipe={true}
        style={{  }}
        swipeToOpenPercent={20}
        swipeToClosePercent={20}
        renderItem={(data, rowMap) => {
          return (
            <Post
              data={data.item}
              isButton={true}
              condensed={true}
              id={data.item.id}
              onPress={() => {
                this.props.navigate(
                  "Details",
                  {
                    postId: data.item.id,
                    group: data.item.group
                  },
                  data.item.id
                );
              }}
              margin={true}
            />
          );
        }}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              backgroundColor: colors.hidden,
              flex: 1,
              marginBottom: 4
            }}
          >
            <Text>Left</Text>
          </View>
        )}
        leftOpenValue={155}
        rightOpenValue={0}
      />
    );
  }
}
