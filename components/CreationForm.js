import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import colors from "that/colors";

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
							value={"/lustig"}
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
						>
							<Text style={{ color: colors.text }}>Feuer</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}
