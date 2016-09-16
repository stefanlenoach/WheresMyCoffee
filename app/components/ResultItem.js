import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View, ListView, TouchableElement, TouchableOpacity} from 'react-native';


class Search extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown'
  };



  componentDidMount() {

  }

  render() {

    return (
      <View>
        <ListView
          style={{marginTop: 100}}
          initialListSize={10}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this._renderPersonRow(person) }} />
      </View>
    );
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

module.exports = Search
