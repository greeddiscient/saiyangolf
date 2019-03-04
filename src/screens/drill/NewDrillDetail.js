import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  BackHandler,
  Platform,
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

import styles from '../../config/styles';
import colors from '../../config/colors';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';

const { width, height } = Dimensions.get("window");
class NewDrillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data,
      typeStatus: 1,
      description: props.navigation.state.params.data.type[0].description,
      total: props.navigation.state.params.data.type[0].total,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    return true;
  }

  render() {
    console.log('data description, '+this.state.description)
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ backgroundColor: colors.lightGrey2 }}>
          <View style={[styles.headerContainerER, {
            
          }]}>
            <View style={{ width: width - 140, marginTop: Platform.OS === 'ios' ? 30 : 0 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ height: 50, justifyContent: 'center' }}
              >
                <Image
                  resizeMode='contain'
                  source={ImageUrl.backImg}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 10}}>
                <Text style={styles.textHeaderER}>
                  <Text style={styles.textBoldHeaderER}>{this.state.data.name}</Text> Drill
                </Text>
                <View style={{marginTop: 20, marginBottom: 20}}>
                  <Text style={styles.textDescription}>{this.state.description}</Text>
                </View>
              </View>
            </View>
            <View style={{height: Platform.OS === 'ios' ? 180 : 150}}>
              <Image
                resizeMode='contain'
                source={ImageUrl.golferImg}
                style={{ width: 100, height: Platform.OS === 'ios' ? 180 : 150 }}
              />
            </View>
          </View>
          <Content >
            <View style={styles.scrollViewContainer}>
              <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', }}
              >
                {this.state.data.type.map((data, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={1}
                      style={[styles.buttonSmallNDD, {
                        backgroundColor: this.state.typeStatus == data.id ? colors.primary : colors.darkGrey3,
                        marginRight: i == 1 || i == 4 ? 10 : 0, marginLeft: i == 1 || i == 4 ? 10 : 0,
                      }]}
                      onPress={() => this.rowPress(data)} >
                      <Text style={[styles.textSubBoxES, {
                        color: this.state.typeStatus == data.id ? colors.white : colors.darkGrey
                      }]}
                      >
                        {data.name}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <View style={styles.scoreContainerNDD}>
                <Text style={styles.textTitleBase}>
                  Score
                </Text>
                <View style={styles.containerSubBoxNDD}>
                  <Input
                    style={styles.textInputNDD}
                    onChangeText={(score) => this.setState({ score })}
                    value={this.state.score}
                    keyboardType='numeric'
                  />
                  <Text>/{this.state.total}</Text>
                </View>
              </View>
            </View>
          </Content>
          <View style={styles.containerButtonBottom}>
            <TouchableOpacity
              style={styles.longButton}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.textLongButton}>Save Drill</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </StyleProvider>
    );
  }

  rowPress(data) {
    this.setState({ 
      typeStatus: data.id, 
      description: data.description,
      total: data.total
    })
  }
}


export default NewDrillDetail;
