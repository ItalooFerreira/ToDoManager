import React, { Component } from 'react';
import { 
    View, 
    Alert,
    Switch, 
    Text, 
    Button, 
    StyleSheet 
} from 'react-native';
import { writeTaskOnFirebaseAsync } from '../services/FirebaseApi';
import { ActionButton, Input } from '../components/Components';

export default class Task extends Component { 
    static navigationOptions = {
        title: 'Task'
    } 
    constructor(props) {
        super(props);

        const task = this.props.navigation.state.params.task || {}
        this.state = {
            key: task.key || null,
            title: task.title || null,
            description: task.description || null, 
            priority: task.priority || null, 
            isDone: task.isDone || null
        }
    }

    render() {
        return (
            <View style={styles.container}> 
                <Input 
                    style={styles.input}
                    placeholder='Title'
                    value={this.state.title}
                    onChangeText={(value) => this.setState({ title: value })} />

                <Input 
                    style={[styles.input, styles.multilineInput]} 
                    placeholder='Description'
                    multiline={true} 
                    numberOfLines={4} 
                    value={this.state.description}
                    onChangeText={(value) => this.setState({ description: value })} /> 
                    
                <View style={styles.switchContainer}>
                    <Switch 
                        value={this.state.priority}
                        onValueChange={(value) => this.setState({ priority: value })} 
                        value={this.state.priority}
                        trackColor={ {false: '#e4e4e4', true: '#2C6FAD'}}
                        />

                    <Text style={styles.switchText}>Hight Priority</Text> 
                </View>

                <View style={styles.switchContainer}> 
                    <Switch 
                        value={this.state.isDone}
                        onValueChange={(value) => this.setState({ isDone: value })}
                        value={this.state.isDone}
                        trackColor={ {false: '#e4e4e4', true: '#2C6FAD'}} />

                    <Text style={styles.switchText}>Is Done?</Text>
                </View>

                <ActionButton 
                    title='Save'
                    onPress={() => this._saveTaskAsync()} />
            </View>
        ); 
    }

    async _saveTaskAsync() { 
        var task = {
            key: this.state.key,
            title: this.state.title, 
            description: this.state.description, 
            priority: this.state.priority, 
            isDone: this.state.isDone
        };
        try {
            await writeTaskOnFirebaseAsync(task); 
            this.props.navigation.goBack();
        } catch (error) {
            Alert.alert("Erro Saving", error.message); 
        }
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column', 
    padding: 20,
}, 
input: {
    marginBottom: 30 
},
multilineInput: { 
    height: 100
}, 
switchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
    paddingBottom: 20
}, 
switchText: {
    marginLeft: 10, 
    color: 'black', 
    fontSize: 18
} 
});