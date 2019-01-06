import React, { Component } from "react";

import { vote, genderColor } from "that/lib";
import { SwipeRow } from "react-native-swipe-list-view";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import Link from "that/components/Link";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import { uploadImage } from "that/lib";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { getUID } from "that/lib";
import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert
} from "react-native";

import { comment } from "that/lib";
import firebase from "react-native-firebase";

const pickerOptions = {
  mediaType: "photo",
  quality: 0.4
};

export default class Commentold extends Component {
  constructor(p) {
    super(p);
    this.state = {
      input: "",
      replying: false,
      user: {},
      comments: [],
      collapsed: false,
      imageLoading: false,
      image: null
    };
  }

  

  
 
  pickPicture(showRemove) {
    this.setState({ imageLoading: true }, () => {
      ImagePicker.showImagePicker(
        {
          ...pickerOptions,
          customButtons: showRemove
            ? [
                ...(pickerOptions.customButtons || []),
                { name: "remove", title: "Remove image" }
              ]
            : [...(pickerOptions.customButtons || [])]
        },
        response => {
          console.log(response);
          if (response && response.path) {
            uploadImage(response.path, response.width, response.height, d => {
              console.log("got response", d);
              this.setState({
                image: d,
                imageLoading: false
              });
            });
          } else {
            this.setState({
              imageLoading: false,
              image: null
            });
          }
        }
      );
    });
  }

  render() {
    return (  
        {this.state.replying && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 35 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    replying: false,
                    image: null
                  });
                }}
                style={{
                  backgroundColor: colors.downvote,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: colors.text }}>
                  <Icon name="cross" size={15} />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <ExpandingTextInput
                multiline={true}
                placeholder={"Text"}
                min={120}
                max={600}
                numberOfLines={4}
                ref={ref => {
                  //ref && ref.focus();
                }}
                onChangeText={input => {
                  this.setState({ input });
                }}
                value={this.state.input}
                placeholderTextColor={colors.placeholder}
                style={{
                  color: colors.text,
                  backgroundColor: null,
                  borderColor: colors.seperator,
                  borderBottomWidth: 2,
                  margin: 4,
                  textAlignVertical: "top",
                  marginBottom: 0
                }}
              />
            </View>
            <View style={{ width: 60 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.hidden
                }}
              >
                {!this.state.imageLoading && !this.state.image ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.pickPicture();
                    }}
                    style={{
                      backgroundColor: colors.hidden,

                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: colors.text }}>
                      <Feather name="camera" size={15} />
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {this.state.imageLoading && !this.state.image ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <ActivityIndicator size={10} style={{ height: 15 }} />
                  </View>
                ) : null}

                {this.state.image ? (
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.pickPicture(true);
                      }}
                      style={{ flex: 1 }}
                    >
                      <View
                        style={{
                          minHeight: 15,
                          flex: 1
                        }}
                      >
                        <Image
                          source={{
                            uri: this.state.image.url
                          }}
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(this.props.data.path);
                    if (this.state.input || this.state.image) {
                      comment(
                        {
                          text: this.state.input,
                          path: this.props.data.path,
                          image: this.state.image
                        },
                        () => {
                          this.setState({
                            replying: false,
                            input: ""
                          });
                        }
                      );
                    }
                  }}
                  style={{
                    backgroundColor:
                      this.state.input || this.state.image
                        ? colors.upvote
                        : "#999",

                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      height: 15
                    }}
                  >
                    <Feather name="send" size={15} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
        {!this.state.collapsed && this.props.level < 3 && (
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
              {this.state.comments &&
                this.props.loadChildren !== false &&
                this.state.comments.map(c => {
                  return (
                    <Comment
                      key={c.id}
                      level={this.props.level + 1}
                      data={c}
                      op={this.props.op}
                      canVote={this.props.canVote}
                      navigate={(a, b, c) => {
                        this.props.navigate(a, b, c);
                      }}
                    />
                  );
                })}
            </View>
          </View>
        )}
        {!this.state.collapsed &&
          this.props.level == 3 &&
          this.state.comments &&
          this.state.comments.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigate(
                  "SingleComment",
                  { commentPath: this.props.data.path },
                  this.props.data.path
                );
              }}
              style={{
                backgroundColor: colors.seperator,
                height: 40,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: colors.text }}>Read more</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
