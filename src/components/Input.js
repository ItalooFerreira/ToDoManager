import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class ActionButton extends Component {

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                <TextInput 
                    {...this.props} 
                    style={styles.input} 
                />
                <View style={styles.separator}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({ 
container: {
    marginVertical: 10,
    borderRadius: 4
},
input: {
    fontSize: 15,
}, 
separator: {
    top: 5,
    height: 1,
    backgroundColor: '#2C6FAD',
}
});