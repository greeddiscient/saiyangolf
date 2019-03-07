
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  RefreshControl,
  ScrollView,
  Platform,
  AsyncStorage,
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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      username: '',
      email: '',
      password: '',
      confirmPass: '',
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

  loginCheck() {
    try {
      if (this.state.tokens == null || this.state.tokens == "") {
        this.setState({ isLoading: false });
      } else {
        this.renderHome()
      }
    } catch (e) {
      setTimeout(() => this.setState({ isLoading: false }), 200);
    }
  }

  render() {
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
                        placeholder='Username'
                        placeholderTextColor={colors.darkGrey4}
                        style={styles.textInputAuth}
                        onChangeText={username => this.setState({ username })}
                        onSubmitEditing={() => Function.focusNextField(this, "2")}
                        value={this.state.username}
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
                        onSubmitEditing={() => this.onRegisterPress()}
                        value={this.state.confirmPass}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.buttonNewRound}
                      onPress={() => this.onRegisterPress()}
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
            {this.state.visibleLoading && <Progress.Circle
              style={styles.loading}
              indeterminate={this.state.visibleLoading}
              direction="counter-clockwise"
            />
            }
          </Container>
        </StyleProvider>
      );
    }
  }

  onLoginPress() {
    Function.Login(
      this.props.navigation
    )
  }

  valueChecker() {
    if (this.state.username != '' &&
      this.state.email != '' &&
      this.state.password != '' &&
      this.state.confirmPass != '' &&
      this.state.password == this.state.confirmPass) {
      return true
    }
    else {
      if (this.state.username == '') {
        Alert.alert('Error', 'Please fill username field', [{ text: 'Ok' }])
        return false
      }
      else if (this.state.email == '') {
        Alert.alert('Error', 'Please fill email field', [{ text: 'Ok' }])
        return false
      }
      else if (this.state.password == '') {
        Alert.alert('Error', 'Please fill password field', [{ text: 'Ok' }])
        return false
      }
      else if (this.state.confirmPass == '') {
        Alert.alert('Error', 'Please fill confirm password field', [{ text: 'Ok' }])
        return false
      }
      else if (this.state.password != this.state.confirmPass) {
        Alert.alert('Error', "The new password confirmation does not match.", [{ text: 'Ok' }])
        return false;
      } else {
        Alert.alert('Error', 'Please fill empty value', [{ text: 'Ok' }])
        return false;
      }
    }
  }

  async onRegisterPress(target) {
    if (this.valueChecker() == true && this.state.visibleLoading == false) {
      this.setState({ visibleLoading: true })
      var dataPost = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }

      console.log('register data, '+JSON.stringify(dataPost))

      const RegisterProcess = await Networking.Register(dataPost)
      if (RegisterProcess != null) {
        this.setState({
          visibleLoading: false,
        })

        Alert.alert("Success", "Member is successfully registered.", [
          {
            text: "Ok", 
            onPress: () => {
              this.renderHome()
              // this.props.navigation.goBack()
            }
          },
        ]);
        
        
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

  renderLogin() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ]
    })

    this.props.navigation.dispatch(resetAction)
  }


}

export default Register;
