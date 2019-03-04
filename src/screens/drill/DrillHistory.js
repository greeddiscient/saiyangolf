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

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

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
        { id: 1, name: 'Drill 1', date: '10 Sep 2018', time: '10:00', score: 100 },
        { id: 2, name: 'Drill 2', date: '10 Sep 2018', time: '10:00', score: 100  },
        { id: 3, name: 'Drill 3', date: '10 Sep 2018', time: '10:00', score: 100  },
        { id: 4, name: 'Drill 4', date: '10 Sep 2018', time: '10:00', score: 100  },
        { id: 5, name: 'Drill 5', date: '10 Sep 2018', time: '10:00', score: 100  },
      ]
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
                <View style={styles.containerSubHeader}>
                  <View style={styles.contentSubHeader}>
                    <Text style={styles.textTitleHistoryBold}>{this.state.data} Drill</Text>
                  </View>
                </View>
                <View style={styles.contentBoxHistory}>
                  {this.state.dataHistory.map((data, i) => {
                    return (
                      <View key={i} style={styles.containerBoxDH}>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.textTitleListDH}>{data.name}</Text>
                          <View style={{marginTop: 10}}>
                            <Text style={styles.textListDH}>Date: {data.date}</Text>
                            <Text style={styles.textListDH}>Time: {data.time}</Text>
                            <Text style={styles.textListDH}>Score: {data.score}</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
                  }
                </View>
              </Content>
            </View>
            <View style={styles.containerButtonBottom}>
              <TouchableOpacity
                style={styles.longButton}
              >
                <Text style={styles.textLongButton}>Add New {this.state.data} Drill</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

}

export default DrillHistoryScreen;
