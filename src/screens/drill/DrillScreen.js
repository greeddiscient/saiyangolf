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
                    <Text style={styles.textTitleHistoryBold}>Drill</Text>
                  </View>
                </View>
                <View style={styles.contentBoxHistory}>
                  <View style={styles.containerBox}>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Driving')}
                      style={[styles.smallBox, {marginRight: 20}]}
                    >
                      <Text style={styles.textSmallBoxDrill}>Driving</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Approach')}
                      style={styles.smallBox}
                    >
                      <Text style={styles.textSmallBoxDrill}>Approach</Text>
                    </TouchableOpacity >
                  </View>
                  <View style={styles.containerBox}>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Wedge Game')}
                      style={[styles.smallBox, {marginRight: 20}]}
                    >
                      <Text style={styles.textSmallBoxDrill}>Wedge Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Chipping')}
                      style={styles.smallBox
                    }>
                      <Text style={styles.textSmallBoxDrill}>Chipping</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.containerBox}>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Sand')}
                      style={[styles.smallBox, {marginRight: 20}]}>
                      <Text style={styles.textSmallBoxDrill}>Sand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => this.onDetailPress('Putting')}
                      style={styles.smallBox}
                    >
                      <Text style={styles.textSmallBoxDrill}>Putting</Text>
                    </TouchableOpacity>
                  </View>
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
