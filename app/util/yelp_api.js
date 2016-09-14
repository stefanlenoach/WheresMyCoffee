/* require the modules needed */
import oauthSignature from 'oauth-signature'
import n from 'nonce'
import request from 'request'
import qs from 'querystring'
import _ from 'lodash'


/* Function for yelp call
 * ------------------------
 * lng_lat: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function(lng_lat) {

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    term: 'coffee',
    ll: lng_lat.lat + ',' + lng_lat.lng,
    sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : process.env.oauth_consumer_key,
    oauth_token : process.env.oauth_token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */
  var parameters = _.assign(default_parameters, lng_lat, required_parameters);

  /* We set our secrets here */
  var consumerSecret = process.env.consumerSecret;
  var tokenSecret = process.env.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate('GET', url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return response
  });

};
module.exports = request_yelp
