import React, { Component } from 'react';
import { TextInput, Text, ScrollView, View,StyleSheet,TouchableHighlight, Button } from 'react-native';
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
    };
    console.log(isNaN(parseInt(this.state.noOfPutts)))
    console.log("shotsgained",sgData["T100"])
    console.log("props",props)
  }
  addShots(shotObj){
    var text= this.state.text
    var shots = this.state.shots

    shots.push(shotObj)
    this.setState({shots: shots})
    console.log(this.state.shots)
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
    console.log("noOfPuttsafterfinishhole",putts)
    console.log(this.state)
  }

  setGreenStatus(bool){
    console.log("setgreenstatus called")
    this.setState({onGreen: bool})
    console.log("after method",this.state.onGreen)
  }
  renderShots() {
    var rows = []
    shots=this.state.shots
    console.log(this.state.onGreen)
    console.log(shots)
    if(this.state.onGreen===false&&this.state.holeFinished===false){
      for (var i=0;i<shots.length;i++){
        rows.push(<EnterShot key= {i} finishHole={this.finishHole.bind(this)} setGreenStatus={this.setGreenStatus.bind(this)} addShots= {this.addShots.bind(this)} shotNumber= {i+1}/>)
      }
    }
    else{
      for (var i=0;i<shots.length-1;i++){
        rows.push(<EnterShot key= {i} finishHole={this.finishHole.bind(this)} setGreenStatus={this.setGreenStatus.bind(this)} addShots= {this.addShots.bind(this)} shotNumber= {i+1}/>)
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
        {this.state.holeFinished ?  <HoleSummary navigation= {this.props.navigation} puttDistance = {this.state.puttDistance} putts={this.state.noOfPutts} shots={this.state.shots}/> : null}
        <TouchableHighlight
          activeOpacity={1}
          style={ this.state.restartHolePressStatus ? styles.button : styles.buttonPress }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
          onPress={this.restartHole.bind(this)} >
          <Text style={ this.state.restartHolePressStatus ? styles.welcome : styles.welcomePress }>Restart Hole</Text>
        </TouchableHighlight>
        <Button
          title="End Round"
          onPress={() => this.props.navigation.navigate('RoundDetails',{
            
          })}
        />


      </ScrollView>
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
      hazard: 1,
      noPenaltyPressStatus: false,
      hazardPressStatus: true,
      obPressStatus:false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
    this.props.setGreenStatus(false)

  }
  touchOBPenalty(){
    this.setState({
      hazard: 2,
      noPenaltyPressStatus: false,
      hazardPressStatus: false,
      obPressStatus:true,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
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
    console.log("textvalue", parseInt(value))
    this.setState({
      putts: value
    })
    this.props.finishHole(this.state.distance, value)

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
        />
        <Text style={styles.baseText}>
          Number of Putts
        </Text>
        <TextInput
          style={styles.textInput}
          onChange={this.onChangePutt.bind(this)}
          value={this.state.putts}


        />
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
                    roundSummary: []


    };
  }
  componentDidMount(){
    var holeScore = this.props.shots.length-1 + parseInt(this.props.putts)
    console.log(this.props.shots.length)
    console.log(this.props.putts)

    console.log(holeScore)
    this.setState({score: holeScore, putts: this.props.putts})
    this.calculateStrokesGained(this.props.puttDistance,this.props.putts)
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
    console.log("puttCode",puttingCode)
    console.log("noPutts",putts)
    sgArray.push(puttSG)
    for(var i =0; i<sgArray.length;i++){
      console.log("sg",sgArray[i])
      totalSG+=parseFloat(sgArray[i])
    }
    sgArray.push(totalSG.toFixed(2))
    this.setState({
      sgArray: sgArray
    })
    console.log("sgArray",sgArray)
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    const roundSummary = navigation.getParam('roundSummary', [])
    var shots = this.state.shots
    var score= shots.length-1+parseInt(putts)
    var holeSummary={
      score: score,
      shots: [],
      putts: putts,
      puttingSG: sgArray[sgArray.length-2],
      sg: sgArray[sgArray.length-1]
    }
    for(var i=0;i<sgArray.length-2;i++){
      holeSummary.shots.push({
        lie: this.state.shots[i+1].lie,
        distance: this.state.shots[i+1].distance,
        sg: sgArray[i]
      })
      
    }

    console.log("holeSummary",holeSummary)
    roundSummary.push(holeSummary)
    console.log("roundSUmmary",roundSummary) 
    this.setState({
      roundSummary: roundSummary
    })
  }

  renderStrokesGained() {
    var rows = []
    var shots = this.state.shots
    var sgArray=this.state.sgArray

    for(var i=0;i<sgArray.length-2;i++){
      rows.push(<Text key={i} style={styles.baseText}>Shot {i+1} {shots[i+1].lie}{shots[i+1].distance} SG: {sgArray[i]}</Text>)
      
    }


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
        <Button
          title="Next Hole"
          onPress={() => this.props.navigation.push('EnterRound',{
            holeNumber: holeNumber+1,
            roundSummary: this.state.roundSummary
          })}
        />
        <Button
          title="End Round"
          onPress={() => this.props.navigation.push('RoundDetails',{
            roundSummary: this.state.roundSummary
          })}
        />
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
    padding: 10
  }
});
