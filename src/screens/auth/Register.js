
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  RefreshControl,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Text,
  Input,
  Container,
  Content,
  Footer,
  StyleProvider,
} from 'native-base';
import * as Progress from 'react-native-progress';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Function from '../../utilities/Function';

const { width, height } = Dimensions.get("window");
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      name: '',
      email: '',
      password: '',
      confirmPass: '',
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
          <Image source={ImageUrl.bgImg} style={styles.bgHome} />
          <Content>
            <View>
              <View style={styles.containerImageRegister}>
                <Image
                  resizeMode='contain'
                  source={ImageUrl.golfersImg}
                  style={styles.styleImageGolfer}
                />
              </View>
              <View style={{ width: width }}>
                <View style={{ marginLeft: 20 }}>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.textTitleAuth}>Register</Text>
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="1"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={"next"}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={colors.white}
                      placeholder='Name'
                      placeholderTextColor={colors.darkGrey4}
                      style={styles.textInputAuth}
                      onChangeText={name => this.setState({ name })}
                      onSubmitEditing={() => Function.focusNextField(this, "2")}
                      value={this.state.name}
                    />
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="2"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={"next"}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={colors.white}
                      placeholder="Email"
                      keyboardType={'email-address'}
                      placeholderTextColor={colors.darkGrey4}
                      style={styles.textInputAuth}
                      onChangeText={email => this.setState({ email })}
                      onSubmitEditing={() => Function.focusNextField(this, "3")}
                      value={this.state.email}
                    />
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="3"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={"next"}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={colors.white}
                      style={styles.textInputAuth}
                      secureTextEntry={true}
                      placeholder='Password'
                      placeholderTextColor={colors.darkGrey4}
                      onChangeText={password => this.setState({ password })}
                      onSubmitEditing={() => Function.focusNextField(this, "4")}
                      value={this.state.password}
                    />
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="4"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={"next"}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={colors.white}
                      style={styles.textInputAuth}
                      secureTextEntry={true}
                      placeholder='Confirm password'
                      placeholderTextColor={colors.darkGrey4}
                      onChangeText={confirmPass => this.setState({ confirmPass })}
                      onSubmitEditing={() => this.buttonPress()}
                      value={this.state.confirmPass}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonNewRound}
                    onPress={() => this.buttonPress()}
                  >
                    <Text style={styles.buttonNew}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footerContent}>
                  <Text style={styles.footerText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onLoginPress()}
                  >
                    <Text style={styles.footerTextTwo}> Login here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }

  onLoginPress() {
    Function.Login(
      this.props.navigation
    )
  }

  buttonPress() {
    Function.Home(
      this.props.navigation
    )
  }

}

export default Register;
