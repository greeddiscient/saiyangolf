import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View, StyleSheet,TouchableHighlight,TouchableOpacity, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'
import axios from 'axios';
import Modal from 'react-native-modal'
import moment from 'moment'

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
      fairways: 0,
      courseName: '',
      roundDate:''
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
    var date =moment().format("MMM Do YYYY")
    this.setState({
      roundDate: date
    })
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
      if(roundSummary[i].par==4 && roundSummary[i].shots.length==1){
        fairways+=1
      }
      else if(roundSummary[i].par==4 && roundSummary[i].shots[1].lie=="F"){
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
    totalPuttingSG=totalPuttingSG.toFixed(2)
    totalSG=totalSG.toFixed(2)
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
    drivingSG=drivingSG.toFixed(2)
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
    wedgeSG=wedgeSG.toFixed(2)
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
    chippingSG=chippingSG.toFixed(2)
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
    approachSG=approachSG.toFixed(2)
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
    averageDrivingDistance=averageDrivingDistance.toFixed(2)
    this.setState({
      drivingDistance: averageDrivingDistance
    })
  }
  saveAPI(){
    // this.props.navigation.navigate('EnterRound')
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
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
      totalSG: this.state.totalSG,
      roundSummary: roundSummary,
      courseName: this.state.courseName,
      roundDate: this.state.roundDate
    })
    .then(function (response) {
      console.log(response);
      that.props.navigation.navigate('Home')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  saveRound(){
    this.setState({isModalVisible: true})
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  onChangeCourseName(event){
    var value= event.nativeEvent.text
    this.setState({
      courseName: value
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
      rows.push(<Text style={{fontWeight:'bold'}}>Score={roundSummary[i].score}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>Putts={roundSummary[i].putts}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>PuttingSG={roundSummary[i].puttingSG}</Text>)
      rows.push(<Text style={{fontWeight:'bold'}}>TotalSG={roundSummary[i].sg}</Text>)
    }
    rows.push(<Text >Round Summary</Text>)
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
        <Modal
          backdropColor={"white"}
          backdropOpacity={1}
          style={styles.container}
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={styles.modalContent}>
            <Text>{this.state.roundDate}</Text>
            <Text>Course Name:</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: '#000066',
                borderWidth: 1.5
              }}
              onChange={this.onChangeCourseName.bind(this)}
              value={this.state.courseName}
            />
            <TouchableOpacity
              style= {styles.buttonPress}
              onPress={this.saveAPI.bind(this)}
            >
              <Text style={styles.welcomePress}>Save Round</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonPress: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  welcomePress: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
})
