import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import colors from "that/colors";
import { uploadImage } from "that/lib";
import Icon from "react-native-vector-icons/Feather";

import ExpandingTextInput from "that/components/ExpandingTextInput";

import { comment } from "that/lib";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  Text
} from "react-native";

const pickerOptions = {
  mediaType: "photo",
  quality: 0.4
};

export default class Header extends Component {
  constructor(p) {
    super(p);
    this.state = {
      comment: "",
      imageLoading: false,
      image: null,
      commentLoading: false
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
      <View
        style={{ flexDirection: "row", backgroundColor: colors.background }}
      >
        <ExpandingTextInput
          multiline={true}
          min={this.state.comment ? 100 : 60}
          max={200}
          value={this.state.comment}
          onChangeText={text => {
            this.setState({ comment: text });
          }}
          placeholder={"Reply"}
          placeholderTextColor={colors.placeholder}
          style={{
            color: colors.text,
            backgroundColor: null,
            borderColor: colors.seperator,
            borderBottomWidth: 2,
            margin: 4,
            marginBottom: 0,
            textAlignVertical: "top",
            flex: 1
          }}
        />

        <View style={{ width: 60 }}>
          {!this.state.imageLoading && !this.state.image ? (
            <TouchableOpacity
              style={{
                backgroundColor: colors.hidden,
                height: 40,
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.pickPicture();
              }}
            >
              <Text style={{ color: colors.text }}>
                <Icon name="camera" size={20} />
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
              <ActivityIndicator />
            </View>
          ) : null}
          {this.state.image ? (
            <TouchableOpacity
              onPress={() => {
                this.pickPicture(true);
              }}
              style={{
                overflow: "hidden",
                alignItems: "center",
                flex: 1
              }}
            >
              <Image
                source={{
                  uri: this.state.image.url
                }}
                style={{ width: 60, flex: 1 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ width: 60 }}>
          <TouchableOpacity
            style={{
              backgroundColor:
                this.state.comment || this.state.image ? colors.upvote : "#999",
              height: 40,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              (this.state.comment || this.state.image) &&
                comment(
                  {
                    text: this.state.comment,
                    path: this.props.path,
                    image: this.state.image
                  },
                  () => {
                    //comment success!
                    this.setState({ image: null, comment: "" });
                  }
                );
            }}
          >
            <Text style={{ color: colors.text }}>
              <Icon name="send" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
