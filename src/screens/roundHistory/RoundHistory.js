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
  RefreshControl,
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
} from 'native-base';
import * as Progress from 'react-native-progress';
import { sgData } from '../../data/sgData';
import axios from 'axios';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

class RoundHistoryScreen extends React.Component {
  constructor(props) {
    var { width, height } = Dimensions.get("window");
    super(props);
    this.state = {
      saveWidth: width,
      saveHeight: height,
      // rounds: [],
      rounds: props.navigation.state.params.data,
      refreshing: false,
      isloading: true
    };
  }

  render() {
    var rows = []
    var rounds = this.state.rounds
    console.log(rounds)
    for (var i = 0; i < rounds.length; i++) {
      rows.push(
        <View key={i} style={styles.cardHistory}>
          <TouchableOpacity
            onPress={this.getRoundDetails.bind(this, i)}
          >
            <View style={styles.boxSubTitleHistory}>
              <View style={{ width: 100 }}>
                <Text style={styles.textTitleCard} >Round {rounds[i].roundNumber}</Text>
              </View>
              <View style={{ width: this.state.saveWidth - 180 }}>
                <Text style={styles.textTitleCardRight}>{rounds[i].courseName} {rounds[i].roundDate}</Text>
              </View>
            </View>
            <Text style={styles.textCard}>Driving distance : {rounds[i].drivingDistance}</Text>
            <Text style={styles.textCard}>Driving SG : {rounds[i].drivingSG}</Text>
            <Text style={styles.textCard}>Approach SG : {rounds[i].approachSG}</Text>
            <Text style={styles.textCard}>Wedge SG : {rounds[i].wedgeSG}</Text>
            <Text style={styles.textCard}>Chipping SG : {rounds[i].chippingSG}</Text>
            <Text style={styles.textCard}>Putting SG : {rounds[i].totalPuttingSG}</Text>
          </TouchableOpacity>
        </View>
      )
    }

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
                    style={styles.iconBack}
                  />
                </TouchableOpacity>
              </View>
              <Content
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    progressBackgroundColor={colors.primary}
                    colors={[colors.white, colors.white, colors.white]}
                  />
                }>
                <View style={styles.containerSubHeader}>
                  <View style={styles.contentSubHeader}>
                    <Text style={styles.textTitleHistory}>
                      Round <Text style={styles.textTitleHistoryBold}>History</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.contentBoxHistory}>
                  {this.state.rounds.length == 0 &&
                    <View style={styles.containerEmptyDataRH}>
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
                  <ScrollView >
                    {rows}
                  </ScrollView>
                </View>
              </Content>
            </View>
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

  async onRefresh() {
    if (!this.state.refreshing) {
      this.loadDataFromServer();
    }
  }

  getRoundDetails(id) {
    console.log(id)
    var rounds = this.state.rounds
    this.props.navigation.navigate('RoundHistoryDetails', {
      round: rounds[id],
      numberRound: id + 1
    })
  }

  loadDataFromServer() {
    that = this
    if (this.state.refreshing == false) {
      this.setState({ refreshing: true });
      axios.get('http://saiyan-api.herokuapp.com/api/rounds')
        .then(function (response) {
          // handle success
          console.log(response.data);
          rounds = []
          for (var i = 0; i < response.data.length; i++) {
            rounds.push(response.data[i])
          }

          var sorted_round = rounds.sort((a, b) => {
            return (
              new Date(moment(moment(a.roundDate, 'MMM Do YYYY')).format('YYYY-MM-DD')).getTime() -
              new Date(moment(moment(b.roundDate, 'MMM Do YYYY')).format('YYYY-MM-DD')).getTime()
            )
          }).reverse();

          var finalSort = sorted_round.map((data, i) => {
            return { ...data, roundNumber: sorted_round.length - i };
          });

          console.log("after loop", rounds)
          that.setState({
            rounds: finalSort,
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

}

export default RoundHistoryScreen;
