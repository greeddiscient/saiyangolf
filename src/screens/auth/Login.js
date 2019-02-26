
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
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  Input,
  Container,
  Content,
  Footer,
  StyleProvider,
} from 'native-base';
import {
  NavigationActions,
  StackActions,
} from 'react-navigation';
import * as Progress from 'react-native-progress';

import colors from '../../config/colors';
import styles from '../../config/styles';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ImageUrl from '../../config/images';
import Function from '../../utilities/Function';
import Networking from '../../api/Networking';

const { width, height } = Dimensions.get("window");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      email: '',
      password: '',
      tokens: null,
      isLoading: true,
      visibleLoading: false
    };

    AsyncStorage.getItem(
      '@saiyanGolfStore:tokens'
      , (err, result) => {
        if (result !== null) {
          this.setState({ tokens: result })
        }

        this.loginCheck();
      })
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.setState({ email: '', password: '' }) },
    )
  }

  loginCheck() {
    try {
      if (this.state.tokens == null || this.state.tokens == "") {
        this.setState({ isLoading: false });
      } else {
        this.checkUserLogin()
      }
    } catch (e) {
      setTimeout(() => this.setState({ isLoading: false }), 200);
    }
  }

  render() {
    var { height, width } = Dimensions.get('window');
    const formStyles = [styles.form];
    if (Platform.OS === 'android') formStyles.push(styles.androidform);
    if (this.state.isLoading == true) {
      return (
        <View style={styles.activityIndicator}>
          <Progress.Circle
            style={styles.loading}
            indeterminate={this.state.isLoading}
            direction="counter-clockwise"
            color={colors.white}
          />
        </View>
      )
    }
    else {
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
              <View style={{ marginTop: 20 }}>
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
                        onSubmitEditing={() => this.onLoginPress()}
                        value={this.state.password}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.buttonNewRound}
                      // onPress={() => this.loginPress()}
                      onPress={() => this.onLoginPress()}
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
            {this.state.visibleLoading && <Progress.Circle
              style={styles.loading}
              indeterminate={this.state.visibleLoading}
              direction="counter-clockwise"
              color={colors.white}
            />
            }
          </Container>
        </StyleProvider>
      );
    }
  }

  onRegisterPress() {
    Function.Register(
      this.props.navigation
    )
  }

  valueChecker() {
    if (this.state.email != '' && this.state.password != '') {
      return true
    }
    else {
      if (this.state.email == '') {
        Alert.alert('Error', 'Please fill email field', [{ text: 'Ok' }])
        return false
      }
      else {
        Alert.alert('Error', 'Please fill password field', [{ text: 'Ok' }])
        return false
      }
    }
  }

  async onLoginPress() {
    if (this.valueChecker() == true && this.state.visibleLoading == false) {
      this.setState({ visibleLoading: true })

      const LoginProcess = await Networking.Login(
        this.state.email,
        this.state.password,
      )

      if (LoginProcess != null) {
        this.setState({
          visibleLoading: false,
        })

        this.renderHome()
      } else {
        this.setState({ visibleLoading: false })
        this.ableToEdit();
      }
    }
  }

  ableToEdit = () => {
    this.setState({ visibleLoading: false })
    if (this.refs["1"] != null) {
      this.refs["1"].setNativeProps({ editable: true })
    }
    if (this.refs["2"] != null) {
      this.refs["2"].setNativeProps({ editable: true })
    }
  }

  renderHome() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    })

    this.props.navigation.dispatch(resetAction)
  }

  async checkUserLogin() {
    const response = await Networking.getCurrentUser()
    if (response != null) {
      console.log('success get user first, ' + JSON.stringify(response))
      this.setState({
        isLoading: false,
      });
      this.renderHome()
    } else {
      console.log('success get user two, ' + JSON.stringify(response))
      setTimeout(() => Alert.alert('Info', 'Your session is ended. Please login again', [{ text: 'Ok' }]), 100);

      this.setState({
        isLoading: false,
      });
    }
  }

}

export default Login;
