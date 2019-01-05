import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import InputRow from "that/components/InputRow";

import { createUser } from "that/lib";

import { TouchableOpacity, ScrollView, View, Text } from "react-native";

class EditProfile extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.headerBackground
    },
    headerTintColor: colors.headerFont,
    title: "Profil erstellen"
  };
  constructor(p) {
    super(p);
    this.state = {
      inputs: { username: "", location: "", gender: "D", public: false }
    };
  }
  componentDidMount() {
    let user = this.props.user || {};
    this.setState({
      inputs: {
        username: user.username,
        location: user.location,
        gender: user.gender,
        public: user.public == true
      }
    });
  }
  setInput(key, value) {
    this.setState({ inputs: { ...this.state.inputs, [key]: value } });
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 8,
          paddingLeft: 12,
          paddingRight: 12,
          backgroundColor: colors.background
        }}
        keyboardShouldPersistTaps={"handled"}
      >
        <InputRow
          type={"text"}
          title={"Username"}
          value={this.state.inputs.username}
          onChange={text => this.setInput("username", text)}
        />
        <InputRow
          type={"text"}
          title={"City"}
          value={this.state.inputs.location}
          onChange={text => this.setInput("location", text)}
        />

        <InputRow
          type={"picker"}
          items={[
            { label: "M", value: "M" },
            { label: "W", value: "W" },
            { label: "KA/Anderes", value: "D" }
          ]}
          title={"Sex"}
          value={this.state.inputs.gender}
          onChange={value => this.setInput("gender", value)}
        />

        <InputRow
          type={"switch"}
          title={"Public profile"}
          value={this.state.inputs.public}
          onChange={v => {
            this.setInput("public", v);
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.upvote,
              height: 40,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              createUser(this.state.inputs)
                .then(res => {
                  console.log("Done that");
                  this.props.navigation.navigate("Home");
                })
                .catch(err => {
                  console.log(err);
                  return false;
                });
            }}
          >
            <Text style={{ color: colors.text }}>Weiter</Text>
          </TouchableOpacity>
        </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
