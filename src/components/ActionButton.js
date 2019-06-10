import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class ActionButton extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({ 
container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C6FAD',
    height: 40,
    borderRadius: 4
},
title: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white'
}, 
});