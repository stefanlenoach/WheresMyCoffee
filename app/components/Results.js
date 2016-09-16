import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View, ListView, TouchableElement, TouchableOpacity} from 'react-native';
import Button from 'react-native-button'
import _ from 'lodash'

class Results extends Component {

  constructor(props) {

  super(props)
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
  this.state = {
    results: ds.cloneWithRows(props.data.businesses)
  }
}

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{marginTop: 100}}
          initialListSize={10}
          dataSource={this.state.results}
          renderRow={(result) => { return this._renderResult(result) }} />
      </View>
    );
  }

  _renderResult(result) {

    return (
      <TouchableOpacity style={styles.resultRow} >
        <Text>{`${_.capitalize(result.name)} ${_.capitalize(result.rating)}`}</Text>
        <View style={{flex: 1}} />
      </TouchableOpacity>
    )
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
