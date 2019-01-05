import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import TopBar from "that/components/TopBar";
import InputRow from "that/components/InputRow";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class CreateGroup extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = {
      inputs: { color: colors.upvote }
    };
  }
  setInput(key, value) {
    this.setState({ inputs: { ...this.state.inputs, [key]: value } });
  }
  componentDidMount() {}

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
        <ScrollView style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}>
          <InputRow
            type={"text"}
            title={"Name"}
            placeholder={"Name your group"}
          />
          <InputRow type={"text"} title={"Slug"} />
          <InputRow type={"switch"} title={"Slug"} />
          <InputRow
            type={"picker"}
            items={[{ label: "M", value: "M" }, { label: "W", value: "W" }]}
            title={"Slug"}
          />
          <InputRow
            value={this.state.inputs.color}
            type={"color"}
            title={"Color"}
            onChange={c => {
              this.setInput("color", c);
              console.log(c);
            }}
          />
          <Text>New group</Text>
        </ScrollView>
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
