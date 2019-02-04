import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Icon,
  List
} from 'native-base';

import styles from '../../config/styles';
import EnterShot from './EnterShot';
import Putting from './Putting';
import HoleSummary from './HoleSummary';
import colors from '../../config/colors';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

const { width, height } = Dimensions.get("window");
class EnterRoundScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
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
      hazard: 0,
      isModalVisible: false,
      // holeNumber: props.holeNumber != null ? props.holeNumber : 1,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    return true;
  }

  addShots(shotObj) {
    var text = this.state.text
    var shots = this.state.shots

    shots.push(shotObj)
    this.setState({ shots: shots })
  }

  addHazard(penalty) {
    var currHazard = this.state.hazard
    var newHazard = currHazard + penalty
    this.setState(
      {
        hazard: newHazard
      }
    )
    console.log("HazardESummary", this.state.hazard)
  }

  restartHole() {
    this.setState({
      shots: ['1'],
      noOfPutts: '',
      onGreen: false,
      holeFinished: false,
      hazard: 0
    })
  }

  finishHole(distance, putts) {
    this.setState({
      holeFinished: true,
      noOfPutts: putts,
      puttDistance: distance
    })
  }

  setGreenStatus(bool) {
    this.setState({ onGreen: bool })
  }

  renderShots() {
    var rows = []
    shots = this.state.shots
    if (this.state.onGreen === false && this.state.holeFinished === false) {
      for (var i = 0; i < shots.length; i++) {
        rows.push(
          <EnterShot
            key={i}
            finishHole={this.finishHole.bind(this)}
            setGreenStatus={this.setGreenStatus.bind(this)}
            addShots={this.addShots.bind(this)}
            shotNumber={i + 1}
            addHazard={this.addHazard.bind(this)}
          />
        )
      }
    }
    else {
      for (var i = 0; i < shots.length - 1; i++) {
        rows.push(
          <EnterShot
            key={i}
            finishHole={this.finishHole.bind(this)}
            setGreenStatus={this.setGreenStatus.bind(this)}
            addShots={this.addShots.bind(this)}
            shotNumber={i + 1}
            addHazard={this.addHazard.bind(this)}
          />
        )
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

  _onHideUnderlay() {
    this.setState({ restartHolePressStatus: false })
  }

  _onShowUnderlay() {
    this.setState({ restartHolePressStatus: true })
  }

  touchpar3Button() {
    this.setState({
      par3PressStatus: true,
      par4PressStatus: false,
      par5PressStatus: false,
      holePar: 3
    })
  }

  touchpar4Button() {
    this.setState({
      par3PressStatus: false,
      par4PressStatus: true,
      par5PressStatus: false,
      holePar: 4
    })
  }

  touchpar5Button() {
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
      <StyleProvider style={getTheme(material)}>
        <Container style={{ backgroundColor: colors.lightGrey2 }}>
          <View style={[styles.headerContainerCustom, { height: 150 }]}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
              >
                <Image
                  resizeMode='contain'
                  source={ImageUrl.backImg}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 10, marginTop: 20 }}>
                <Text style={styles.textHeaderER}>Enter a</Text>
                <Text style={styles.textBoldHeaderER}>new round</Text>
              </View>
            </View>
            <View>
              <Image
                resizeMode='contain'
                source={ImageUrl.golferImg}
                style={{ width: 100, height: 150 }}
              />
            </View>
          </View>
          <Content >
            <View style={styles.scrollViewContainer}>
              <View style={{ marginLeft: 10, marginBottom: 20 }}>
                <Text style={styles.textTitleBase}>
                  Hole {JSON.stringify(holeNumber)}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row' }}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.buttonSmall, {
                    backgroundColor: this.state.par3PressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
                  }]}
                  onPress={this.touchpar3Button.bind(this)} >
                  <Text style={[styles.textSubBoxES, {
                    color: this.state.par3PressStatus ? colors.white : colors.darkGrey
                  }]}
                  >
                    Par 3
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.buttonSmall, {
                    backgroundColor: this.state.par4PressStatus ? colors.primary : colors.darkGrey3, marginRight: 10
                  }]}
                  onPress={this.touchpar4Button.bind(this)} >
                  <Text style={[styles.textSubBoxES, {
                    color: this.state.par4PressStatus ? colors.white : colors.darkGrey
                  }]}
                  >
                    Par 4
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.buttonSmall, {
                    backgroundColor: this.state.par5PressStatus ? colors.primary : colors.darkGrey3
                  }]}
                  onPress={this.touchpar5Button.bind(this)} >
                  <Text style={[styles.textSubBoxES, {
                    color: this.state.par5PressStatus ? colors.white : colors.darkGrey
                  }]}
                  >
                    Par 5
                  </Text>
                </TouchableOpacity>
              </View>

              {this.renderShots()}

              {this.state.onGreen ? <Putting finishHole={this.finishHole.bind(this)} /> : null}
              {this.state.holeFinished ?
                <HoleSummary
                  navigation={this.props.navigation}
                  puttDistance={this.state.puttDistance}
                  putts={this.state.noOfPutts}
                  shots={this.state.shots}
                  hazard={this.state.hazard}
                  holePar={this.state.holePar}
                />
                :
                null
              }
              <TouchableOpacity
                style={[styles.baseLongButton,
                  // {backgroundColor: this.state.restartHolePressStatus ? colors.primary : colors.black}
                ]}
                // onHideUnderlay={this._onHideUnderlay.bind(this)}
                // onShowUnderlay={this._onShowUnderlay.bind(this)}
                onPress={this.restartHole.bind(this)} >
                <Text style={[styles.redText,
                  // { color: this.state.restartHolePressStatus ? colors.primary : colors.white}
                ]}
                >
                  Do you want to restart hole?
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}


export default EnterRoundScreen;
