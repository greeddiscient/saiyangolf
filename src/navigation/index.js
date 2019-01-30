
import React from 'react';
import {
    createDrawerNavigator,
    NavigationActions,
    createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/home/HomeScreen';
import NewRoundScreen from '../screens/newRound/EnterRound';
import RoundSummaryScreen from "../screens/newRound/RoundSummary";
import RoundHistoryScreen from "../screens/roundHistory/RoundHistory";
import RoundHistoryDetailScreen from "../screens/roundHistory/RoundHistoryDetails";

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        EnterRound: NewRoundScreen,
        RoundDetails: RoundSummaryScreen,
        RoundHistory: RoundHistoryScreen,
        RoundHistoryDetails: RoundHistoryDetailScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}