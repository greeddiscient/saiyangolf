import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'

export default class RoundDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Round Details',
  };
  constructor(props) {
    super(props);
    this.state = {
      drivingSG: 0,
      drivingDistance: 0
    };
  }
  componentDidMount(){
    this.calculateDrivingDistance()
    this.calculateDrivingStrokesGained()
  }
  calculateDrivingStrokesGained(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var drivingSG=0
    for(var i=0;i<roundSummary.length;i++){
      if(roundSummary[i].par==3){

      }
      else{
        drivingSG =drivingSG + parseFloat(roundSummary[i].shots[0].sg)
        console.log("shot1sg",roundSummary[i].shots[0].sg)
        console.log("totaldrivingSG",drivingSG)
      }
    }

    this.setState({
      drivingSG: drivingSG
    })
  }
  calculateDrivingDistance(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var totalDrivingDistance=0
    var averageDrivingDistance=0
    var count=0
    for(var i=0;i<roundSummary.length;i++){
      if(roundSummary[i].par==3){
      }
      else{
        count+=1
        totalDrivingDistance += parseInt(roundSummary[i].drivingDistance)
      }
    }
    console.log("totalDrivingDistance",totalDrivingDistance)
    averageDrivingDistance= totalDrivingDistance/count
    this.setState({
      drivingDistance: averageDrivingDistance
    })
  }
  render() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var rows=[]
    for(var i=0;i<roundSummary.length;i++){
      rows.push(<Text style={{fontWeight:'bold'}}>Hole {i+1}</Text>)
      for(var j=0;j<roundSummary[i].shots.length;j++){
        rows.push(<Text style={{fontWeight:'bold'}}>Shot {j+1}</Text>)
        rows.push(<Text >{roundSummary[i].shots[j].distance}{roundSummary[i].shots[j].lie} SG={roundSummary[i].shots[j].sg}</Text>)
      }
      rows.push(<Text >Score={roundSummary[i].score}</Text>)
      rows.push(<Text >Putts={roundSummary[i].putts}</Text>)
      rows.push(<Text >PuttingSG={roundSummary[i].puttingSG}</Text>)
      rows.push(<Text >TotalSG={roundSummary[i].sg}</Text>)
    }
    rows.push(<Text >Driving Distance={this.state.drivingDistance}</Text>)
    rows.push(<Text >Driving SG={this.state.drivingSG}</Text>)
    console.log(this.props)

    return (
      <ScrollView style={{flex: 1, borderWidth: 1,borderColor:'#000',padding: 10}}>
        {rows}
      </ScrollView>
    );
  }
}
