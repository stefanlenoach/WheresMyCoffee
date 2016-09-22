import React, { Component } from 'react';
import { Navigator } from 'react-native'
import Search from '../components/Search'
import Results from '../components/Results'

class AppNavigator extends Component {

  renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "Search":
        return (
          <Search
            {...globalNavigatorProps} />
        )

      case "Results":
        return (
          <Results
            {...globalNavigatorProps}
            data = {route.data} />
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        renderScene={this.renderScene}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight } />
    )
  }

}

module.exports = AppNavigator
