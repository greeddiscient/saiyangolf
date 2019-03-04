import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
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
import Function from '../../utilities/Function';
import jsonData from '../../data/drillData';

class DrillScreen extends React.Component {
  constructor(props) {
    var { width, height } = Dimensions.get("window");
    super(props);
    this.state = {
      saveWidth: width,
      saveHeight: height,
      refreshing: false,
      isloading: true,
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
                    <Text style={styles.textTitleDrillScreen}>Drill</Text>
                  </View>
                </View>
                <View style={styles.contentBoxDrill}>
                  {jsonData.dataDrill.map((data, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => this.onDetailPress(data)}
                        style={[styles.smallBox, { marginRight: i == 0 || i == 2 || i == 4 ? 20 : 0 }]}
                      >
                        <Text style={styles.textSmallBoxDrill}>{data.name}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </Content>
            </View>
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

  onDetailPress(data) {
    Function.DrillHistory(this.props.navigation, data)
  }

}

export default DrillScreen;
