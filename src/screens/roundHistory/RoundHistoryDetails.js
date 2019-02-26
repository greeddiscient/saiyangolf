import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
} from 'native-base';
import moment from 'moment';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

const { width, height } = Dimensions.get("window");
class RoundHistoryDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roundSummary: [],
      round: [],
      dataDetail: props.navigation.state.params.round,
      numberRound: props.navigation.state.params.numberRound,
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const round = navigation.getParam('round', [])
    this.setState({
      round: round
    })
    console.log("cdm round", round)
  }

  render() {
    var rows = []
    var round = this.state.round
    console.log(round)
    var roundSummary = round.roundSummary
    console.log("roundSummary render", roundSummary)
    var rows = []
    roundSummary.map((data, i) => {
      rows.push(
        <View key={i} style={styles.cardHistoryDetail}
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.textTitleBoxRHD}>Hole {i + 1}</Text>
          </View>
          {data.shots != null && data.shots.map((rowData, j) => {
            return (
              <View key={j} style={{ height: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text style={styles.textBoldSubBoxRHD}>Shot {j + 1}</Text>
                  <Text style={styles.textSubBoxRHD}>
                    {rowData.distance}{rowData.lie} SG : {rowData.sg != null ? rowData.sg : '-'}
                  </Text>
                </View>
                <View style={{ borderBottomColor: colors.lightGrey1, borderBottomWidth: 1 }} />
              </View>
            )
          })}
          <Text style={styles.textSubBoxRHD}>Score : {data.score}</Text>
          <Text style={styles.textSubBoxRHD}>Putts : {data.putts}</Text>
          <Text style={styles.textSubBoxRHD}>Putting SG : {data.puttingSG}</Text>
          <Text style={styles.textBoldSubBoxRHD}>Total SG : {data.sg}</Text>
        </View>
      )
    })

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
              <View style={{ height: 320, backgroundColor: colors.primary, marginBottom: 40 }}>
                <View style={{ width: width - 60, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <View style={{ width: 100 }}>
                      <Text style={styles.titleRHD}>Round {this.state.dataDetail.roundNumber}</Text>
                    </View>
                    <View style={{ width: width - 170 }}>
                      <Text style={styles.textTitleRightRH}>
                        {this.state.dataDetail.courseName} {moment(this.state.dataDetail.roundDate).format("MMM Do YYYY")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.lineHeaderRHD} />
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>Driving distance : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.dataDetail.drivingDistance}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>No of Putts : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.dataDetail.totalPutts}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>GIR : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.dataDetail.gir}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textSubTitleRHD}>Fairways : </Text>
                      <Text style={styles.textSubTitleRightRHD}>{this.state.dataDetail.fairways}</Text>
                    </View>
                  </View>
                </View>
                {this.callLittleBox()}
              </View>
              <Content style={{ marginTop: -110 }}>
                <ScrollView style={{ paddingTop: 10 }}>
                  {rows}
                </ScrollView>
              </Content>
            </View>
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

  callLittleBox() {
    var listData = [
      { id: 1, name: 'Driving SG', value: this.state.dataDetail.drivingSG },
      { id: 2, name: 'Approach SG', value: this.state.dataDetail.approachSG },
      { id: 3, name: 'Wedge SG', value: this.state.dataDetail.wedgeSG },
      { id: 4, name: 'Chipping SG', value: this.state.dataDetail.chippingSG },
      { id: 5, name: 'Putting SG', value: this.state.dataDetail.totalPuttingSG },
      { id: 6, name: 'Total SG', value: this.state.dataDetail.totalSG },
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
      // <ScrollView
      //   horizontal={true}
      //   showsHorizontalScrollIndicator={false}
      //   style={{ width: width - 20, marginLeft: 20, marginTop: 20 }}
      // >
      //   {listBox}
      // </ScrollView>
    )
  }
}

export default RoundHistoryDetailsScreen;
