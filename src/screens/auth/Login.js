
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
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      email: '',
      password: ''
      // isloading: true,
      // refreshing: false,
    };

  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
          <Image source={ImageUrl.bgImg} style={styles.bgHome} />
          <Content>
            <View style={{ marginTop: 50, marginLeft: 40 }}>
              <Text style={styles.titleHeaderHome}>
                Welcome to <Text style={styles.titleHeaderBoldHome}>Saiyan Golf</Text>
              </Text>
              <Text style={styles.textHeaderHome}>Let's golf like a super saiyan</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Image source={ImageUrl.loginGolferImg} style={styles.styleBgImage} />
              <View style={{ width: width }}>
                <View style={{ marginTop: 280, marginLeft: 20 }}>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.textTitleAuth}>Login</Text>
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="1"
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
                      onSubmitEditing={() => Function.focusNextField(this, "2")}
                      value={this.state.email}
                    />
                  </View>
                  <View style={styles.boxInputAuth}>
                    <Input
                      ref="2"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={"next"}
                      underlineColorAndroid="transparent"
                      secureTextEntry={true}
                      style={styles.textInputAuth}
                      placeholder='Password'
                      placeholderTextColor={colors.darkGrey4}
                      onChangeText={password => this.setState({ password })}
                      onSubmitEditing={() => this.loginPress()}
                      value={this.state.password}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonNewRound}
                    onPress={() => this.loginPress()}
                  >
                    <Text style={styles.buttonNew}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footerContent}>
                  <Text style={styles.footerText}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onRegisterPress()}
                  >
                    <Text style={styles.footerTextTwo}> Register here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }

  loginPress() {
    Function.Home(
      this.props.navigation
    )
  }

  onRegisterPress() {
    Function.Register(
      this.props.navigation
    )
  }

}

export default Login;
