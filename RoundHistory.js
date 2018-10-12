import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'
import axios from 'axios';

export default class RoundHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Round History',
  };
  constructor(props) {
    super(props);
    this.state = {
      rounds: []
    };
  }
  componentDidMount(){
    that=this
    axios.get('http://saiyan-api.herokuapp.com/api/rounds')
    .then(function (response) {
      // handle success
      console.log(response.data);
      rounds=that.state.rounds
      for(var i=0;i<response.data.length;i++){
        rounds.push(response.data[i])
      }
      console.log("after loop",rounds)
      that.setState({
        rounds: rounds
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  render() {
    var rows=[]
    var rounds=this.state.rounds
    console.log(rounds)
    for(var i=0;i<rounds.length;i++){
      rows.push(<Text >Round {i+1}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Driving Distance= {rounds[i].drivingDistance}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>No of Putts= {rounds[i].totalPutts}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>GIR= {rounds[i].gir}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Fairways= {rounds[i].fairways}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Driving SG= {rounds[i].drivingSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Approach SG= {rounds[i].approachSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Wedge SG= {rounds[i].wedgeSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Chipping SG= {rounds[i].chippingSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Putting SG= {rounds[i].totalPuttingSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Total SG= {rounds[i].totalSG}</Text>)
    }
    return (
      <ScrollView style={{flex: 1, borderWidth: 1,borderColor:'#000',padding: 10, paddingBottom: 100}}>
        {rows}
      </ScrollView>
    );
  }
}
