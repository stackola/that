import React, { Component } from "react";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import colors from "that/colors";
import { createPost, uploadImage } from "that/lib";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import Buttons from "./Buttons";

const options = {
  mediaType: "photo",
  quality: 0.8
};

export default class CreationForm extends Component {
  constructor(p) {
    super(p);
    this.state = {
      inputs: { title: "", text: "", group: "" },
      image: null,
      imageLoading: false
    };
  }
  setInput(key, value) {
    this.setState({ inputs: { ...this.state.inputs, [key]: value } });
  }
  componentDidMount() {
    this.setState({
      inputs: { ...this.state.inputs, group: this.props.group }
    });
  }

  render() {
    return (
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "96%",
            height: "98%",
            marginLeft: "2%",
            zIndex: 5,
            marginRight: "2%",
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            bottom: 0,
            backgroundColor: colors.overlayBackground,
            paddingTop: 4
          }}
        >
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            <View style={{ paddingLeft: 12, paddingRight: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  marginTop: 4,
                  fontSize: 20,
                  borderBottomWidth: 2,
                  borderColor: colors.seperator,
                  paddingBottom: 8,
                  textAlign: "center"
                }}
              >
                Post to {this.props.groupName}
              </Text>
              {this.props.rules.allowText && (
                <View>
                  <TextInput
                    multiline={false}
                    placeholder={"Title"}
                    placeholderTextColor={colors.placeholder}
                    value={this.state.inputs.title}
                    onChangeText={text => this.setInput("title", text)}
                    style={{
                      color: colors.text,
                      backgroundColor: null,
                      borderColor: colors.seperator,
                      borderBottomWidth: 2,
                      margin: 4
                    }}
                  />
                  <ExpandingTextInput
                    multiline={true}
                    placeholder={"Text"}
                    min={120}
                    max={600}
                    value={this.state.inputs.text}
                    onChangeText={text => this.setInput("text", text)}
                    numberOfLines={4}
                    placeholderTextColor={colors.placeholder}
                    style={{
                      color: colors.text,
                      backgroundColor: null,
                      borderColor: colors.seperator,
                      borderBottomWidth: 2,
                      margin: 4
                    }}
                  />
                </View>
              )}
              {!this.state.imageLoading && this.state.image ? (
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                      marginBottom: 8
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.image.url
                      }}
                      style={{ flex: 1, height: 200 }}
                      resizeMode={"contain"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        image: null,
                        imageLoading: false
                      });
                    }}
                    style={{
                      height: 40,
                      width: 150,
                      backgroundColor: colors.downvote,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: colors.background }}>
                      <Entypo name="cross" size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {this.state.imageLoading && !this.state.image ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 8,
                    marginBottom: 8
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      marginBottom: 40,
                      width: 150,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.seperator
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                </View>
              ) : null}
              {!this.state.imageLoading && !this.state.image ? (
                <View style={{ flexDirection: "row" }}>
                  {this.props.rules.allowPhotos && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ imageLoading: true }, () => {
                          ImagePicker.launchCamera(options, response => {
                            console.log(response);
                            if (response && response.path) {
                              uploadImage(
                                response.path,
                                response.width,
                                response.height,
                                d => {
                                  console.log("got response", d);
                                  this.setState({
                                    image: d,
                                    imageLoading: false
                                  });
                                }
                              );
                            } else {
                              this.setState({
                                imageLoading: false
                              });
                            }
                          });
                        });
                      }}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Icon
                        name="ios-camera"
                        color={colors.textMinor}
                        size={50}
                      />
                    </TouchableOpacity>
                  )}
                  {this.props.rules.allowUploaded && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ imageLoading: true }, () => {
                          ImagePicker.launchImageLibrary(options, response => {
                            console.log(response);
                            if (response && response.path) {
                              uploadImage(
                                response.path,
                                response.width,
                                response.height,
                                d => {
                                  console.log("got response", d);
                                  this.setState({
                                    image: d,
                                    imageLoading: false
                                  });
                                }
                              );
                            } else {
                              this.setState({
                                imageLoading: false
                              });
                            }
                          });
                        });
                      }}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Icon
                        name="md-images"
                        color={colors.textMinor}
                        size={50}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </View>
          </ScrollView>
          <Buttons
            onClose={() => {
              this.props.onClose();
            }}
            onSend={() => {
              createPost(
                {
                  title: this.state.inputs.title,
                  text: this.state.inputs.text,
                  group: this.state.inputs.group,
                  image: this.state.image
                },
                res => {
                  console.log("GOT THAT CALLBACK YO", res);
                  if (res && res.data && res.data.status == "ok") {
                    console.log("din done that shit");
                    this.props.navigate("Details", {
                      group: this.props.group,
                      postId: res.data.postId
                    });
                  } else {
                    console.log("failed posting");
                  }
                }
              );
            }}
          />
        </View>
      </View>
    );
  }
}
