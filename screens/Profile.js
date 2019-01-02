import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import Comments from "that/components/Comments";
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

export default class HomeScreen extends React.Component {
	render(){
		return <View><Text>Hi</Text></View>
	}
}