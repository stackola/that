import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import Comments from "that/components/Comments";
import colors from "that/colors";

import { createUser } from "that/lib";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	View,
	Picker,
	Text
} from "react-native";

export default class EditProfile extends React.Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: colors.headerBackground
		},
		headerTintColor: colors.headerFont,
		title: "Profil erstellen"
	};
	constructor(p) {
		super(p);
		this.state = { inputs: { username: "", location: "", gender: "D" } };
	}
	setInput(key, value) {
		this.setState({ inputs: { ...this.state.inputs, [key]: value } });
	}
	render() {
		return (
			<ScrollView
				style={{
					flex: 1,
					paddingTop: 8,
					paddingLeft: 12,
					paddingRight: 12,
					backgroundColor: colors.background
				}}
				keyboardShouldPersistTaps={"handled"}
			>
				<View style={{ flexDirection: "row", marginBottom: 12 }}>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text style={{ color: colors.text }}>Username</Text>
					</View>
					<View style={{ flex: 2 }}>
						<TextInput
							multiline={false}
							value={this.state.inputs.username}
							onChangeText={text =>
								this.setInput("username", text)
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
				</View>
				<View style={{ flexDirection: "row", marginBottom: 12 }}>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text style={{ color: colors.text }}>Stadt</Text>
					</View>
					<View style={{ flex: 2 }}>
						<TextInput
							multiline={false}
							value={this.state.inputs.location}
							onChangeText={text =>
								this.setInput("location", text)
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
				</View>
				<View style={{ flexDirection: "row", marginBottom: 12 }}>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text style={{ color: colors.text }}>Geschlecht</Text>
					</View>
					<View style={{ flex: 2 }}>
						<Picker
							selectedValue={this.state.inputs.gender}
							style={{
								height: 50,
								backgroundColor: colors.seperator,
								color: colors.text
							}}
							onValueChange={value =>
								this.setInput("gender", value)
							}
						>
							<Picker.Item label="KA/Anderes" value="D" />
							<Picker.Item label="M" value="M" />
							<Picker.Item label="W" value="W" />
						</Picker>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.upvote,
							height: 40,
							flex: 1,
							alignItems: "center",
							justifyContent: "center"
						}}
						onPress={() => {
							createUser(this.state.inputs)
								.then(res => {
									console.log("Done that");
									this.props.navigation.navigate("Home");
								})
								.catch(err => {
									console.log(err);
									return false;
								});
						}}
					>
						<Text style={{ color: colors.text }}>Weiter</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}
