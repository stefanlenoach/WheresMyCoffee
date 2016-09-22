import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ListView, Linking, TouchableOpacity} from 'react-native';

class Results extends Component {

  constructor(props) {
    super(props)
    var dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      results: dataStore.cloneWithRows(props.data.businesses)
    }
  }

  render() {
    return (
      <View>
        <Text style= {styles.header}>Results</Text>
        <ListView
          style={{marginTop: 100}}
          initialListSize={10}
          dataSource={this.state.results}
          renderRow={(result) => { return this.renderResult(result) }} />
      </View>
    );
  }

  renderResult(result) {
    return (
      <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(result.url)}>
        <Image source={{uri: result.image_url}}
       style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
       <View style={{flexDirection: 'column', justifyContent: 'center'}}>
         <Text style={{fontWeight: 'bold'}}>{`${result.name}`}</Text>
         <Text>Rating: {`${result.rating}`}</Text>
         <Text>Phone: {`${result.display_phone}`}</Text>
       </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
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
