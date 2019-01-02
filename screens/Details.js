import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import Comments from "that/components/Comments";
import Comment from "that/components/Comment";
import FloatButton from "that/components/FloatButton";
import CommentBox from "that/components/CommentBox";
import colors from "that/colors";
import firebase from "react-native-firebase";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	FlatList,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from "react-native";

class Details extends Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: colors.headerBackground
		},
		headerTintColor: colors.headerFont
	};
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {
			post: {},
			path: null,
			comments: [],
			commentsLoading: true
		};
	}
	componentDidMount() {
		console.log("the post is");
		let postId = this.props.navigation.getParam("postId", null);
		let group = this.props.navigation.getParam("group", null);
		this.sub1=firebase
			.firestore()
			.collection("groups")
			.doc(group)
			.collection("posts")
			.doc(postId)
			.onSnapshot(snap => {
				console.log("got post snapsnappyty", snap);
				this.setState({ post: snap._data, path: snap._ref.path });
			});

		this.sub2=firebase
			.firestore()
			.collection("groups")
			.doc(group)
			.collection("posts")
			.doc(postId)
			.collection("comments")
			.onSnapshot(d => {
				this.setState({
					commentsLoading: false,
					comments: d._docs.map(d => {
						return { ...d._data, path: d._ref.path };
					})
				});
			});
	}
	componentWillUnmount() {
		this.sub1 && this.sub1();
		this.sub2 && this.sub2();
	}

	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View style={{ flex: 1, backgroundColor: colors.background }}>
				<FlatList

					data={this.state.comments}
					keyExtractor={item => {
						return item.id;
					}}
					keyboardShouldPersistTaps={"handled"}
					renderItem={(c, rowMap) => {
						return (
							<Comment key={c.item.id} level={0} data={c.item} />
						);
					}}
					ListHeaderComponent={() => {
						return (
							<View style={{ flex: 1, marginBottom: 12 }}>
								{this.state.path && (
									<Post data={this.state.post} />
								)}
								<CommentBox path={this.state.path}/>								
								{!this.state.commentsLoading &&
									this.state.comments.length == 0 && (
										<View
											style={{
												height: 80,
												alignItems: "center",
												justifyContent: "center"
											}}
										>
											<Text
												style={{ color: colors.text }}
											>
												No comments
											</Text>
										</View>
									)}
								{this.state.commentsLoading && (
									<View
										style={{
											marginTop: 12,
											marginBottom: 12
										}}
									>
										<ActivityIndicator />
									</View>
								)}
							</View>
						);
					}}
				/>
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
