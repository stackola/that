import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import colors from "that/colors";
import {createPost} from "that/lib";
import ImagePicker from 'react-native-image-picker';
import { RNCamera } from "react-native-camera";

import Icon from "react-native-vector-icons/Ionicons";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	ScrollView,
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class CreationForm extends Component {
	constructor(p) {
		super(p);
		this.state = { inputs: { title: "", text: "", group: "cars"} };
	}
	setInput(key, value) {
		this.setState({ inputs: { ...this.state.inputs, [key]: value } });
	}
	render() {
		return (
			<View>
				<ScrollView
					style={{
						position: "absolute",
						width: "96%",
						marginLeft: "2%",
						marginRight: "2%",
						borderTopRightRadius: 14,
						borderTopLeftRadius: 14,
						bottom: 0,
						backgroundColor: colors.overlayBackground,
						paddingTop: 4,
						maxHeight: 400
					}}
					keyboardShouldPersistTaps={"handled"}
				>
					<View style={{ paddingLeft: 12, paddingRight: 12 }}>
						<TextInput
							multiline={false}
							placeholder={"Title"}
							placeholderTextColor={colors.placeholder}
							value={this.state.inputs.title}
							onChangeText={text =>
								this.setInput("title", text)
							}
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
							onChangeText={text =>
								this.setInput("text", text)
							}
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
						<View style={{height:200, overflow:"hidden"}}>
							<RNCamera
								ref={ref => {
									this.camera = ref;
								}}
								style={{
									flex: 1,
									height:200,
									alignItems: "center"
								}}
								type={RNCamera.Constants.Type.back}
								
								permissionDialogTitle={
									"Permission to use camera"
								}
								permissionDialogMessage={
									"We need your permission to use your camera phone"
								}
							
							/>
						</View>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
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
							<TouchableOpacity
							onPress={()=>{
								ImagePicker.launchImageLibrary(options, (response) => {
								  // Same code as in above section!
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
						</View>
						<TextInput
							multiline={false}
							placeholder={"Wohin"}
							value={this.state.inputs.group}
							onChangeText={text =>
								this.setInput("group", text)
							}
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
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => {
								this.props.onClose();
							}}
							style={{
								backgroundColor: colors.downvote,
								height: 40,
								flex: 1,
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<Text style={{ color: colors.text }}>
								Abbrechen
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: colors.upvote,
								height: 40,
								flex: 1,
								alignItems: "center",
								justifyContent: "center"
							}}
							onPress={()=>{createPost({title:this.state.inputs.title, text:this.state.inputs.text, group:this.state.inputs.group })}}
						>
							<Text style={{ color: colors.text }}>Feuer</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}
