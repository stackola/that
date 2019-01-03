import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import PinchZoomView from 'react-native-pinch-zoom-view';

import colors from "that/colors";
import TopBar from "that/components/TopBar";
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

export default class ImageView extends Component {
	static navigationOptions = {
		header:null
	};
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {};
	}
	componentDidMount() {}

	render() {
		let image = this.props.navigation.getParam("image", null);
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View style={{ flex: 1, backgroundColor:colors.background }}>
			<TopBar
				title={""}
				back={()=>{this.props.navigation.goBack()}}
				navigate={(a, b, c) => {
					this.props.navigation.navigate({
						routeName: a,
						params: b,
						key: c
					});
				}}
			/>
			<PinchZoomView maxScale={3} style={{flex:1, backgroundColor:colors.background}}>

				<Image
				resizeMode="contain"
					source={{
						uri: image.url
					}}
					style={{

						  position: 'absolute',
						  top: 0,
						  left: 0,
						  bottom: 0,
						  right: 0,

					}}
				/>
			</PinchZoomView>
			</View>
		);
	}
}
