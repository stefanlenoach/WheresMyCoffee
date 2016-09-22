import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ListView, Linking, TouchableOpacity} from 'react-native';

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
      <Text style= {styles.header}>Results</Text>
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
      <TouchableOpacity style={styles.resultRow} onPress={() => this._linkPressed(result.url)}>
        <Image source={{uri: result.image_url}}
       style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
       <View style={{flexDirection: 'column', justifyContent: 'center'}}>
         <Text style={{fontWeight: 'bold'}}>{`${result.name}`}</Text>
         <Text>Rating: {`${result.rating}`}</Text>
         <Text>Phone: {`${result.display_phone}`}</Text>
       </View>
        <View style={styles.resultRow} />
      </TouchableOpacity>
    )
  }

  _linkPressed(url){
    Linking.openURL(url);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  header:{
    textAlign: 'center',
    position: 'relative',
    top: 60,
    fontSize: 30
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 5,
  }
});

module.exports = Results
