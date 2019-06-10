import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TaskListView } from '../components/Components';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';

const imgCheckList = require('../assets/checklist-icon.png');
const imgPlus = require('../assets/plus-icon.png');

export default class ToDoTasks extends Component {
 
    static navigationOptions = { 
        tabBarLabel: 'To Do', 
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgCheckList} style={[styles.icon, { tintColor }]} /> 
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            tasks: [] 
        }
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this)); 
    }

    render() {
        return (
            <View style={styles.container}>
                <TaskListView 
                    tasks={this.state.tasks} 
                    navigation={this.props.navigation}
                />
                <TouchableOpacity 
                    style={styles.floatButton}
                    onPress={() => this._goToTask()} >
                    
                    <Image source={imgPlus} style={styles.img} /> 
                </TouchableOpacity>
            </View> 
        );
    }

    _goToTask() { 
        this.props.navigation.navigate('pageTask', {});
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => !t.isDone);
        this.setState({ tasks: tasksToDo }); 
    }
}

const styles = StyleSheet.create({ 
container: {
    flex: 1,
    flexDirection: 'column', 
    paddingLeft: 10, 
    paddingRight: 10,
    backgroundColor: '#F0F0F0'
}, 
icon: {
    width: 26,
    height: 26 
},
img: {
    width: 50,
    height: 50 
},
floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20
}
});