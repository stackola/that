import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import colors from "that/colors"
import Icon from "react-native-vector-icons/Ionicons";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

export default class VoteButtons extends React.PureComponent {
	render() {
		return (
			<View style={{ width:35, maxHeight: 100, minHeight:80}}>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon name={"md-arrow-up"} color={colors.upvote} size={25} />
				</TouchableOpacity>
				<View
					style={{

						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text style={{ color: "white", textAlign: "center" }}>
						15
					</Text>
				</View>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon name={"md-arrow-down"} color={colors.downvote} size={25} />
				</TouchableOpacity>
			</View>
		);
	}
}
