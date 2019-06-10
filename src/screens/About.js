import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProfileItem } from '../components/Components';



export default class Profile extends Component {
    static navigationOptions = {
        title: 'About'
    } 

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.itemsContainer}>
                    <ProfileItem title="Developed by" description={'Ítalo Ferreira Carvalho'} />
                    <ProfileItem title="Registration Number" description={'1831088014'} />
                    <ProfileItem title="Professor" description={'Guilherme Moreira'} />
                </View>
            </View> 
        );
    } 
}

const styles = StyleSheet.create({ 
container: {
    flex: 1,
    paddingLeft: 10, 
    paddingRight: 10,
}, 
itemsContainer: {
    flex: 1,
    marginVertical: 10
}, 
});