import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import Comments from "that/components/Comments";
import FloatButton from "that/components/FloatButton";
import colors from "that/colors";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	ScrollView,
	View,
	Text
} from "react-native";

class Details extends Component {
	static navigationOptions={
		headerStyle:{
			backgroundColor:colors.headerBackground,
		},
		headerTintColor:colors.headerFont
	}
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {};
	}
	componentDidMount() {}

	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View style={{flex:1}}>
			<ScrollView style={{flex:1, backgroundColor:colors.background}} keyboardShouldPersistTaps={"never"}>
				<Post/>
				<Comments/>
				</ScrollView>
				<FloatButton/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
