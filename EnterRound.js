import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight,TouchableOpacity, Button,KeyboardAvoidingView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {sgData} from './data/sgData'

export default class EnterRoundScreen extends React.Component {
  static navigationOptions = {
    title: 'Enter Round',
  };
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder',
                    shots: ['0'],
                    noOfPutts: '',
                    puttDistance: '',
                    par3PressStatus: false,
                    par4PressStatus: true,
                    par5PressStatus: false,
                    restartHolePressStatus: false,
                    holePar: 4,
                    onGreen: false,
                    holeFinished: false,
                    hazard:0
    };

  }
  addShots(shotObj){
    var text= this.state.text
    var shots = this.state.shots

    shots.push(shotObj)
    this.setState({shots: shots})
  }
  addHazard(penalty){
    var currHazard = this.state.hazard
    var newHazard = currHazard+penalty
    this.setState(
      {
        hazard: newHazard
      }
    )
    console.log("HazardESummary",this.state.hazard)
  }
  restartHole(){
    this.setState({
      shots: ['1'],
      noOfPutts:'',
      onGreen: false,
      holeFinished: false
    })
  }
  finishHole(distance,putts){
    this.setState({
      holeFinished: true,
      noOfPutts: putts,
      puttDistance: distance
    })
  }

  setGreenStatus(bool){
    this.setState({onGreen: bool})
  }
  renderShots() {
    var rows = []
    shots=this.state.shots
    if(this.state.onGreen===false&&this.state.holeFinished===false){
      for (var i=0;i<shots.length;i++){
        rows.push(<EnterShot key= {i} finishHole={this.finishHole.bind(this)} setGreenStatus={this.setGreenStatus.bind(this)} addShots= {this.addShots.bind(this)} shotNumber= {i+1} addHazard={this.addHazard.bind(this)}/>)
      }
    }
    else{
      for (var i=0;i<shots.length-1;i++){
        rows.push(<EnterShot key= {i} finishHole={this.finishHole.bind(this)} setGreenStatus={this.setGreenStatus.bind(this)} addShots= {this.addShots.bind(this)} shotNumber= {i+1} addHazard={this.addHazard.bind(this)}/>)
      }
    }


    if (true) {
        return (
                <View>
                {rows}
                </View>
        );
    } else {
        return null;
    }
  }
  _onHideUnderlay(){
    this.setState({restartHolePressStatus: false})
  }
  _onShowUnderlay(){
    this.setState({restartHolePressStatus: true})
  }
  touchpar3Button(){
    this.setState({
      par3PressStatus: true,
      par4PressStatus: false,
      par5PressStatus: false,
      holePar: 3
    })

  }
  touchpar4Button(){
    this.setState({
      par3PressStatus: false,
      par4PressStatus: true,
      par5PressStatus: false,
      holePar: 4
    })

  }
  touchpar5Button(){
    this.setState({
      par3PressStatus: false,
      par4PressStatus: false,
      par5PressStatus: true,
      holePar: 5
    })

  }
  render() {
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    return (
      <View style={StyleSheet.absoluteFill}>
      <KeyboardAvoidingView style={StyleSheet.absoluteFill} behavior="padding" enabled>
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.baseText}>
          Hole {JSON.stringify(holeNumber)}
        </Text>
        <View style={styles.holeTypeContainer}>
          <TouchableHighlight
            activeOpacity={1}
            style={ this.state.par3PressStatus ? styles.buttonPress : styles.button }
            onPress={this.touchpar3Button.bind(this)} >
            <Text style={ this.state.par3PressStatus ? styles.welcomePress : styles.welcome }>Par 3</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            style={ this.state.par4PressStatus ? styles.buttonPress : styles.button }
            onPress={this.touchpar4Button.bind(this)} >
            <Text style={ this.state.par4PressStatus ? styles.welcomePress : styles.welcome }>Par 4</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            style={ this.state.par5PressStatus ? styles.buttonPress : styles.button }
            onPress={this.touchpar5Button.bind(this)} >
            <Text style={ this.state.par5PressStatus ? styles.welcomePress : styles.welcome }>Par 5</Text>
          </TouchableHighlight>
        </View>

        {this.renderShots()}

        {this.state.onGreen ? <Putting finishHole={this.finishHole.bind(this)} /> : null}
        {this.state.holeFinished ?  <HoleSummary navigation= {this.props.navigation} puttDistance = {this.state.puttDistance} putts={this.state.noOfPutts} shots={this.state.shots} hazard={this.state.hazard} holePar={this.state.holePar}/> : null}
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.restartHolePressStatus ? styles.button : styles.buttonPress }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
          onPress={this.restartHole.bind(this)} >
          <Text style={ this.state.restartHolePressStatus ? styles.welcome : styles.welcomePress }>Restart Hole</Text>
        </TouchableHighlight>
      </ScrollView>
      </KeyboardAvoidingView>
      </View>
    );
  }
}
class EnterShot extends Component{
  constructor(props) {
    super(props);
    this.state = { distance: '',
                    shotNumber: this.props.shotNumber,
                    lie: 'N',
                    teePressStatus: false,
                    fairwayPressStatus: false,
                    roughPressStatus: false,
                    sandPressStatus: false,
                    recoveryPressStatus: false,
                    hazard: 0,
                    hazardPressStatus: false,
                    obPressStatus:false,
                    inHolePressStatus:false,
                    onGreenPressStatus: false,
                    offGreenPressStatus: false,


    };

  }
  componentDidMount(){
    if (this.state.shotNumber ===1){
      this.setState({
        lie: 'T',
        teePressStatus: true,
        hazardPressStatus: false,
        obPressStatus:false,
        inHolePressStatus:false,
        onGreenPressStatus: false,
        offGreenPressStatus: false,
      })
    }
  }

  saveShot(){
    var shotObj= {distance: this.state.distance, lie: this.state.lie}
    this.props.addShots(shotObj)
    this.props.addHazard(this.state.hazard)
    console.log("HazardEnterShot",this.state.hazard)
  }
  touchTeeLie(){
    this.setState({
      lie: 'T',
      teePressStatus: true,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })
  }
  touchFairwayLie(){
    this.setState({
      lie: 'F',
      teePressStatus: false,
      fairwayPressStatus: true,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })

  }
  touchRoughLie(){
    this.setState({
      lie: 'R',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: true,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })

  }
  touchSandLie(){
    this.setState({
      lie: 'S',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: true,
      recoveryPressStatus: false,
    })

  }
  touchRecoveryLie(){
    this.setState({
      lie: 'RC',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: true,
    })

  }

  touchHazardPenalty(){
    this.setState({
      noPenaltyPressStatus: false,
      hazardPressStatus: true,
      obPressStatus:false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
    this.saveShot()
    this.props.addHazard(1)
    this.props.setGreenStatus(false)

  }
  touchOBPenalty(){
    this.setState({
      noPenaltyPressStatus: false,
      hazardPressStatus: false,
      obPressStatus:true,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
    this.saveShot()
    this.props.addHazard(2)
    this.props.setGreenStatus(false)
  }

  touchOnGreen(){
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: true,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
    this.saveShot()
    this.props.setGreenStatus(true)
  }
  touchOffGreen(){
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: true,
      inHolePressStatus: false,
    })
    this.saveShot()
    this.props.setGreenStatus(false)
  }
  touchinHole(){
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: true
    })
    this.saveShot()
    this.props.finishHole('0','0')
  }
  _onHideUnderlay(){
    this.setState({nextShotPressStatus: false})
  }
  _onShowUnderlay(){
    this.setState({nextShotPressStatus: true})
  }
  render(){
    return(
      <View style={styles.enterShotContainer}>
      <Text style={styles.baseText}>

        Shot {this.state.shotNumber}
      </Text>
      <Text style={styles.baseText}>

        Distance to Green (in Yards)
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(distance) => this.setState({distance})}
        value={this.state.distance}
        keyboardType='numeric'
      />
      <Text style={styles.baseText}>

        Lie
      </Text>
      <View style={styles.lieTypeContainer}>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.teePressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchTeeLie.bind(this)} >
          <Text style={ this.state.teePressStatus ? styles.welcomePress : styles.welcome }>Tee</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.fairwayPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchFairwayLie.bind(this)} >
          <Text style={ this.state.fairwayPressStatus ? styles.welcomePress : styles.welcome }>Fairway</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.roughPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchRoughLie.bind(this)} >
          <Text style={ this.state.roughPressStatus ? styles.welcomePress : styles.welcome }>Rough</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.sandPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchSandLie.bind(this)} >
          <Text style={ this.state.sandPressStatus ? styles.welcomePress : styles.welcome }>Sand</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.recoveryPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchRecoveryLie.bind(this)} >
          <Text style={ this.state.recoveryPressStatus ? styles.welcomePress : styles.welcome }>Recovery</Text>
        </TouchableHighlight>
      </View>

      <Text style={styles.baseText}>
        Result
      </Text>
      <View style={styles.resultsContainer}>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.offGreenPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchOffGreen.bind(this)} >
          <Text style={ this.state.offGreenPressStatus ? styles.welcomePress : styles.welcome }>Off Green</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.onGreenPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchOnGreen.bind(this)} >
          <Text style={ this.state.onGreenPressStatus ? styles.welcomePress : styles.welcome }>On Green</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.hazardPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchHazardPenalty.bind(this)} >
          <Text style={ this.state.hazardPressStatus ? styles.welcomePress : styles.welcome }>Hazard</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.obPressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchOBPenalty.bind(this)} >
          <Text style={ this.state.obPressStatus ? styles.welcomePress : styles.welcome }>OB</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.inHolePressStatus ? styles.buttonPress : styles.button }
          onPress={this.touchinHole.bind(this)} >
          <Text style={ this.state.inHolePressStatus ? styles.welcomePress : styles.welcome }>In Hole</Text>
        </TouchableHighlight>
      </View>

      </View>
    )
  }
}


class Putting extends Component{
  constructor(props) {
    super(props);
    this.state = { distance: '',
                    putts: '',
                    noPutts: 0,
                    score: 0,
                    strokesGained: 0


    };
  }

  onChangePutt(event){
    var value= event.nativeEvent.text
    this.setState({
      putts: value
    })


  }
  finishPutt(){
    this.props.finishHole(this.state.distance, this.state.putts)
  }
  render(){
    return(
      <View style={styles.puttingContainer}>
        <Text style={styles.baseText}>
          Putting
        </Text>
        <Text style={styles.baseText}>
          Distance on Green (in Feet)
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(distance) => this.setState({distance})}
          value={this.state.distance}
          keyboardType='numeric'
        />
        <Text style={styles.baseText}>
          Number of Putts
        </Text>
        <TextInput
          style={styles.textInput}
          onChange={this.onChangePutt.bind(this)}
          value={this.state.putts}
          keyboardType='numeric'
        />
        <View style={{marginTop: 10}}>
          <TouchableOpacity
           style={styles.buttonPress}
           onPress={this.finishPutt.bind(this)}
          >
            <Text style={styles.welcomePress}>Finish Hole</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class HoleSummary extends Component{
  constructor(props) {
    super(props);
    this.state = { distance: '',
                    puttDistance: this.props.puttDistance,
                    putts: 0,
                    shots: this.props.shots,
                    score: 0,
                    strokesGained: 0,
                    totalSG: 0,
                    sgArray: [],
                    roundSummary: [],
                    drivingDistance: 0,
                    holeSummary: []


    };
  }
  componentDidMount(){
    console.log("HAZARDPROPS", this.props.hazard)
    var holeScore = this.props.shots.length-1 + parseInt(this.props.putts) + this.props.hazard
    var holePar=this.props.holePar
    this.calculateStrokesGained(this.props.puttDistance,this.props.putts)
    this.setState({score: holeScore, putts: this.props.putts})
  }
  componentWillReceiveProps(nextProps){
    var holeScore = nextProps.shots.length-1 + parseInt(nextProps.putts)

    this.setState({score: holeScore,putts: nextProps.putts})
    this.calculateStrokesGained(nextProps.puttDistance,nextProps.putts)
  }
  calculateStrokesGained(puttDistance, putts){
    var sgArray=[]
    var shots=this.state.shots
    var puttingCode = "G"+puttDistance
    var totalSG = 0.0
    var holePar=this.props.holePar
    if(holePar==3){
      drivingDistance=0
    }
    else{
      if(shots.length==2){
        drivingDistance=shots[1].distance
      }
      else{
        drivingDistance=shots[1].distance-shots[2].distance
      }

    }
    this.setState({drivingDistance: drivingDistance})
    for(var i=1;i<shots.length;i++){
      if (i===shots.length-1){
        var shotCode = shots[i].lie + shots[i].distance
        var shotSG = (parseFloat(sgData[shotCode])-parseFloat(sgData[puttingCode])-1).toFixed(2)
        sgArray.push(shotSG)
      }
      else{
        var shotCode = shots[i].lie + shots[i].distance
        var nextShotCode = shots[i+1].lie + shots[i+1].distance
        var shotSG = (parseFloat(sgData[shotCode])-parseFloat(sgData[nextShotCode])-1).toFixed(2)

        sgArray.push(shotSG)
      }
    }
    var puttSG = (parseFloat(sgData[puttingCode]) - parseFloat(putts)).toFixed(2)
    sgArray.push(puttSG)
    for(var i =0; i<sgArray.length;i++){

      totalSG+=parseFloat(sgArray[i])
    }
    sgArray.push(totalSG.toFixed(2))
    this.setState({
      sgArray: sgArray
    })
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    const roundSummary = navigation.getParam('roundSummary', [])
    var shots = this.state.shots
    var score= shots.length-1+parseInt(putts)+this.props.hazard
    var holeSummary={
      score: score,
      par: this.props.holePar,
      shots: [],
      putts: putts,
      puttingSG: sgArray[sgArray.length-2],
      sg: sgArray[sgArray.length-1],
      drivingDistance: drivingDistance
    }
    for(var i=0;i<sgArray.length-2;i++){
      holeSummary.shots.push({
        lie: this.state.shots[i+1].lie,
        distance: this.state.shots[i+1].distance,
        sg: sgArray[i]
      })

    }



    this.setState({
      roundSummary: roundSummary,
      holeSummary: holeSummary
    })
  }

  renderStrokesGained() {

    var rows = []
    var shots = this.state.shots
    var sgArray=this.state.sgArray

    for(var i=0;i<sgArray.length-2;i++){
      rows.push(<Text key={i} style={styles.baseText}>Shot {i+1} {shots[i+1].lie}{shots[i+1].distance} SG: {sgArray[i]}</Text>)

    }

    rows.push(<Text key={"DrivingDistance"} style={styles.baseText}>Driving Distance = {this.state.drivingDistance}</Text>)
    rows.push(<Text key={"PuttingSG"} style={styles.baseText}>Putting G{this.state.puttDistance} {this.state.putts}putt SG: {sgArray[sgArray.length-2]}</Text>)
    rows.push(<Text key={"TotalSG"}style={styles.baseText}>Total SG: {sgArray[sgArray.length-1]}</Text>)


    if (true) {
        return (
                <View>
                {rows}
                </View>
        );
    } else {
        return null;
    }
  }
  nextHole(){
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    roundSummary=this.state.roundSummary
    holeSummary= this.state.holeSummary
    roundSummary.push(holeSummary)
    this.setState({
      roundSummary: roundSummary
    })
    console.log("roundSummaryNextHole", this.state.roundSummary)
    this.props.navigation.push('EnterRound',{
      holeNumber: holeNumber+1,
      roundSummary: this.state.roundSummary
    })
  }
  endRound(){
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    roundSummary=this.state.roundSummary
    holeSummary= this.state.holeSummary
    roundSummary.push(holeSummary)
    this.setState({
      roundSummary: roundSummary
    })
    console.log("roundSummaryEndRound", this.state.roundSummary)
    this.props.navigation.push('RoundDetails',{
      roundSummary: this.state.roundSummary
    })
  }
  render(){
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)

    return(
      <View style={styles.holeSummaryContainer}>
        <Text style={styles.baseText}>

          Hole Summary
        </Text>
        <Text style={styles.baseText}>

          Score: {this.state.score}
        </Text>
        {this.renderStrokesGained()}
        <TouchableOpacity
         style={styles.buttonPress}
         onPress={this.nextHole.bind(this)}
        >
          <Text style={styles.welcomePress}>Next Hole</Text>
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
           style={styles.buttonPress}
           onPress={this.endRound.bind(this) }
          >
            <Text style={styles.welcomePress}>End Round</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#33aaff',
    borderWidth: 10,
    borderRadius: 20,
    width: 200,
    borderColor: '#33aaff',
    padding: 5
  },
  buttonText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  baseText: {
    // fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000066'
  },
  welcomePress: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  button: {
    borderColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonPress: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  holeTypeContainer:{
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  lieTypeContainer:{
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  resultsContainer:{
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  textInput:{
    height: 30,
    borderColor: '#000066',
    borderWidth: 1.5
  },
  enterShotContainer:{
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderColor:'#000'
  },
  puttingContainer:{
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderColor:'#000'
  },
  holeSummaryContainer:{
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderColor:'#000'
  },
  scrollViewContainer:{
    flex: 1,
    borderWidth: 1,
    borderColor:'#000',
    padding: 10,
    paddingBottom: 100
  }
});
