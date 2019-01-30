
/** @format */

import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
// import App from './App';
import Navigation from './src/navigation';
import {name as appName} from './app.json';

class SaiyanGolf extends Component {
    render() {
      return (
        // <App />
        <Navigation />
      );
    }
  }
  
  export default SaiyanGolf;

AppRegistry.registerComponent(appName, () => SaiyanGolf);

