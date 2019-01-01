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
	View,
	TextInput,
	Text
} from "react-native";

class Details extends Component {
	static navigationOptions={
		headerStyle:{
			backgroundColor:colors.headerBackground,
		},
		headerTintColor:colors.headerFont,
		title: 'Create new gloob'
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
			<ScrollView style={{flex:1, backgroundColor:colors.background}}>

				<TextInput multiline={false} placeholder={"Title"} style={{color:colors.text, backgroundColor:colors.inputBackground, margin:4}}/>
				<TextInput multiline={true} style={{color:colors.text, backgroundColor:'#3c63be', margin:4}}/>
			</ScrollView>
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
