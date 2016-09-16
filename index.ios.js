// import React, { Component } from 'react';
// import {AppRegistry} from 'react-native';
// import Root from './app/components/root'
//
//
// AppRegistry.registerComponent('WheresMyCoffee', () => Root);


'use strict'
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, TabBarIOS } from 'react-native'
import AppNavigator from './app/navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

class WheresMyCoffee extends Component {
  render() {
    return (
          <AppNavigator
            initialRoute={{ident: "Search"}} />
    )
  }

}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('WheresMyCoffee', () => WheresMyCoffee)
