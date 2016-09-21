import React, { Component } from 'react';
import { StyleSheet, Navigator, Text } from 'react-native'
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
