import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { sgData } from '../../data/sgData';
import styles from '../../config/styles';
import colors from '../../config/colors';

class HoleSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      puttDistance: this.props.puttDistance,
      putts: 0,
      shots: this.props.shots,
      score: 0,
      strokesGained: 0,
      totalSG: 0,
      sgArray: [],
      roundSummary: [],
      drivingDistance: 0,
      holeSummary: [],
      isModalVisible: false,
      courseName: ''
    };
  }

  componentDidMount() {
    console.log("HAZARDPROPS", this.props.hazard)
    var holeScore = this.props.shots.length - 1 + parseInt(this.props.putts) + this.props.hazard
    var holePar = this.props.holePar
    this.calculateStrokesGained(this.props.puttDistance, this.props.putts)
    this.setState({ score: holeScore, putts: this.props.putts })
  }

  componentWillReceiveProps(nextProps) {
    var holeScore = nextProps.shots.length - 1 + parseInt(nextProps.putts)

    this.setState({ score: holeScore, putts: nextProps.putts })
    this.calculateStrokesGained(nextProps.puttDistance, nextProps.putts)
  }

  calculateStrokesGained(puttDistance, putts) {
    var sgArray = []
    var shots = this.state.shots
    var puttingCode = "G" + puttDistance
    var totalSG = 0.0
    var holePar = this.props.holePar
    console.log("shots", shots)
    if (holePar == 3) {
      drivingDistance = 0
    }
    else {
      if (shots.length == 2) {
        drivingDistance = shots[1].distance
      }
      else {
        drivingDistance = shots[1].distance - shots[2].distance
      }

    }
    this.setState({ drivingDistance: drivingDistance })
    for (var i = 1; i < shots.length; i++) {
      if (i === shots.length - 1) {
        console.log("individual shot hazard", shots[i].hazard)
        var shotCode = shots[i].lie + shots[i].distance
        var shotSG = (parseFloat(sgData[shotCode]) - parseFloat(sgData[puttingCode]) - 1)

        shotSG = shotSG.toFixed(2)
        shotSG = parseFloat(shotSG) - shots[i].hazard

        sgArray.push(shotSG)
      }
      else {

        var shotCode = shots[i].lie + shots[i].distance
        var nextShotCode = shots[i + 1].lie + shots[i + 1].distance
        var shotSG = (parseFloat(sgData[shotCode]) - parseFloat(sgData[nextShotCode]) - 1)

        shotSG = shotSG.toFixed(2)
        shotSG = parseFloat(shotSG) - shots[i].hazard

        sgArray.push(shotSG)
      }
    }
    var puttSG = (parseFloat(sgData[puttingCode]) - parseFloat(putts)).toFixed(2)
    sgArray.push(puttSG)
    for (var i = 0; i < sgArray.length; i++) {
      totalSG += parseFloat(sgArray[i])
    }
    sgArray.push(totalSG.toFixed(2))
    this.setState({
      sgArray: sgArray
    })
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    const roundSummary = navigation.getParam('roundSummary', [])
    var shots = this.state.shots
    var score = shots.length - 1 + parseInt(putts) + this.props.hazard
    var holeSummary = {
      score: score,
      par: this.props.holePar,
      shots: [],
      putts: (isNaN(putts) ? 0 : putts),
      puttingSG: (isNaN(sgArray[sgArray.length - 2]) ? 0 : sgArray[sgArray.length - 2]),
      sg: (isNaN(sgArray[sgArray.length - 1]) ? 0 : sgArray[sgArray.length - 1]),
      drivingDistance: (isNaN(drivingDistance) ? 0 : drivingDistance)
    }
    for (var i = 0; i < sgArray.length - 2; i++) {
      holeSummary.shots.push({
        lie: this.state.shots[i + 1].lie,
        distance: (isNaN(this.state.shots[i + 1].distance) ? 0 : this.state.shots[i + 1].distance),
        sg: (isNaN(sgArray[i]) ? 0 : sgArray[i])
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
    var sgArray = this.state.sgArray

    for (var i = 0; i < sgArray.length - 2; i++) {
      rows.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          <Text style={[styles.baseBoldText, { color: colors.black }]}>Shot {i + 1} {shots[i + 1].lie}{shots[i + 1].distance} SG: </Text>
          <Text style={[styles.baseText, { color: colors.black }]}>{sgArray[i]}</Text>
        </View>
      )
    }

    rows.push(
      <View key={"DrivingDistance"} style={{ flexDirection: 'row' }}>
        <Text style={[styles.baseBoldText, { color: colors.black }]}>Driving Distance :  </Text>
        <Text style={[styles.baseText, { color: colors.black }]}>{this.state.drivingDistance}</Text>
      </View>
    )
    rows.push(
      <View key={"PuttingSG"} style={{ flexDirection: 'row' }}>
        <Text style={[styles.baseBoldText, { color: colors.black }]}>Putting G{this.state.puttDistance} {this.state.putts}putt SG : </Text>
        <Text style={[styles.baseText, { color: colors.black }]}>{sgArray[sgArray.length - 2]}</Text>
      </View>
    )
    rows.push(
      <View key={"TotalSG"} style={{ flexDirection: 'row' }}>
        <Text style={[styles.baseBoldText, { color: colors.black }]}>Total SG : </Text>
        <Text style={[styles.baseBoldText, { color: colors.black }]}>{sgArray[sgArray.length - 1]}</Text>
      </View>
    )

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

  nextHole() {
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    roundSummary = this.state.roundSummary
    holeSummary = this.state.holeSummary

    if ((holeNumber - 1) == roundSummary.length) {
      roundSummary.push(holeSummary)
      this.setState({
        roundSummary: roundSummary
      })
    }

    console.log("roundSummaryNextHole", this.state.roundSummary)
    this.props.navigation.push('EnterRound', {
      holeNumber: holeNumber + 1,
      roundSummary: this.state.roundSummary
    })
  }

  async endRound() {
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)
    roundSummary = this.state.roundSummary
    holeSummary = this.state.holeSummary

    roundSummaryNew = []

    if (roundSummary.length == (holeNumber - 1)) {
      roundSummary.push(holeSummary)
      this.setState({
        roundSummary: roundSummary
      })
    }
    else if(roundSummary.length > holeNumber){
      for(let i=0; i<holeNumber; i++){
        roundSummaryNew.push(roundSummary[i])
      }

      await this.setState({roundSummary: roundSummaryNew})
    }

    this.props.navigation.push('RoundDetails', {
      roundSummary: this.state.roundSummary
    })
  }

  render() {
    const { navigation } = this.props;
    const holeNumber = navigation.getParam('holeNumber', 1)

    return (
      <View>
        <View style={styles.holeSummaryContainer}>
          <Text style={[styles.textTitleBase, { color: colors.black }]}>
            Hole Summary
        </Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={[styles.baseBoldText, { color: colors.black }]}>Score : </Text>
            <Text style={[styles.baseText, { color: colors.black }]}>
              {this.state.score}
            </Text>
          </View>
          {this.renderStrokesGained()}
        </View>
        <TouchableOpacity
          style={styles.longButton}
          onPress={this.nextHole.bind(this)}
        >
          <Text style={styles.textLongButton}>Next Hole</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.longButton}
            onPress={this.endRound.bind(this)}
          >
            <Text style={styles.textLongButton}>End Round</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default HoleSummary;
