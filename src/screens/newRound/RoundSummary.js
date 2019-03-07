import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Image,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Input
} from 'native-base';
import {
  NavigationActions,
  StackActions,
} from 'react-navigation';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import moment from 'moment';
import ModalWrapper from 'react-native-modal-wrapper';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Networking from '../../api/Networking';

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
      visibleLoading: false,
      visibleSave: false,
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
      else if (roundSummary[i].par == 5 && (roundSummary[i].shots[1] != null && roundSummary[i].shots[1].lie != null && roundSummary[i].shots[1].lie == "F")) {
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
        var drivingSGNew = roundSummary[i].shots[0].sg != null || roundSummary[i].shots[0].sg != NaN ? roundSummary[i].shots[0].sg : 0
        drivingSG = drivingSG + parseFloat(roundSummary[i].shots[0].sg)
      }
    }
    drivingSG = drivingSG.toFixed(2)
    this.setState({
      drivingSG: parseFloat(drivingSG)
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

  valueChecker() {
    if (this.state.courseName != '') {
      return true
    }
    else {
      if (this.state.courseName == '') {
        Alert.alert('Error', 'Please fill course name field', [{ text: 'Ok' }])
        return false
      }
      else {
        Alert.alert('Error', 'Please fill empty value', [{ text: 'Ok' }])
        return false
      }
    }
  }

  async saveAPI() {
    if (this.valueChecker() == true && this.state.visibleLoading == false) {
      this.setState({ isModalVisible: false, visibleLoading: true });

      const dataSend = {
        drivingDistance: (isNaN(this.state.drivingDistance) ? 0 : this.state.drivingDistance),
        totalPutts: (isNaN(this.state.totalPutts) ? 0 : this.state.totalPutts),
        gir: (isNaN(this.state.gir) ? 0 : this.state.gir),
        fairways: (isNaN(this.state.fairways) ? 0 : this.state.fairways),
        drivingSG: (isNaN(this.state.drivingSG) ? 0 : this.state.drivingSG),
        approachSG: (isNaN(this.state.approachSG) ? 0 : this.state.approachSG),
        wedgeSG: (isNaN(this.state.wedgeSG) ? 0 : this.state.wedgeSG),
        chippingSG: (isNaN(this.state.chippingSG) ? 0 : this.state.chippingSG),
        totalPuttingSG: (isNaN(this.state.totalPuttingSG) ? 0 : this.state.totalPuttingSG),
        totalSG: (isNaN(this.state.totalSG) ? 0 : this.state.totalSG),
        roundSummary: roundSummary,
        courseName: this.state.courseName,
      }

      console.log('data send to server in round summary, ' + JSON.stringify(dataSend))

      const response = await Networking.sendRound(dataSend)
      if (response == 'dataSend') {
        console.log('success send first, ' + JSON.stringify(response))
        this.setState({
          refreshing: false,
          isLoading: false,
          visibleLoading: false,
          visibleSave: true
        });
      } else {
        console.log('success send two, ' + JSON.stringify(response))
        this.setState({
          refreshing: false,
          isLoading: false,
          visibleLoading: false
        });
      }
    }
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
            <View key={i} style={styles.cardRS}>
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
              <Text style={styles.baseTextRS}>Putting Distance : {data.distancePutt}</Text>
              <Text style={styles.baseBoldTextRS}>TotalSG : {data.sg}</Text>
            </View>
          )
        })}
      </View>
    )

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
              <View style={{ height: 320, backgroundColor: colors.primary, marginBottom: 40 }}>
                <View style={{ width: width - 60, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <View style={{ width: width - 60 }}>
                      <Text style={styles.titleRHD}>Round Summary</Text>
                    </View>
                  </View>
                  <View style={styles.lineHeaderRHD} />
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>Driving distance : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.drivingDistance}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>No of Putts : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.totalPutts}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>GIR : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.gir}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>Fairways : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.fairways}</Text>
                    </View>
                  </View>
                </View>
                {this.callLittleBox()}
              </View>
              <Content style={styles.contentBoxRS}>
                <ScrollView>
                  {rows}
                </ScrollView>
              </Content>
              <View style={{ height: 70, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.longButton}
                  onPress={this.saveRound.bind(this)}
                >
                  <Text style={styles.textLongButton}>Save Round</Text>
                </TouchableOpacity>
              </View>
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
          <ModalWrapper
            style={styles.containerModalRS}
            visible={this.state.visibleSave}>
            <View style={styles.containerContentModalRS}>
              <View style={{ justifyContent: 'center', borderBottomWidth: 0 }}>
                <View>
                  <Text style={styles.textSubTitleModalRS}>Success</Text>
                  <Text style={styles.textSubTitleRightRHD}>Round has been successfully saved.</Text>
                </View>
              </View>
              <View style={styles.boxTwoModalRS}>
                <TouchableOpacity
                  onPress={() => this.renderHome()}
                  style={styles.buttonModalRS}
                >
                  <Text style={styles.textSubTitleRHD}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ModalWrapper>
          {this.state.visibleLoading && <Progress.Circle
            style={styles.loading}
            indeterminate={this.state.visibleLoading}
            direction="counter-clockwise"
            color={colors.white}
          />
          }
        </Container>
      </StyleProvider>
    );
  }

  onCloseModal() {
    this.setState({ isModalVisible: false })
  }

  callLittleBox() {
    var listData = [
      { id: 1, name: 'Driving SG', value: this.state.drivingSG },
      { id: 2, name: 'Approach SG', value: this.state.approachSG },
      { id: 3, name: 'Wedge SG', value: this.state.wedgeSG },
      { id: 4, name: 'Chipping SG', value: this.state.chippingSG },
      { id: 5, name: 'Putting SG', value: this.state.totalPuttingSG },
      { id: 6, name: 'Total SG', value: this.state.totalSG },
    ]
    var listBox = [];
    listData.map((data, i) => {
      listBox.push(
        <View key={i} style={[styles.containerBoxHorizontal, {
          marginRight: data.id == 3 || data.id == 6 ? 0 : 10
        }]}
        >
          <Text style={[styles.textTitleSmallBoxRHD, { fontSize: 14 }]}>{data.value}</Text>
          <Text style={[styles.textSmallBoxRHD, { fontSize: 10 }]}>{data.name}</Text>
        </View>
      )
    })
    return (
      <View style={styles.subLittleBoxContainer}>
        {listBox}
      </View>
    )
  }

  renderHome() {
    this.setState({ visibleSave: false })
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: { statusBack: 1 }
        })
      ]
    })

    this.props.navigation.dispatch(resetAction)
  }
}

export default RoundSummaryScreen;
