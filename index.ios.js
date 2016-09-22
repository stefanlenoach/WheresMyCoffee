import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import AppNavigator from './app/navigation/AppNavigator'

class WheresMyCoffee extends Component {
  render() {
    return (
          <AppNavigator
            initialRoute={{ident: "Search"}} />
    )
  }
}

AppRegistry.registerComponent('WheresMyCoffee', () => WheresMyCoffee)
