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
        { id: 1, name: 'History 1' },
        { id: 2, name: 'History 2' },
        { id: 3, name: 'History 3' },
        { id: 4, name: 'History 4' },
        { id: 5, name: 'History 5' },
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
                    <Text style={styles.textTitleHistoryBold}>{this.state.data} History</Text>
                  </View>
                </View>
                <View style={styles.contentBoxHistory}>
                  {this.state.dataHistory.map((data, i) => {
                    return (
                      <View key={i} style={styles.containerBoxDH}>
                        <Text>{data.name}</Text>
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
