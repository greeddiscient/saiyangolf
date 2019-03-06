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
import Function from '../../utilities/Function';
import Networking from '../../api/Networking';

var { width, height } = Dimensions.get("window");
class DrillDetailScreen extends React.Component {
  constructor(props) {
    var { width, height } = Dimensions.get("window");
    super(props);
    this.state = {
      saveWidth: width,
      saveHeight: height,
      refreshing: false,
      data: props.navigation.state.params.data,
      visibleModal: false,
      dataSource: [],
      visibleLoading: false
    };

    this.loadDataFromServer();
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.loadDataFromServer()
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
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
                <View style={styles.containerSubHeaderDD}>
                  <View style={styles.contentSubHeader}>
                    <Text style={styles.textTitleHistoryBold}>
                      {this.state.data.name} Drill
                    </Text>
                  </View>
                </View>
                <View style={styles.contentBoxDD}>
                  {this.state.data.type.map((data, i) => {
                    var dataCompleted = 0;
                    var dataAverage = 0;
                    for (let i = 0; i < this.state.dataSource.length; i++) {
                      if (data.id == this.state.dataSource[i]._id.typeId) {
                        dataCompleted = this.state.dataSource[i].count;
                        dataAverage = this.state.dataSource[i].average;
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.containerBoxDD}
                        onPress={() => this.newDrillDetail(data, dataCompleted, dataAverage)}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <View style={styles.boxTitleListDD}>
                            <Text style={styles.textTitleListDD}>{data.name}</Text>
                          </View>
                          <View style={styles.boxListDD}>
                            <View>
                              <Text style={styles.textTitleBoldDH}>
                                Completed: {dataCompleted}
                              </Text>
                            </View>
                            <View>
                              <Text style={styles.textTitleBoldDH}>
                                Avg Score: {dataAverage != null ? dataAverage.toFixed(2) : 0}/{data.total}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </Content>
            </View>
            {this.state.visibleLoading && <Progress.Circle
              style={styles.loading}
              indeterminate={this.state.visibleLoading}
              direction="counter-clockwise"
              color={colors.white}
            />}
          </SafeAreaView>
        </Container>
      </StyleProvider>
    );
  }

  newDrillDetail(dataDetail, dataCompleted, dataAverage) {
    Function.NewDrillDetail(
      this.props.navigation,
      dataDetail,
      dataCompleted,
      dataAverage,
      this.state.data
    )
  }

  async loadDataFromServer() {
    if (this.state.visibleLoading == false) {
      this.setState({ visibleLoading: true });
      var dataPost = {
        drillId: this.state.data.id
      }

      const response = await Networking.getListDetailDrill(dataPost)
      if (response != null) {
        this.setState({
          dataSource: response,
          visibleLoading: false,
        });
      } else {
        this.setState({
          visibleLoading: false,
        });
      }
    }
  }

}

export default DrillDetailScreen;
