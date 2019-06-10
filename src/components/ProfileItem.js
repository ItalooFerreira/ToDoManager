import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileItem extends Component {

    render() {
        const { title, description, selectable } = this.props;
        const titleStyle = selectable ? styles.titleSelectable : styles.title
        return (
            <View style={styles.container} >
                <View style={styles.rowContainer}>
                <Text style={titleStyle}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.separator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    title: {
        marginVertical: 20,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#202020'
    },
    titleSelectable: {
        marginVertical: 20,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2C6FAD'
    },
    description: {
        marginVertical: 20,
        marginRight: 15,
        fontSize: 15,
        alignSelf: 'flex-end'
    },
    separator: {
        marginLeft: 10,
        height: 1,
        backgroundColor: '#f2f2f2'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});