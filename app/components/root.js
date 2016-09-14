import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TouchableElement} from 'react-native';
import Button from 'react-native-button'
import oauthSignature from 'oauth-signature'
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
    var url = "https://api.yelp.com/v2/search?term=coffee&ll=37.788022,-122.399797&oauth_consumer_key=QM1R8nTTpNM9BkDZxlPjPA&oauth_token=_LWVxe12Gh0hwPsXJew1HImgFlXne3X7&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1473866484&oauth_nonce=C9dVTv&oauth_version=1.0&oauth_signature=Op4Tx1AUkRbLvxdD/afGCmr7siA="


    fetch(url, {method: "GET", mode:"cors"}).then(function(response){
      return response.json()
    }).then(function(j){
      console.log(j)
    })

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
// https://api.yelp.com/v2/search?term=coffee&ll=37.788022,-122.399797&oauth_consumer_key=QM1R8nTTpNM9BkDZxlPjPA
// &oauth_token=_LWVxe12Gh0hwPsXJew1HImgFlXne3X7&oauth_signature_method=HMAC-SHA1
// &oauth_timestamp=1473802903&oauth_nonce=2kELba&oauth_version=1.0&oauth_signature=n5wIP3Y9N861rv541/QcS5hNTzQ=
  constructURL() {
    var consumerKey = "QM1R8nTTpNM9BkDZxlPjPA"
    var consumerSecret = "xz1fy7c22bONrcb-elPYFPtPwds"
    var tokenSecret = "hwmrEME1CDhGoHxGTXdSN4DUdXQ"
    var token = "_LWVxe12Gh0hwPsXJew1HImgFlXne3X7"

    var lng_lat = {lat: this.state.lastPosition.coords.latitude, lng: this.state.lastPosition.coords.longitude};

    var default_parameters = {
      term: 'coffee',
      ll: lng_lat.lat + ',' + lng_lat.lng,
      sort: '2'
    };

    /* We set the require parameters here */
    var required_parameters = {
      oauth_consumer_key : consumerKey,
      oauth_token : token,
      oauth_nonce : n(),
      oauth_timestamp : n().toString().substr(0,10),
      oauth_signature_method : 'HMAC-SHA1',
      oauth_version : '1.0'
    };

    var parameters = _.assign(default_parameters, lng_lat, required_parameters);

    var url = 'http://api.yelp.com/v2/search';
    var search = 'search?term=coffee&';
    var ll = String(this.state.lastPosition.latitude) + ',' + String(this.state.lastPosition.longitude);
    var oAuthConsumerKey = '&oauth_consumer_key=' + consumerKey;
    var oAuthToken = '&oauth_token=' + token;
    var signatureMethod = '&oauth_signature_method=HMAC-SHA1';
    var timestamp = '&oauth_timestamp=' + String(this.state.lastPosition.timestamp).substring(0,9);
    var nonce = '&oauth_nonce=';



    var str = (url + search +default_parameters.ll + oAuthConsumerKey + oAuthToken + signatureMethod + timestamp + nonce)

    fetch(url, {method: "GET"}).then(function(response){console.log(response)});
  }

  render() {


    //  if (this.state.lastPosition != 'unknown'){
    //    console.log(getData(url))
    //  }

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
          onPress={this._handleClick}>
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
