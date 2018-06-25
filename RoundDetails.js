import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'

export default class RoundDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Round Details',
  };
  render() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var rows=[]
    for(var i=0;i<roundSummary.length;i++){
      rows.push(<Text >Hole {i+1}</Text>)
      rows.push(<Text >Score={roundSummary[i].score}</Text>)
      rows.push(<Text >Putts={roundSummary[i].putts}</Text>)
      rows.push(<Text >PuttingSG={roundSummary[i].puttingSG}</Text>)
      rows.push(<Text >TotalSG={roundSummary[i].sg}</Text>)
      for(var j=0;j<roundSummary[i].shots.length;j++){
        rows.push(<Text >Shot {j+1}</Text>)
        rows.push(<Text >{roundSummary[i].shots[j].distance}{roundSummary[i].shots[j].lie} SG={roundSummary[i].shots[j].sg}</Text>)
      }
    }
    console.log(this.props)

    return (
      <ScrollView style={{flex: 1, borderWidth: 1,borderColor:'#000',padding: 10}}>
        {rows}
      </ScrollView>
    );
  }
}
