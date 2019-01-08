import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { uploadImage } from "that/lib";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextComponent,
  Text
} from "react-native";
import { comment } from "that/lib";
import ImagePicker from "react-native-image-picker";

const pickerOptions = {
  mediaType: "photo",
  quality: 0.8
};

export default class NewComment extends Component {
  constructor(p) {
    super(p);
    this.state = {
      input: "",
      image: null,
      imageLoading: false
    };
  }
  pickPicture(showRemove, allowUpload, allowPhotos) {
    this.setState({ imageLoading: true }, () => {
      ImagePicker.showImagePicker(
        {
          ...pickerOptions,
          chooseFromLibraryButtonTitle: allowUpload
            ? "Choose from library"
            : null,
          takePhotoButtonTitle: allowPhotos ? "Take a picture" : null,
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
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 35 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.onCancel && this.props.onCancel();
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
        {this.props.group.allowTextComments && (
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
        )}
        <View
          style={{
            width: this.props.group.allowTextComments ? 60 : "auto",
            flex: this.props.group.allowTextComments ? 0 : 1,
            height: this.props.group.allowTextComments ? "auto" : 60,
            flexDirection: this.props.group.allowTextComments ? "column" : "row"
          }}
        >
          {this.props.group.allowPhotosComments ||
            (this.props.group.allowUploadedComments && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.hidden
                }}
              >
                {!this.state.imageLoading && !this.state.image ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.pickPicture(
                        false,
                        this.props.group.allowUploadedComments,
                        this.props.group.allowPhotosComments
                      );
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
                        this.pickPicture(
                          true,
                          this.props.group.allowUploadedComments,
                          this.props.group.allowPhotosComments
                        );
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
            ))}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                console.log(this.props.path);
                if (this.state.input || this.state.image) {
                  comment(
                    {
                      text: this.state.input,
                      path: this.props.path,
                      image: this.state.image
                    },
                    () => {
                      this.props.onSend();
                    }
                  );
                }
              }}
              style={{
                backgroundColor:
                  this.state.input || this.state.image ? colors.upvote : "#999",

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
    );
  }
}
