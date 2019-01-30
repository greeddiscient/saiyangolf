import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import {
  Text,
  Input,
} from 'native-base';
import styles from '../../config/styles';

class Putting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      putts: '',
      noPutts: 0,
      score: 0,
      strokesGained: 0
    };
  }

  onChangePutt(event) {
    var value = event.nativeEvent.text
    this.setState({
      putts: value
    })
  }

  finishPutt() {
    this.props.finishHole(this.state.distance, this.state.putts)
  }

  render() {
    return (
      <View>
        <View style={styles.puttingContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textTitleBase}>
              Putting
          </Text>
            <Text style={styles.baseText}>
              Distance on Green (in Feet)
          </Text>
          </View>
          <Input
            style={styles.textInput}
            onChangeText={(distance) => this.setState({ distance })}
            value={this.state.distance}
            keyboardType='numeric'
          />
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.textTitleBase}>
              Number of Putts
        </Text>
          </View>
          <Input
            style={styles.textInput}
            onChange={this.onChangePutt.bind(this)}
            value={this.state.putts}
            keyboardType='numeric'
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.longButton}
            onPress={this.finishPutt.bind(this)}
          >
            <Text style={styles.textLongButton}>Finish Hole</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Putting;
