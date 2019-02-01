
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
            <View style={{}}>
              <Image source={ImageUrl.loginGolferImg} style={{
                width: width, height: height, position: 'absolute',
                overflow: 'hidden'
              }} />
              <View style={{ width: width}}>
                <View style={{marginTop: 280, marginLeft: 20}}>
                  <View style={{marginBottom: 20}}>
                    <Text style={styles.textTitleLogin}>Login</Text>
                  </View>
                  <View style={styles.boxInputLogin}>
                    <Input
                      style={{ paddingLeft: 20 }}
                      placeholder='Email'
                      placeholderTextColor={colors.darkGrey4}
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                    />
                  </View>
                  <View style={styles.boxInputLogin}>
                    <Input
                      style={{ paddingLeft: 20 }}
                      placeholder='Password'
                      placeholderTextColor={colors.darkGrey4}
                      onChangeText={password => this.setState({ password })}
                      value={this.state.email}
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
          {/* <Footer style={styles.footerContent}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
            // onPress={() => this.onRegisterPress()}
            >
              <Text style={styles.footerTextTwo}> Register here</Text>
            </TouchableOpacity>
          </Footer> */}
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
