import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import colors from "that/colors";

import { comment } from "that/lib";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	View,
	Text
} from "react-native";

export default class Header extends Component {
	constructor(p) {
		super(p);
		this.state = { comment:"" };
	}
	render() {
		return (
			<View>
				<TextInput
					multiline={false}
					value={this.state.comment}
					onChangeText={text => {
						this.setState({ comment: text });
					}}
					placeholder={"Text"}
					placeholderTextColor={colors.placeholder}
					style={{
						color: colors.text,
						backgroundColor: null,
						borderColor: colors.seperator,
						borderBottomWidth: 2,
						margin: 4
					}}
				/>
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
							comment({
								text: this.state.comment,
								path: this.props.path
							});
						}}
					>
						<Text style={{ color: colors.text }}>
							Kommentieren!
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
