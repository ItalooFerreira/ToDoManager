/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView ref='main' style={styles.container}>

        <View ref='first' style={styles.first}> 
          <View style={styles.subView} /> 
          <View style={styles.subView} /> 
          <View style={styles.subView} />
        </View>

        <View ref='second' style={styles.second}> 
          <View style={styles.subView} />
          <View style={styles.subView} />
          <View style={styles.subView} />
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    flexDirection: 'column' 
  },
  first: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    margin: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  second: {
    flex: 2,
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    alignItems: 'flex-end',
    margin: 40,
    borderColor: 'red', 
    borderWidth: 1
  }, subView: {
    height: 50,
    width: 50, 
    backgroundColor: 'skyblue'
  }, 
});