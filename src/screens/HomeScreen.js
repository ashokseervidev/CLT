import React, { Component } from "react";
import { connect }  from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { init } from "../actions";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.main}>
        <Text>Welcome to App</Text>
        <Button
          onPress={this.props.init}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, {
  init
})(HomeScreen);
