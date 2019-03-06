import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AsyncStorage,
  RefreshControl,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {
  Text,
  Container,
  Content,
  StyleProvider,
  Icon,
  Input,
  List
} from 'native-base';
import moment from 'moment';
import ModalWrapper from 'react-native-modal-wrapper';
import * as Progress from 'react-native-progress';

import styles from '../../config/styles';
import colors from '../../config/colors';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Networking from '../../api/Networking';

const { width, height } = Dimensions.get("window");
class NewDrillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data,
      dataDetail: props.navigation.state.params.dataDetail,
      typeStatus: 1,
      total: props.navigation.state.params.dataDetail.total,
      dataHistory: [],
      dataCompleted: props.navigation.state.params.dataCompleted,
      dataAverage: props.navigation.state.params.dataAverage,
      visibleSave: false,
      visibleLoading: false,
      refreshing: false,
      limit: 10,
      page: 1,
      totalPages: 1,
      score: '',
      statusReload: 0,
      totalData: 0,
      isloading: true,
    };

    this.loadDataFromServer()
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
                <View style={styles.containerSubHeaderNDD}>
                  <View style={styles.contentSubHeaderNDD}>
                    <Text style={styles.textTitleHistoryBold}>{this.state.data.name} Drill</Text>
                  </View>
                  <View style={styles.boxDescriptionNDD}>
                    <Text style={styles.textDescription}>{this.state.dataDetail.description}</Text>
                  </View>
                  <View style={styles.lineHeaderNDD} />
                  <View style={styles.contentSubHeaderBoxNDD}>
                    <Text style={styles.textSubHeaderBoldNDD}>Completed drills: {this.state.dataCompleted}</Text>
                    <Text style={styles.textSubHeaderBoldNDD}>
                      Past 1 months avg score : {this.state.dataAverage != null ? this.state.dataAverage.toFixed(2) : 0}/{this.state.total}
                    </Text>
                  </View>
                </View>
                <View style={styles.containerSubBoxNDD}>
                  <View style={styles.boxInputNDD}>
                    <Input
                      style={styles.textInputNDD}
                      placeholder={'Input Score'}
                      placeholderTextColor={colors.lightGrey1}
                      onChangeText={(score) => this.setState({ score })}
                      value={this.state.score}
                      keyboardType='numeric'
                    />
                    <Text style={styles.textSubHeaderBoldNDD}>/{this.state.total}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.containerBoxSaveNDD}
                    onPress={() => this.sendDataToServer()}
                  >
                    <Text style={styles.textBoxSaveNDD}>ADD</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitleBoxNDD}>My Past Drill</Text>
                  </View>
                  {this.state.dataHistory.length == 0 &&
                    <View style={styles.containerEmptyDataNDD}>
                      {this.state.refreshing == true || this.state.isloading == true ?
                        <Progress.Circle
                          style={styles.loadingProgress}
                          indeterminate={this.state.isloading}
                          direction="counter-clockwise"
                          color={colors.primary}
                        />
                        :
                        <Text style={[styles.textTitleInput, { marginTop: 20, textAlign: 'center' }]}>No Data</Text>
                      }
                    </View>
                  }
                  <List
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }

                    enableEmptySections={true}
                    dataArray={this.state.dataHistory}
                    onEndReached={() => this.loadDataFromServer()}
                    onEndReachedThreshold={10}
                    renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                  >
                  </List>
                </View>
              </Content>
            </View>
            <ModalWrapper
              style={styles.containerModalRS}
              visible={this.state.visibleSave}>
              <View style={styles.containerContentModalRS}>
                <View style={{ justifyContent: 'center', borderBottomWidth: 0 }}>
                  <View>
                    <Text style={styles.textSubTitleModalRS}>Success</Text>
                    <Text style={styles.textSubTitleRightRHD}>Score has been successfully saved.</Text>
                  </View>
                </View>
                <View style={styles.boxTwoModalRS}>
                  <TouchableOpacity
                    onPress={() => this.renderRefreshHistory()}
                    style={styles.buttonModalRS}
                  >
                    <Text style={styles.textSubTitleRHD}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalWrapper>
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

  renderRow(rowData, sectionID, rowID) {
    var rowIdNew = this.state.totalData - parseInt(rowID)
    return (
      <View style={styles.containerBoxDH}>
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.boxTitleListDH}>
            <View style={{ width: 100 }}>
              <Text style={styles.textTitleListDH}>Drill {rowIdNew}</Text>
            </View>
            <View style={{ width: width - 180 }}>
              <Text style={[styles.textListDH, { textAlign: 'right' }]}>
                {moment(rowData.date).format("MMM Do YYYY")}, {moment(rowData.date).format("HH.mm")}
              </Text>
            </View>
          </View>
          <View style={styles.lineGrey} />
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textTitleBoldDH}>Score: {rowData.score}/{this.state.total}</Text>
          </View>
        </View>
      </View>
    )
  }

  async onRefresh() {
    if (!this.state.refreshing) {
      await this.setState({
        page: 1,
        totalPages: 1
      })
      this.loadDataFromServer();
    }
  }

  valueChecker() {
    if (
      this.state.score != '' &&
      this.state.score <= this.state.total) {
      return true
    }
    else {
      if (this.state.score == '') {
        Alert.alert('Info', 'Please fill score field', [{ text: 'Ok' }])
        return false
      }
      if (this.state.score > this.state.total) {
        Alert.alert('Info', "sorry can't add a score of more than " + this.state.total, [{ text: 'Ok' }])
        return false
      }
      else {
        Alert.alert('Info', 'Please fill empty value', [{ text: 'Ok' }])
        return false
      }
    }
  }

  async loadDataFromServer() {
    if (!this.state.refreshing && this.state.page <= this.state.totalPages) {
      this.setState({ refreshing: true });
      var dataPost = {
        page: this.state.page,
        limit: this.state.limit,
        drillId: this.state.data.id,
        typeId: this.state.dataDetail.id,
      }

      const response = await Networking.getHistoryDrill(dataPost)

      if (response != null) {
        var currentPage = response.page.currentPage;
        var totalPage = Math.ceil(response.page.count / this.state.limit);

        var data = this.state.dataHistory;
        if (currentPage == 1) {
          data = response.data;
        } else {
          data = data.concat(response.data);
        }

        AsyncStorage.setItem('@saiyanGolfStore:historyDrillType', JSON.stringify(data));

        this.setState({
          dataHistory: data,
          refreshing: false,
          totalPages: totalPage,
          page: currentPage + 1,
          totalData: response.page.count,
          isloading: false
        });

        if (this.state.statusReload == 1) {
          this.setState({ statusReload: 0 })
          this.loadDetailDrill();
        }

      } else {
        this.setState({
          refreshing: false,
          isloading: false
        });
      }
    }
  }

  async sendDataToServer() {
    if (this.valueChecker() == true && this.state.visibleLoading == false) {
      this.setState({ visibleLoading: true });
      var dataPost = {
        drillId: this.state.data.id,
        typeId: this.state.dataDetail.id,
        score: this.state.score,
      }

      const response = await Networking.sendScore(dataPost)
      if (response != null) {
        this.setState({
          visibleSave: true,
          visibleLoading: false,
        });

      } else {
        this.setState({
          visibleLoading: false,
        });
      }
    }
  }

  renderRefreshHistory() {
    this.setState({
      visibleSave: false,
      score: '',
      statusReload: 1,
      refreshing: false
    })

    this.onRefresh();
  }

  async loadDetailDrill() {
    var dataSourceDetail = []
    var dataPost = {
      drillId: this.state.data.id
    }

    const response = await Networking.getListDetailDrill(dataPost)
    if (response != null) {

      dataSourceDetail = response;
      var dataCompleted = 0;
      for (let i = 0; i < dataSourceDetail.length; i++) {
        if (this.state.dataDetail.id == dataSourceDetail[i]._id.typeId) {
          dataCompleted = dataSourceDetail[i].count;
          dataAverage = dataSourceDetail[i].average;
        }
      }

      this.setState({
        dataCompleted: dataCompleted,
        dataAverage: dataAverage
      })
    }
  }

}


export default NewDrillDetail;
