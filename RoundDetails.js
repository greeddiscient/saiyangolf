import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'
import axios from 'axios';

export default class RoundDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Round Details',
  };
  constructor(props) {
    super(props);
    this.state = {
      drivingSG: 0,
      drivingDistance: 0,
      chippingSG: 0,
      approachSG: 0,
      totalPutts: 0,
      totalSG: 0,
      totalPuttingSG: 0,
      wedgeSG: 0,
      gir: 0,
      fairways: 0
    };
  }
  componentDidMount(){
    this.calculateDrivingDistance()
    this.calculateDrivingStrokesGained()
    this.calculateChippingStrokesGained()
    this.calculateApproachStrokesGained()
    this.calculateWedgeStrokesGained()
    this.calculatePuttsCountSGTotalSG()
    this.calculateGIR()
    this.calculateFairways()
  }
  calculateGIR(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var gir=0
    for(var i=0;i<roundSummary.length;i++){
      if(roundSummary[i].par==3 && roundSummary[i].shots.length==1){
        gir+=1
      }
      else if(roundSummary[i].par==4 && roundSummary[i].shots.length<=2){
        gir+=1
      }
      else if(roundSummary[i].par==5 && roundSummary[i].shots.length<=3){
        gir+=1
      }
    }
    this.setState({gir: gir})
  }
  calculateFairways(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var fairways=0
    for(var i=0;i<roundSummary.length;i++){
      if(roundSummary[i].par==4 && roundSummary[i].shots[1].lie=="F"){
        fairways+=1
      }
      else if(roundSummary[i].par==5 && roundSummary[i].shots[1].lie=="F"){
        fairways+=1
      }
    }
    this.setState({fairways: fairways})
  }
  calculatePuttsCountSGTotalSG(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var totalPutts=0
    var totalPuttingSG=0
    var totalSG=0
    for(var i=0;i<roundSummary.length;i++){
      totalPutts+=parseInt(roundSummary[i].putts)
      totalPuttingSG+=parseFloat(roundSummary[i].puttingSG)
      totalSG+=parseFloat(roundSummary[i].sg)
    }
    this.setState({
      totalPutts: totalPutts,
      totalPuttingSG: totalPuttingSG,
      totalSG: totalSG
    })
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
      }
    }

    this.setState({
      drivingSG: drivingSG
    })
  }
  calculateWedgeStrokesGained(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var wedgeSG=0
    for(var i=0;i<roundSummary.length;i++){

      for(var j=0;j<roundSummary[i].shots.length;j++){
        if(roundSummary[i].shots[j].distance <= 125 &&roundSummary[i].shots[j].distance > 50 && roundSummary[i].shots[j].lie != "S" && roundSummary[i].shots[j].lie !="RC"){
          wedgeSG+=parseFloat(roundSummary[i].shots[j].sg)
        }
      }
    }

    this.setState({
      wedgeSG: wedgeSG
    })
  }
  calculateChippingStrokesGained(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var chippingSG=0
    for(var i=0;i<roundSummary.length;i++){

      for(var j=0;j<roundSummary[i].shots.length;j++){
        if(roundSummary[i].shots[j].distance <= 50 && roundSummary[i].shots[j].lie != "S" && roundSummary[i].shots[j].lie !="RC"){
          chippingSG+=parseFloat(roundSummary[i].shots[j].sg)
        }
      }
    }

    this.setState({
      chippingSG: chippingSG
    })
  }
  calculateApproachStrokesGained(){
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var approachSG=0
    for(var i=0;i<roundSummary.length;i++){
      if(roundSummary[i].par==3){
        approachSG+= parseFloat(roundSummary[i].shots[0].sg)
      }
      else{
        for(var j=1;j<roundSummary[i].shots.length;j++){
          if(roundSummary[i].shots[j].distance > 50){
            approachSG+=parseFloat(roundSummary[i].shots[j].sg)
          }
        }
      }

    }

    this.setState({
      approachSG: approachSG
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
    averageDrivingDistance= totalDrivingDistance/count
    this.setState({
      drivingDistance: averageDrivingDistance
    })
  }
  saveRound(){
    // this.props.navigation.navigate('EnterRound')
    console.log("saveRoundPressed")
    that=this
    axios.post('http://saiyan-api.herokuapp.com/api/new_round', {
      drivingDistance: this.state.drivingDistance,
      totalPutts: this.state.totalPutts,
      gir: this.state.gir,
      fairways: this.state.fairways,
      drivingSG: this.state.drivingSG,
      approachSG: this.state.approachSG,
      wedgeSG: this.state.wedgeSG,
      chippingSG: this.state.chippingSG,
      totalPuttingSG: this.state.totalPuttingSG,
      totalSG: this.state.totalSG
    })
    .then(function (response) {
      console.log(response);
      that.props.navigation.navigate('Home')
    })
    .catch(function (error) {
      console.log(error);
    });
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
    rows.push(<Text style={{fontWeight:'bold'}}>Driving Distance= {this.state.drivingDistance}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>No of Putts= {this.state.totalPutts}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>GIR= {this.state.gir}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Fairways= {this.state.fairways}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Driving SG= {this.state.drivingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Approach SG= {this.state.approachSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Wedge SG= {this.state.wedgeSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Chipping SG= {this.state.chippingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Putting SG= {this.state.totalPuttingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Total SG= {this.state.totalSG}</Text>)
    rows.push(<Button
      title="Save Round"
      onPress={this.saveRound.bind(this)}
    />)
    
    
    console.log(this.props)

    return (
      <ScrollView style={{flex: 1, borderWidth: 1,borderColor:'#000',padding: 10, paddingBottom: 100}}>
        {rows}
      </ScrollView>
    );
  }
}
