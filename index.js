
/** @format */

import React, { Component } from 'react'
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import Setup from './src/navigation/Setup';

class SaiyanGolf extends Component {
  render() {
    return (
      <Setup />
    );
  }
}

export default SaiyanGolf;

AppRegistry.registerComponent(appName, () => SaiyanGolf);

