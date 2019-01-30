
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
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Icon,
  List
} from 'native-base';
import * as Progress from 'react-native-progress';
import axios from 'axios';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

const { width, height } = Dimensions.get("window");
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      isloading: true,
      refreshing: false,
    };

    this.loadDataFromServer();
  }

  //   componentDidMount() {
  //     this.willFocusListener = this.props.navigation.addListener(
  //       'willFocus',
  //       () => {
  //         this.onRefresh()
  //       }
  //     );
  // }

  // componentWillUnmount() {
  //   this.willFocusListener.remove();
  // }

  loadDataFromServer() {
    that = this
    if (this.state.refreshing == false) {
      this.setState({ refreshing: true });
      axios.get('http://saiyan-api.herokuapp.com/api/rounds')
        .then(function (response) {
          // handle success
          console.log(response.data);
          rounds = that.state.rounds
          for (var i = 0; i < response.data.length; i++) {
            rounds.push(response.data[i])
          }
          console.log("after loop", rounds)
          that.setState({
            rounds: rounds,
            refreshing: false,
            isloading: false,
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          that.setState({
            refreshing: false,
            isloading: false,
          })
        })
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
              <Text style={styles.textTitleCard}>Round {parseInt(rowID) + 1}</Text>
            </View>
            <View style={{ width: this.state.saveWidth - 180 }}>
              <Text style={styles.textTitleCardRight}>
                {rowData.courseName} {rowData.roundDate}
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
      this.loadDataFromServer();
    }
  }

}

export default HomeScreen;
