import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'that/redux/actions';
import { bindActionCreators } from 'redux';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Header extends Component {
	render(){
		return (<View><View style={{height:200, background:'black'}}><Text >Headessr!!</Text></View></View>);
	}
}