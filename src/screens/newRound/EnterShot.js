import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {
  Text,
  Input,
} from 'native-base';

import styles from '../../config/styles';
import colors from '../../config/colors';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

class EnterShot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      shotNumber: this.props.shotNumber,
      lie: 'N',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: false,
      hazard: 0,
      shotHazard: 0,
      hazardPressStatus: false,
      obPressStatus: false,
      inHolePressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
    };
  }

  componentDidMount() {
    if (this.state.shotNumber === 1) {
      this.setState({
        lie: 'T',
        teePressStatus: true,
        hazardPressStatus: false,
        obPressStatus: false,
        inHolePressStatus: false,
        onGreenPressStatus: false,
        offGreenPressStatus: false,
      })
    }
  }

  saveShot(hazard) {
    var shotObj = { distance: this.state.distance, lie: this.state.lie, hazard: hazard }
    console.log("shotobj", shotObj)
    this.props.addShots(shotObj)
    this.props.addHazard(this.state.hazard)
  }

  touchTeeLie() {
    this.setState({
      lie: 'T',
      teePressStatus: true,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })
  }

  touchFairwayLie() {
    this.setState({
      lie: 'F',
      teePressStatus: false,
      fairwayPressStatus: true,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })
  }

  touchRoughLie() {
    this.setState({
      lie: 'R',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: true,
      sandPressStatus: false,
      recoveryPressStatus: false,
    })
  }

  touchSandLie() {
    this.setState({
      lie: 'S',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: true,
      recoveryPressStatus: false,
    })
  }

  touchRecoveryLie() {
    this.setState({
      lie: 'RC',
      teePressStatus: false,
      fairwayPressStatus: false,
      roughPressStatus: false,
      sandPressStatus: false,
      recoveryPressStatus: true,
    })
  }

  touchHazardPenalty() {
    this.setState({
      noPenaltyPressStatus: false,
      hazardPressStatus: true,
      obPressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
      shotHazard: 1
    })
    this.saveShot(1)
    this.props.addHazard(1)
    this.props.setGreenStatus(false)
  }

  touchOBPenalty() {
    this.setState({
      noPenaltyPressStatus: false,
      hazardPressStatus: false,
      obPressStatus: true,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: false,
      shotHazard: 2
    })
    this.saveShot(2)
    this.props.addHazard(2)
    this.props.setGreenStatus(false)
  }

  touchOnGreen() {
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: true,
      offGreenPressStatus: false,
      inHolePressStatus: false,
    })
    this.saveShot(0)
    this.props.setGreenStatus(true)
  }

  touchOffGreen() {
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: true,
      inHolePressStatus: false,
    })
    this.saveShot(0)
    this.props.setGreenStatus(false)
  }

  touchinHole() {
    this.setState({
      hazardPressStatus: false,
      obPressStatus: false,
      onGreenPressStatus: false,
      offGreenPressStatus: false,
      inHolePressStatus: true
    })
    this.saveShot(0)
    this.props.finishHole('0', '0')
  }

  _onHideUnderlay() {
    this.setState({ nextShotPressStatus: false })
  }

  _onShowUnderlay() {
    this.setState({ nextShotPressStatus: true })
  }

  render() {
    return (
      <View style={styles.enterShotContainer}>
        <Text style={styles.textTitleBase}>
          Shot {this.state.shotNumber}
        </Text>
        <Text style={styles.baseText}>
          Distance to Green (in Yards)
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Input
            style={styles.textInput}
            onChangeText={(distance) => this.setState({ distance })}
            value={this.state.distance}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text style={styles.textTitleBase}>
            Lie
          </Text>
        </View>
        <View style={styles.lieTypeContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmallCustom, {
              backgroundColor: this.state.teePressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
            }]}
            onPress={this.touchTeeLie.bind(this)} >
            <View style={styles.contentButtonSmallES}>
              <Image
                resizeMode='contain'
                source={this.state.teePressStatus ? ImageUrl.teeYellowImg : ImageUrl.teeGreyImg}
                style={styles.iconLieES}
              />
              <Text style={[styles.textSubBoxCustomES, { color: this.state.teePressStatus ? colors.white : colors.darkGrey }]}>
                Tee
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmallCustom, {
              backgroundColor: this.state.fairwayPressStatus ? colors.primary : colors.darkGrey3, marginRight: 9.8
            }]}
            onPress={this.touchFairwayLie.bind(this)} >
            <View style={styles.contentButtonSmallES}>
              <Image
                resizeMode='contain'
                source={this.state.fairwayPressStatus ? ImageUrl.fairwayYellowImg : ImageUrl.fairwayGreyImg}
                style={styles.iconLieES}
              />
              <Text style={[styles.textSubBoxCustomES, { color: this.state.fairwayPressStatus ? colors.white : colors.darkGrey }]}>
                Fairway
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmallCustom, {
              backgroundColor: this.state.roughPressStatus ? colors.primary : colors.darkGrey3
            }]}
            onPress={this.touchRoughLie.bind(this)} >
            <View style={styles.contentButtonSmallES}>
              <Image
                resizeMode='contain'
                source={this.state.roughPressStatus ? ImageUrl.roughYellowImg : ImageUrl.roughGreyImg}
                style={styles.iconLieES}
              />
              <Text style={[styles.textSubBoxCustomES, { color: this.state.roughPressStatus ? colors.white : colors.darkGrey }]}>
                Rough
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmallCustom, {
              backgroundColor: this.state.sandPressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
            }]}
            onPress={this.touchSandLie.bind(this)} >
            <View style={styles.contentButtonSmallES}>
              <Image
                resizeMode='contain'
                source={this.state.sandPressStatus ? ImageUrl.sandYellowImg : ImageUrl.sandGreyImg}
                style={styles.iconLieES}
              />
              <Text style={[styles.textSubBoxCustomES, { color: this.state.sandPressStatus ? colors.white : colors.darkGrey }]}>
                Sand
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmallCustom, {
              backgroundColor: this.state.recoveryPressStatus ? colors.primary : colors.darkGrey3
            }]}
            onPress={this.touchRecoveryLie.bind(this)} >
            <View style={styles.contentButtonSmallES}>
              <Image
                resizeMode='contain'
                source={this.state.recoveryPressStatus ? ImageUrl.recoveryYellowImg : ImageUrl.recoveryGreyImg}
                style={styles.iconLieES}
              />
              <Text style={[styles.textSubBoxCustomES, { color: this.state.recoveryPressStatus ? colors.white : colors.darkGrey }]}>
                Recovery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.textTitleBase}>
            Result
          </Text>
        </View>
        <View style={styles.resultsContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmall, {
              backgroundColor: this.state.offGreenPressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
            }]}
            onPress={this.touchOffGreen.bind(this)} >
            <Text style={[styles.textSubBoxES, { color: this.state.offGreenPressStatus ? colors.white : colors.darkGrey }]}>Off Green</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmall, {
              backgroundColor: this.state.onGreenPressStatus ? colors.primary : colors.darkGrey3, marginRight: 9.8
            }]}
            onPress={this.touchOnGreen.bind(this)} >
            <Text style={[styles.textSubBoxES, { color: this.state.onGreenPressStatus ? colors.white : colors.darkGrey }]}>On Green</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmall, {
              backgroundColor: this.state.hazardPressStatus ? colors.primary : colors.darkGrey3
            }]}
            onPress={this.touchHazardPenalty.bind(this)} >
            <Text style={[styles.textSubBoxES, { color: this.state.hazardPressStatus ? colors.white : colors.darkGrey }]}>Hazard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmall, {
              backgroundColor: this.state.obPressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
            }]}
            onPress={this.touchOBPenalty.bind(this)} >
            <Text style={[styles.textSubBoxES, { color: this.state.obPressStatus ? colors.white : colors.darkGrey }]}>OB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.subButtonSmall, {
              backgroundColor: this.state.inHolePressStatus ? colors.primary : colors.darkGrey3
            }]}
            onPress={this.touchinHole.bind(this)} >
            <Text style={[styles.textSubBoxES, { color: this.state.inHolePressStatus ? colors.white : colors.darkGrey }]}>In Hole</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default EnterShot;
