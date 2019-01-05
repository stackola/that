import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import {
	View,
	Text
} from "react-native";

class AppContainer extends Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {};
	}
	componentDidMount() {}

	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View>
				<Text>{this.props.user.username}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
