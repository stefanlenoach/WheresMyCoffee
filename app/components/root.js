import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TouchableElement} from 'react-native';
import Button from 'react-native-button'
import n from 'nonce'
import qs from 'querystring'
import _ from 'lodash'

class WheresMyCoffee extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    data: 'unknown'
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
// https://api.yelp.com/v2/search?term=coffee&ll=37.788022,-122.399797&oauth_consumer_key=QM1R8nTTpNM9BkDZxlPjPA
// &oauth_token=_LWVxe12Gh0hwPsXJew1HImgFlXne3X7&oauth_signature_method=HMAC-SHA1
// &oauth_timestamp=1473802903&oauth_nonce=2kELba&oauth_version=1.0&oauth_signature=n5wIP3Y9N861rv541/QcS5hNTzQ=
  constructURL() {
    if(this.state.lastPosition != 'unknown'){
      var oauthSignature = require('oauth-signature')
      var OAuthSimple = require('oauthsimple')

      var term = "coffee"
      var lat = this.state.lastPosition.coords.latitude
      var lng = this.state.lastPosition.coords.longitude
      var consumerKey = "QM1R8nTTpNM9BkDZxlPjPA"
      var consumerSecret = "xz1fy7c22bONrcb-elPYFPtPwds"
      var tokenSecret = "hwmrEME1CDhGoHxGTXdSN4DUdXQ"
      var token = "_LWVxe12Gh0hwPsXJew1HImgFlXne3X7"

      latlng = "ll=" + String(lat) + "," + String(lng)
      var url = "https://api.yelp.com/v2/search"
      var params = {
        term: "coffee",
        ll: latlng,
        oauth_token: "_LWVxe12Gh0hwPsXJew1HImgFlXne3X7",
        oauth_version: "1.0",
        oauth_consumer_secret: "xz1fy7c22bONrcb-elPYFPtPwds"
      }
      var consumerSecret = 'xz1fy7c22bONrcb-elPYFPtPwds'
      var tokenSecret = 'hwmrEME1CDhGoHxGTXdSN4DUdXQ'
//https://api.yelp.com/v2/search?ll=37.785834%2C-122.406417&oauth_consumer_key=QM1R8nTTpNM9BkDZxlPjPA&oauth_nonce=4lvnh&oauth_signature=SOG0hNs2O3T%2BqytFMVELQVAW4Uk%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1473878826&oauth_token=_LWVxe12Gh0hwPsXJew1HImgFlXne3X7&oauth_version=1.0&term=coffee
//https://api.yelp.com/v2/search?term=coffee&ll=37.788022,-122.399797&oauth_consumer_key=QM1R8nTTpNM9BkDZxlPjPA&oauth_token=_LWVxe12Gh0hwPsXJew1HImgFlXne3X7&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1473879113&oauth_nonce=zqBPLL&oauth_version=1.0&oauth_signature=TZeXIGkuz4gTBRWLYcAXldpU9Ss=
      oauth = new OAuthSimple(consumerKey, tokenSecret)
          request = oauth.sign({
            action: "GET",
            path: "https://api.yelp.com/v2/search",
            parameters: "term=coffee&" + latlng,
            signatures: {api_key: consumerKey, shared_secret: consumerSecret, access_token: token, access_secret: tokenSecret},

          })

      debugger

      fetch(url, {method: "GET", mode:"cors"}).then(function(response){
        return response.json()
      }).then(function(data){
        this.setState({data})
      }).catch(function(error){
        console.log("Error:", error)
      })

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          style={{borderWidth: 1, borderColor: 'transparent', backgroundColor: 'mistyrose'}}
          onPress={this.constructURL()}>
          Press Me!
        </Button>
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

module.exports = WheresMyCoffee
