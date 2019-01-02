import React, { Component } from "react";
import colors from "that/colors";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight
} from "react-native";
import Comment from "that/components/Comment";

export default class Comments extends Component {
	render() {
		return (
			<View>
			{this.props.comments.map((c)=>{return <Comment key={c.id} level={0} data={c}/>})}
			</View>
		);
	}
}
