import React, { Component } from "react";
import SortBar from "that/components/SortBar";
import colors from "that/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import Post from "that/components/Post";
import { View, Text } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <SwipeListView
        useFlatList
        data={this.props.posts}
        keyExtractor={item => {
          return item.id;
        }}
        ListHeaderComponent={<SortBar />}
        closeOnRowBeginSwipe={true}
        style={{ zIndex: 1 }}
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
