import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, TouchableOpacity, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'
import axios from 'axios';

export default class RoundHistoryDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Round History Details',
  };
  constructor(props) {
    super(props);
    this.state = {
      roundSummary: [],
      round: []
    };
  }
  componentWillMount(){
    const { navigation } = this.props;
    const round = navigation.getParam('round', [])
    this.setState({
      round: round
    })
    console.log("cdm round",round)
  }
  render() {
    var rows=[]
    var round=this.state.round
    console.log(round)
    var roundSummary=round.roundSummary
    console.log("roundSummary render", roundSummary)
    var rows=[]
    for(var i=0;i<roundSummary.length;i++){
      rows.push(<Text style={{fontWeight:'bold'}}>Hole {i+1}</Text>)
      for(var j=0;j<roundSummary[i].shots.length;j++){
        rows.push(<Text style={{fontWeight:'bold'}}>Shot {j+1}</Text>)
        rows.push(<Text >{roundSummary[i].shots[j].distance}{roundSummary[i].shots[j].lie} SG={roundSummary[i].shots[j].sg}</Text>)
      }
      rows.push(<Text style={{fontWeight:'bold'}}>Score={roundSummary[i].score}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Putts={roundSummary[i].putts}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>PuttingSG={roundSummary[i].puttingSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>TotalSG={roundSummary[i].sg}</Text>)
    }
    rows.push(<Text >Round Summary</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Driving Distance= {round.drivingDistance}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>No of Putts= {round.totalPutts}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>GIR= {round.gir}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Fairways= {round.fairways}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Driving SG= {round.drivingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Approach SG= {round.approachSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Wedge SG= {round.wedgeSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Chipping SG= {round.chippingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Putting SG= {round.totalPuttingSG}</Text>)
    rows.push(<Text style={{fontWeight:'bold'}}>Total SG= {round.totalSG}</Text>)
    return (
      <ScrollView style={{flex: 1, borderWidth: 1,borderColor:'#000',padding: 10, paddingBottom: 100}}>
        {rows}
      </ScrollView>
    );
  }
}
