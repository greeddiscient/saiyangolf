import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EnterRoundScreen from "./EnterRound.js"
import RoundDetailsScreen from "./RoundDetails.js"

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SaiyanGolf',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Enter a New Round"
          onPress={() => this.props.navigation.navigate('EnterRound')}
        />
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    EnterRound: EnterRoundScreen,
    RoundDetails: RoundDetailsScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
