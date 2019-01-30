import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView,
  Dimensions,
  Modal
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Input
} from 'native-base';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import moment from 'moment';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

var { width, height } = Dimensions.get("window");
class RoundSummaryScreen extends React.Component {
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
      roundDate: '',
      isModalVisible: false,
      refreshing: false,

    };
  }

  componentDidMount() {
    this.calculateDrivingDistance()
    this.calculateDrivingStrokesGained()
    this.calculateChippingStrokesGained()
    this.calculateApproachStrokesGained()
    this.calculateWedgeStrokesGained()
    this.calculatePuttsCountSGTotalSG()
    this.calculateGIR()
    this.calculateFairways()
    var date = moment().format("MMM Do YYYY")
    this.setState({
      roundDate: date
    })
  }

  calculateGIR() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var gir = 0
    for (var i = 0; i < roundSummary.length; i++) {
      if (roundSummary[i].par == 3 && roundSummary[i].shots.length == 1) {
        gir += 1
      }
      else if (roundSummary[i].par == 4 && roundSummary[i].shots.length <= 2) {
        gir += 1
      }
      else if (roundSummary[i].par == 5 && roundSummary[i].shots.length <= 3) {
        gir += 1
      }
    }
    this.setState({ gir: gir })
  }

  calculateFairways() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var fairways = 0
    for (var i = 0; i < roundSummary.length; i++) {
      if (roundSummary[i].par == 4 && roundSummary[i].shots.length == 1) {
        fairways += 1
      }
      else if (roundSummary[i].par == 4 && roundSummary[i].shots[1].lie == "F") {
        fairways += 1
      }
      else if (roundSummary[i].par == 5 && roundSummary[i].shots[1].lie == "F") {
        fairways += 1
      }
    }
    this.setState({ fairways: fairways })
  }

  calculatePuttsCountSGTotalSG() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var totalPutts = 0
    var totalPuttingSG = 0
    var totalSG = 0
    for (var i = 0; i < roundSummary.length; i++) {
      totalPutts += parseInt(roundSummary[i].putts)
      totalPuttingSG += parseFloat(roundSummary[i].puttingSG)
      totalSG += parseFloat(roundSummary[i].sg)
    }
    totalPuttingSG = totalPuttingSG.toFixed(2)
    totalSG = totalSG.toFixed(2)
    this.setState({
      totalPutts: totalPutts,
      totalPuttingSG: totalPuttingSG,
      totalSG: totalSG
    })
  }

  calculateDrivingStrokesGained() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var drivingSG = 0
    for (var i = 0; i < roundSummary.length; i++) {
      if (roundSummary[i].par == 3) {

      }
      else {
        drivingSG = drivingSG + parseFloat(roundSummary[i].shots[0].sg)
      }
    }
    drivingSG = drivingSG.toFixed(2)
    this.setState({
      drivingSG: drivingSG
    })
  }

  calculateWedgeStrokesGained() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var wedgeSG = 0
    for (var i = 0; i < roundSummary.length; i++) {

      for (var j = 0; j < roundSummary[i].shots.length; j++) {
        if (roundSummary[i].shots[j].distance <= 125 && roundSummary[i].shots[j].distance > 50 && roundSummary[i].shots[j].lie != "S" && roundSummary[i].shots[j].lie != "RC") {
          wedgeSG += parseFloat(roundSummary[i].shots[j].sg)
        }
      }
    }
    wedgeSG = wedgeSG.toFixed(2)
    this.setState({
      wedgeSG: wedgeSG
    })
  }

  calculateChippingStrokesGained() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var chippingSG = 0
    for (var i = 0; i < roundSummary.length; i++) {

      for (var j = 0; j < roundSummary[i].shots.length; j++) {
        if (roundSummary[i].shots[j].distance <= 50 && roundSummary[i].shots[j].lie != "S" && roundSummary[i].shots[j].lie != "RC") {
          chippingSG += parseFloat(roundSummary[i].shots[j].sg)
        }
      }
    }
    chippingSG = chippingSG.toFixed(2)
    this.setState({
      chippingSG: chippingSG
    })
  }

  calculateApproachStrokesGained() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var approachSG = 0
    for (var i = 0; i < roundSummary.length; i++) {
      if (roundSummary[i].par == 3) {
        approachSG += parseFloat(roundSummary[i].shots[0].sg)
      }
      else {
        for (var j = 1; j < roundSummary[i].shots.length; j++) {
          if (roundSummary[i].shots[j].distance > 50) {
            approachSG += parseFloat(roundSummary[i].shots[j].sg)
          }
        }
      }

    }
    approachSG = approachSG.toFixed(2)
    this.setState({
      approachSG: approachSG
    })
  }

  calculateDrivingDistance() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var totalDrivingDistance = 0
    var averageDrivingDistance = 0
    var count = 0
    for (var i = 0; i < roundSummary.length; i++) {
      if (roundSummary[i].par == 3) {
      }
      else {
        count += 1
        totalDrivingDistance += parseInt(roundSummary[i].drivingDistance)
      }
    }
    averageDrivingDistance = totalDrivingDistance / count
    averageDrivingDistance = averageDrivingDistance.toFixed(2)
    this.setState({
      drivingDistance: averageDrivingDistance
    })
  }

  saveAPI() {
    // this.props.navigation.navigate('EnterRound')
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    console.log("saveRoundPressed")
    that = this
    // if (this.state.refreshing == false) {
    //   this.setState({ refreshing: true, isModalVisible: false });
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
        // this.setState({ refreshing: false });
        that.props.navigation.navigate('Home')
      })
      .catch(function (error) {
        // this.setState({ refreshing: false });
        console.log(error);
      });
    // }
  }

  saveRound() {
    this.setState({ isModalVisible: true })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  onChangeCourseName(event) {
    var value = event.nativeEvent.text
    this.setState({
      courseName: value
    })
  }

  render() {
    const { navigation } = this.props;
    const roundSummary = navigation.getParam('roundSummary', [])
    var rows = []
    rows.push(
      <View>
        {roundSummary.map((data, i) => {
          return (
            <View key={i} style={[styles.cardRS,
              // {height: data.shots != null && data.shots.length > 1 ? 170+(data.shots.length*40) : 210}
            ]}>
              <Text style={styles.textTitleCard}>Hole {i + 1}</Text>
              {data.shots.map((dataShot, j) => {
                return (
                  <View key={j} style={{ height: 40, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                      <Text style={styles.baseBoldTextRS}>Shot {j + 1}</Text>
                      <Text style={styles.baseTextRS}>{dataShot.distance}{dataShot.lie} SG : {dataShot.sg}</Text>
                    </View>
                    <View style={{ borderBottomColor: colors.lightGrey1, borderBottomWidth: 1 }} />
                  </View>
                )
              })}
              <Text style={styles.baseTextRS}>Score : {data.score}</Text>
              <Text style={styles.baseTextRS}>Putts : {data.putts}</Text>
              <Text style={styles.baseTextRS}>Putting SG : {data.puttingSG}</Text>
              <Text style={styles.baseBoldTextRS}>TotalSG : {data.sg}</Text>
            </View>
          )
        })}

        <View style={styles.cardSummary}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textTitleCard}>Round Summary</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Driving Distance : </Text>
            <Text style={styles.baseTextRS}>{this.state.drivingDistance}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>No of Putts : </Text>
            <Text style={styles.baseTextRS}>{this.state.totalPutts}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>GIR : </Text>
            <Text style={styles.baseTextRS}>{this.state.gir}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Fairways : </Text>
            <Text style={styles.baseTextRS}>{this.state.fairways}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Approach SG : </Text>
            <Text style={styles.baseTextRS}>{this.state.approachSG}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Wedge SG : </Text>
            <Text style={styles.baseTextRS}>{this.state.wedgeSG}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Chipping SG : </Text>
            <Text style={[styles.baseTextRS, { color: colors.black }]}>{this.state.chippingSG}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Putting SG : </Text>
            <Text style={styles.baseTextRS}>{this.state.totalPuttingSG}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.baseBoldTextRS}>Total SG : </Text>
            <Text style={styles.baseTextRS}>{this.state.totalSG}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.longButton}
            onPress={this.saveRound.bind(this)}
          >
            <Text style={styles.textLongButton}>Save Round</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    console.log(this.props)

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ overflow: "hidden" }}>
          <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
            <View style={styles.containerBoxHeader}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    resizeMode='contain'
                    source={ImageUrl.backImg}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.containerSubHeader}>
                <View style={styles.contentSubHeader}>
                  <Text style={styles.textTitleHistoryBold}>Round Summary</Text>
                </View>
              </View>
              <Content style={styles.contentBoxRS}>
                <ScrollView>
                  {rows}
                </ScrollView>
              </Content>
            </View>
          </SafeAreaView>
          <Modal
            style={styles.containerFullModal}
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => this.onCloseModal()}
          >
            <Image source={ImageUrl.bgImg} style={styles.bgHome} />
            <TouchableOpacity style={styles.containerBackImage}
              onPress={() => this.onCloseModal()}
            >
              <Image
                resizeMode='contain'
                source={ImageUrl.closeImg}
                style={styles.iconBack}
              />
            </TouchableOpacity>
            <View style={styles.containerBoxContentModal}>
              <View style={{ marginBottom: 20 }}>
                <Text style={[styles.baseText, { color: colors.black, textAlign: 'center' }]}>
                  {this.state.roundDate}
                </Text>
                <Text style={styles.textTitleModalBold}>Course Name</Text>
              </View>
              <View style={styles.boxInputName}>
                <Input
                  style={{ paddingLeft: 20 }}
                  placeholder='Enter course name'
                  placeholderTextColor={colors.darkGrey4}
                  onChange={this.onChangeCourseName.bind(this)}
                  value={this.state.courseName}
                />
              </View>

              <TouchableOpacity
                style={styles.longSaveButton}
                onPress={this.saveAPI.bind(this)}
              >
                <Text style={styles.textLongButton}>Save Round</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerImageModalRS}>
              <Image
                resizeMode='contain'
                source={ImageUrl.golferGirlImg}
                style={styles.imageModalGolfer}
              />
            </View>
          </Modal>
          {/* {this.state.refreshing == true && <View style={{  }}>
            <Progress.Circle
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1
              }}
              indeterminate={this.state.refreshing}
              direction="counter-clockwise"
              color={'#CAA308'}
            />
          </View>} */}
        </Container>
      </StyleProvider>
    );
  }

  onCloseModal() {
    this.setState({ isModalVisible: false })
  }
}

export default RoundSummaryScreen;
