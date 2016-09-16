import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TouchableElement, TouchableOpacity} from 'react-native';
import Button from 'react-native-button'


class Results extends Component {
  state = {
  };

  watchID: ?number = null;

  componentDidMount() {
    debugger
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Results!!
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'coral',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Results
