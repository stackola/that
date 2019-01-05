import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import TopBar from "that/components/TopBar";
import InputRow from "that/components/InputRow";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Buttons from "../components/Buttons";

import { makeGroup } from "that/lib";

class CreateGroup extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = {
      inputs: {
        color: colors.upvote,
        name: "",
        allowAnon: false,
        allowPhotos: true,
        allowUploaded: true,
        allowText: true
      }
    };
  }
  setInput(key, value) {
    this.setState({ inputs: { ...this.state.inputs, [key]: value } }, () => {
      console.log(this.state);
    });
  }
  send() {
    makeGroup(this.state.inputs, res => {
      if (res.data && res.data.status == "ok") {
        console.log("we made it");
        res.data.slug &&
          this.props.navigation.navigate({
            routeName: "Group",
            params: { group: res.data.slug },
            key: res.data.slug
          });
      } else {
        console.log("error making group");
      }
    });
  }
  componentDidMount() {}
  makeSlug(v) {
    return v.toLowerCase().replace(/ /g, "");
  }
  render() {
    //We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TopBar
          title={"Create a group"}
          color={this.state.inputs.color}
          back={() => {
            this.props.navigation.goBack();
          }}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />
        <ScrollView
          style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          <InputRow
            type={"text"}
            title={"Name"}
            placeholder={"Name your group"}
            value={this.state.inputs.name}
            onChange={v => {
              this.setInput("name", v);
            }}
          />
          <InputRow
            type={"text"}
            title={"Slug"}
            placeholder={"Slug"}
            value={this.makeSlug(this.state.inputs.name)}
            readOnly={true}
          />

          <InputRow
            value={this.state.inputs.color}
            type={"color"}
            title={"Color"}
            onChange={c => {
              this.setInput("color", c);
            }}
          />

          <InputRow
            type={"switch"}
            title={"Allow anonymous users"}
            value={this.state.inputs.allowAnon}
            onChange={v => {
              this.setInput("allowAnon", v);
            }}
          />

          <InputRow
            type={"switch"}
            title={"Allow text"}
            value={this.state.inputs.allowText}
            onChange={v => {
              this.setInput("allowText", v);
            }}
          />

          <InputRow
            type={"switch"}
            title={"Allow photos"}
            value={this.state.inputs.allowPhotos}
            onChange={v => {
              this.setInput("allowPhotos", v);
            }}
          />

          <InputRow
            type={"switch"}
            title={"Allow uploaded images"}
            value={this.state.inputs.allowUploaded}
            onChange={v => {
              this.setInput("allowUploaded", v);
            }}
          />
        </ScrollView>
        <Buttons
          onSend={() => {
            this.send();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
