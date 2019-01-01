import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'that/redux/actions';
import { bindActionCreators } from 'redux';
import Comment from "that/components/Comment";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Comments extends Component {
	render(){
		return (<View style={{}}><Comment/><Comment/></View>);
	}
}