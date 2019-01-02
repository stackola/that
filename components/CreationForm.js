import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import colors from "that/colors";
import { createPost, uploadImage } from "that/lib";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	ScrollView,
	TextInput,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

const options = {
	mediaType: "photo",
	quality: 0.4
};

export default class CreationForm extends Component {
	constructor(p) {
		super(p);
		this.state = {
			inputs: { title: "", text: "", group: "" },
			picture: null,
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
			<View style={{position:"absolute", zIndex:5, top:0, left:0, width:"100%",height:"100%"}}>
				<ScrollView
					style={{
						position: "absolute",
						width: "96%",
						marginLeft: "2%",
						zIndex: 5,
						marginRight: "2%",
						borderTopRightRadius: 14,
						borderTopLeftRadius: 14,
						bottom: 0,
						backgroundColor: colors.overlayBackground,
						paddingTop: 4,
						height: "95%"
					}}
					keyboardShouldPersistTaps={"handled"}
				>
					<View style={{ paddingLeft: 12, paddingRight: 12 }}>
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
						{!this.state.imageLoading && this.state.picture ? (
							<View
								style={{
									alignItems: "center",
									flexDirection: "row"
								}}
							>
								<Image
									source={{ uri: this.state.picture.url }}
									style={{ flex: 1, height: 200 }}
									resizeMode={"contain"}
								/>
							</View>
						) : null}
						{this.state.imageLoading && !this.state.picture ? (
							<View style={{ height: 200, alignItems:'center', justifyContent:'center'}}>
							<View style={{ height:200, width: 150, alignItems:'center', justifyContent:'center', backgroundColor:colors.seperator}}>

								<ActivityIndicator />
							</View>
							</View>
						) : null}
						{!this.state.imageLoading && !this.state.picture ? (
							<View style={{ flexDirection: "row" }}>
								<TouchableOpacity
									onPress={() => {
										this.setState(
											{ imageLoading: true },
											() => {
												ImagePicker.launchCamera(
													options,
													response => {
														console.log(response);
														if (
															response &&
															response.path
														) {
															uploadImage(
																response.path,
																d => {
																	console.log(
																		"got response",
																		d
																	);
																	this.setState(
																		{
																			picture: d,
																			imageLoading: false
																		}
																	);
																}
															);
														}
														else
														{
															this.setState({imageLoading:false});
														}
													}
												);
											}
										);
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
								<TouchableOpacity
									onPress={() => {
										this.setState(
											{ imageLoading: true },
											() => {
												ImagePicker.launchImageLibrary(
													options,
													response => {
														console.log(response);
														if (
															response &&
															response.path
														) {
															uploadImage(
																response.path,
																d => {
																	console.log(
																		"got response",
																		d
																	);
																	this.setState(
																		{
																			picture: d,
																			imageLoading: false
																		}
																	);
																}
															);
														}
														else
														{
															this.setState({imageLoading:false});
														}
													}
												);
											}
										);
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
						) : null}

						<TextInput
							multiline={false}
							placeholder={"Wohin"}
							value={this.state.inputs.group}
							onChangeText={text => this.setInput("group", text)}
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
					<View style={{ flexDirection: "row", alignSelf:'flex-end' }}>
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
							onPress={() => {
								createPost({
									title: this.state.inputs.title,
									text: this.state.inputs.text,
									group: this.state.inputs.group
								});
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
