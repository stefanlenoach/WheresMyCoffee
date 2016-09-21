import React, { Component } from 'react';
import { Navigator } from 'react-native'
import Search from '../components/Search'
import Result from '../components/Results'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "Search":
        return (
          <Search
            {...globalNavigatorProps} />
        )

      case "Results":
        return (
          <Result
            {...globalNavigatorProps}
            data = {route.data} />
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }

}

module.exports = AppNavigator
