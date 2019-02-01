import React, { Component } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Icon,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import {
  StackNavigator,
  createStackNavigator
} from 'react-navigation';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import HomeScreen from '../screens/home/HomeScreen';
import NewRoundScreen from '../screens/newRound/EnterRound';
import RoundSummaryScreen from "../screens/newRound/RoundSummary";
import RoundHistoryScreen from "../screens/roundHistory/RoundHistory";
import RoundHistoryDetailScreen from "../screens/roundHistory/RoundHistoryDetails";
import colors from '../config/colors';

var loadMainScreen = false;
const animatedView = [new Animated.Value(0), new Animated.Value(0)];

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: this.props.isLogin };
    this.state = {
      isLoaded: false,
    };
    setTimeout(() => this.setState({ isLoaded: true }), 1500);
    this.opacity(0);
  }

  render() {
    loadMainScreen = this.state.isLogin
    return (
      <View style={{ flex: 1 }}>
        {this.render_main()}
      </View>
    );
  }

  opacity(value) {
    if (value < animatedView.length) {
      Animated.timing(
        animatedView[value],
        {
          toValue: 1,
          easing: Easing.linear,
          duration: 1000
        }).start(() => {
          if (value < animatedView.length) {
            this.opacityUp(value);
          }
        });
    }
  }

  opacityUp(value) {
    if (value < animatedView.length) {
      Animated.timing(
        animatedView[value],
        {
          toValue: 0,
          easing: Easing.linear,
          duration: 500
        }).start(() => {
          if (value < animatedView.length) {
            this.opacity(value + 1);
          }
        });
    }
  }

  render_main() {
    if (this.state.isLoaded == true) {
      return (<Root />);
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
          <Animated.View
            style={{
              position: 'absolute',
              opacity: animatedView[0],
              transform: [{
                translateY: animatedView[0].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0]
                })
              }]
            }}
          >
            {/* <Image source={images.boxin} style={{ width: 100, height: 100, }} /> */}
          </Animated.View>
        </View>
      );
    }
  }
}

const Root = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen,
    EnterRound: NewRoundScreen,
    RoundDetails: RoundSummaryScreen,
    RoundHistory: RoundHistoryScreen,
    RoundHistoryDetails: RoundHistoryDetailScreen
},
{
    initialRouteName: 'Login',
    headerMode: 'none'
}
);


export default MainNavigation;
