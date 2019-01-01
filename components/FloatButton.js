import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Text
} from "react-native";

export default class FloatButton extends Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: "#FF450099",
					width: 60,
					alignItems:'center',
					justifyContent:'center',
					height: 60,
					position: "absolute",
					right: 10,
					bottom: 10,
					borderRadius: 60,

				}}
			>
			<MDIcon name="plus" size={25} color={"white"}/>
			</View>
		);
	}
}
