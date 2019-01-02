import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";

import colors from "that/colors";

import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import ExpandingTextInput from "that/components/ExpandingTextInput";

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
			<View style={{flexDirection:"row"}}>
				<ExpandingTextInput
					multiline={true}
					min={this.state.comment?100:60}
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
						marginBottom:0,
						textAlignVertical: 'top',
						flex:1
					}}
				/>

				<View style={{ width:60}}>
					<TouchableOpacity
						style={{
							backgroundColor: this.state.comment?colors.upvote:'#999',
							height: 40,
							flex: 1,
							alignItems: "center",
							justifyContent: "center"
						}}
						onPress={() => {
							this.state.comment&&comment({
								text: this.state.comment,
								path: this.props.path
							});
						}}
					>
						<Text style={{ color: colors.text }}>
							<Feather name="send" size={20}/>
						</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}
