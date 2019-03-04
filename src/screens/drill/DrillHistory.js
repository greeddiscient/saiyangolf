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
import moment from 'moment';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Function from '../../utilities/Function';

var { width, height } = Dimensions.get("window");
class DrillHistoryScreen extends React.Component {
  constructor(props) {
    var { width, height } = Dimensions.get("window");
    super(props);
    this.state = {
      saveWidth: width,
      saveHeight: height,
      refreshing: false,
      isloading: true,
      data: props.navigation.state.params.data,
      dataHistory: [
        { id: 1, name: 'Drill 5', date: '2019-02-26T09:58:26.996Z', score: 2 },
        { id: 2, name: 'Drill 4', date: '2019-02-26T09:58:26.996Z', score: 5 },
        { id: 3, name: 'Drill 3', date: '2019-02-26T09:58:26.996Z', score: 6 },
        { id: 4, name: 'Drill 2', date: '2019-02-26T09:58:26.996Z', score: 1 },
        { id: 5, name: 'Drill 1', date: '2019-02-26T09:58:26.996Z', score: 2 },
      ],
      visibleModal: false
    };
  }

  render() {
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
              <Content>
                <View style={styles.containerSubHeaderDH}>
                  <View style={styles.contentSubHeader}>
                    <Text style={styles.textTitleHistoryBold}>{this.state.data.name} Drill</Text>
                  </View>
                  <View style={styles.boxDescriptionDH}>
                    <Text style={styles.textDescription}>{this.state.data.description}</Text>
                  </View>
                  <View style={styles.containerButtonDH}>
                    <TouchableOpacity
                      style={styles.longButton}
                      onPress={() => this.newDrillDetail()}
                    >
                      <Text style={styles.textLongButton}>+ Add New {this.state.data.name} Drill</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contentBoxHistory}>
                  {this.state.dataHistory.map((data, i) => {
                    return (
                      <View key={i} style={styles.containerBoxDH}>
                        <View style={{ flexDirection: 'column' }}>
                          <View style={styles.boxTitleListDH}>
                            <View style={{ width: 100 }}>
                              <Text style={styles.textTitleListDH}>{data.name}</Text>
                            </View>
                            <View style={{ width: width - 180 }}>
                              <Text style={[styles.textListDH, { textAlign: 'right' }]}>{moment(data.date).format("MMM Do YYYY")}, {moment(data.date).format("HH.mm")}</Text>
                            </View>
                          </View>
                          <View style={{ borderBottomColor: colors.lightGrey1, borderBottomWidth: 1 }} />
                          <View style={{ marginTop: 10 }}>
                            <Text style={styles.textTitleBoldDH}>Score: {data.score}/10</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
                  }
                </View>
              </Content>
            </View>
            {/* <View style={styles.containerButtonBottom}>
              <TouchableOpacity
                style={styles.longButton}
                onPress={() => this.newDrillDetail()}
              >
                <Text style={styles.textLongButton}>Add New {this.state.data.name} Drill</Text>
              </TouchableOpacity>
            </View> */}
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

  newDrillDetail() {
    Function.NewDrillDetail(this.props.navigation, this.state.data)
  }

}

export default DrillHistoryScreen;
