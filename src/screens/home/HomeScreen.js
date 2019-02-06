
import React, { Component } from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  RefreshControl,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Icon,
  List
} from 'native-base';
import {
  NavigationActions,
  StackActions,
} from 'react-navigation';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import moment from 'moment';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Networking from '../../api/Networking';

const { width, height } = Dimensions.get("window");
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      isloading: true,
      refreshing: false,
      statusBack: props.navigation.state.params != null && props.navigation.state.params.statusBack != null ? props.navigation.state.params.statusBack : 0,
    };

    this.loadDataFromServer();
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        if (this.state.statusBack == 1) {
          this.onRefresh()
        }

        this.setState({ statusBack: 0 })
      }
    );
  }

  componentWillUnmount() {
    if (this.state.statusBack == 1) {
      this.willFocusListener.remove();
    }
  }

  async loadDataFromServer() {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true });

      const response = await Networking.getDataRoundHistory()
      if (response != null) {
        let rounds = []
        for (var i = 0; i < response.length; i++) {
          rounds.push(response[i])
        }

        var sorted_round = rounds.sort((a, b) => {
          return (
            new Date(moment(a.roundDate).format('YYYY-MM-DD')).getTime() -
            new Date(moment(b.roundDate).format('YYYY-MM-DD')).getTime()
          )
        }).reverse();

        var finalSort = sorted_round.map((data, i) => {
          return { ...data, roundNumber: sorted_round.length - i };
        });

        this.setState({
          rounds: finalSort,
          refreshing: false,
          isloading: false,
        });
      } else {
        this.setState({
          refreshing: false,
          isloading: false,
        });
      }
    }
  }


  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
          <Image source={ImageUrl.bgImg} style={styles.bgHome} />
          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              progressBackgroundColor={colors.primary}
              colors={[colors.white, colors.white, colors.white]}
            />
          }>
            {/* <View style={{height: 50, alignItems: 'flex-end'}}>
            <Icon name='power-settings-new' style={{ marginRight: 10 }} />
          </View> */}
            <View style={{ marginTop: 50, marginLeft: 40 }}>
              <Text style={styles.titleHeaderHome}>
                Welcome back <Text style={styles.titleHeaderBoldHome}>golfers!</Text>
              </Text>
              <Text style={styles.textHeaderHome}>Let's start scoring now!</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <View style={styles.containerImageHome}>
                <Image
                  resizeMode='contain'
                  source={ImageUrl.golfersImg}
                  style={styles.styleImageGolfer}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonNewRound}
                onPress={() => this.props.navigation.navigate('EnterRound')}
              >
                <Text style={styles.buttonNew}>+ Enter a new round</Text>
              </TouchableOpacity>
              <View style={styles.card}>
                <View style={{ backgroundColor: colors.white, padding: 20, borderRadius: 10 }}>
                  <Text style={styles.textTitleHome}>Round History</Text>
                  {this.state.rounds.length == 0 &&
                    <View style={styles.containerEmptyDataHome}>
                      {this.state.refreshing == true || this.state.isloading == true ?
                        <Progress.Circle
                          style={styles.loadingProgress}
                          indeterminate={this.state.isloading}
                          direction="counter-clockwise"
                          color={colors.primary}
                        />
                        :
                        <Text style={[styles.textTitleInput, { marginTop: 20 }]}>No Data</Text>
                      }
                    </View>
                  }

                  {this.state.rounds.length != 0 ?
                    <View>
                      <List
                        enableEmptySections={true}
                        dataArray={this.state.rounds}
                        renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                      >
                      </List>
                      <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1 }} />
                      <View style={{ justifyContent: 'flex-end', marginTop: 50 }}>
                        <TouchableOpacity
                          style={{ alignItems: 'center', height: 30 }}
                          onPress={() => this.props.navigation.navigate('RoundHistory', { data: this.state.rounds })}
                        >
                          <Text style={{ color: colors.primary }}>See all round history</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    :
                    null
                  }
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonNewRound}
                onPress={() => Alert.alert(
                  'Sign out',
                  'Do you want to logout?',
                  [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                    { text: 'OK', onPress: () => this.logoutButton() },
                  ]
                )}
              >
                <Text style={styles.buttonNew}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    if (rowID < 1) {
      return (
        <View style={{ marginBottom: 20 }}>
          <View style={[styles.boxSubTitleHistory, { marginTop: 20 }]}>
            <View style={{ width: 100 }}>
              <Text style={styles.textTitleCard}>Round {rowData.roundNumber}</Text>
            </View>
            <View style={{ width: this.state.saveWidth - 180 }}>
              <Text style={styles.textTitleCardRight}>
                {rowData.courseName} {moment(rowData.roundDate).format("MMM Do YYYY")}
              </Text>
            </View>
          </View>
          <Text style={styles.textCard}>Driving distance : {rowData.drivingDistance}</Text>
          <Text style={styles.textCard}>Approach SG : {rowData.approachSG}</Text>
          <Text style={styles.textCard}>Wedge SG : {rowData.wedgeSG}</Text>
          <Text style={styles.textCard}>Chipping SG : {rowData.chippingSG}</Text>
          <Text style={styles.textCard}>Putting SG : {rowData.totalPuttingSG}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  async onRefresh() {
    if (!this.state.refreshing) {
      // await this.setState({ rounds: [] })
      this.loadDataFromServer();
    }
  }

  logoutButton() {
    try {
      var key = [
        "@saiyanGolfStore:tokens",
      ];
      AsyncStorage.multiRemove(key, err => {
        if (err == null) {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Login' })
            ]
          })
          this.props.navigation.dispatch(resetAction);
        }
      })
    } catch (error) {
      // Error saving data
    }
  }

}

export default HomeScreen;
