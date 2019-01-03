import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	ScrollView,
	Image,
	View,
	TextInput,
	Text
} from "react-native";

export default class Details extends Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: colors.headerBackground
		},
		headerTintColor: colors.headerFont
	};
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {};
	}
	componentDidMount() {}

	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View style={{ flex: 1 }}>
				<Image />
			</View>
		);
	}
}
