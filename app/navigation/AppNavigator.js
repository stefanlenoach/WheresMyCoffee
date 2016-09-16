import React, { Component } from 'react';
import { StyleSheet, Navigator, Text } from 'react-native'
import SearchScreen from '../components/Search'
import ResultScreen from '../components/Results'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "Search":
        return (
          <SearchScreen
            {...globalNavigatorProps} />
        )

      case "Results":
        return (
          <ResultScreen
            {...globalNavigatorProps} />
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }

}

const styles = StyleSheet.create({

  navigatorStyles: {

  }

})

module.exports = AppNavigator
