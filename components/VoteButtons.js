import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";

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
			<View style={{ flex: 1, maxHeight: 100 }}>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon name={"md-arrow-up"} color="#00ff4d" size={25} />
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
					<Icon name={"md-arrow-down"} color="orangered" size={25} />
				</TouchableOpacity>
			</View>
		);
	}
}
