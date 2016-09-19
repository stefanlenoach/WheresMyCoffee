import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TouchableElement, TouchableOpacity} from 'react-native';
import Button from 'react-native-button'


class Search extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown'
  };

  watchID: ?number = null;

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  constructURL() {

    if(this.state.lastPosition != 'unknown'){
      var OAuthSimple = require('oauthsimple')
      var term = "coffee"
      var lat = this.state.lastPosition.coords.latitude
      var lng = this.state.lastPosition.coords.longitude
      var consumerKey = "QM1R8nTTpNM9BkDZxlPjPA"
      var consumerSecret = "xz1fy7c22bONrcb-elPYFPtPwds"
      var tokenSecret = "hwmrEME1CDhGoHxGTXdSN4DUdXQ"
      var token = "_LWVxe12Gh0hwPsXJew1HImgFlXne3X7"
      var latlng = "ll=" + String(lat) + "," + String(lng)

      var consumerSecret = 'xz1fy7c22bONrcb-elPYFPtPwds'
      var tokenSecret = 'hwmrEME1CDhGoHxGTXdSN4DUdXQ'
      oauth = new OAuthSimple(consumerKey, tokenSecret)
          request = oauth.sign({
            action: "GET",
            path: "https://api.yelp.com/v2/search",
            parameters: "term=coffee&" + latlng,
            signatures: {api_key: consumerKey, shared_secret: consumerSecret, access_token: token, access_secret: tokenSecret},

          })

      var url = request.signed_url
      var that = this;

      fetch(url, {method: "GET", mode:"cors"}).then(function(response){
        return response.json()
      }).then(function(data){
        that.props.navigator.push({
          ident: "Results",
          data: data
        })
      }).catch(function(error){

        console.log("Error:", error)
      })

    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          WheresMyCoffee
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={this.constructURL.bind(this)}>
          <Text style={{fontSize: 15}}>Find Coffee!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginBottom: 30
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderRadius: 7,
    padding: 10,
    backgroundColor: 'rgb(37, 160, 205)'
  }
});

module.exports = Search
