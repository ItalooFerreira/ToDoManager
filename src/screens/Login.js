import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Image, 
    TextInput,  
    Text,
    Alert
} from 'react-native';
import { ActionButton, Input } from '../components/Components' 
import { StackActions, NavigationActions } from 'react-navigation';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';


const img = require('../assets/todo-icon.png');

export default class Login extends Component {
    static navigationOptions = {
        header: null 
    };
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <View style={styles.topView}>
                        <Image style={styles.img} source={img} />
                    </View>
                    <View style={styles.bottomView}>

                    <Input 
                        style={styles.input} 
                        value={this.state.email}
                        placeholder='Email' 
                        keyboardType={'email-address'} 
                        autoCapitalize='none'
                        onChangeText={ email => this.setState({ email }) }/>

                    <Input 
                        style={styles.input} 
                        placeholder='Password' 
                        secureTextEntry={true}
                        onChangeText={ password => this.setState({ password }) } /> 

                    <ActionButton 
                        title='Sign In' 
                        onPress={() => this.signInAsync()} />

                    <View style={styles.textConteiner}>
                        <Text>Not a member? Let's </Text>
                        <Text 
                            style={styles.textRegister}
                            onPress={ () => {
                                const { navigate }  = this.props.navigation;
                                navigate('pageRegister');
                            }}>
                            Register
                        </Text>
                    </View>
                        
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    async signInAsync() {
        try {
            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            const resetNavigation = StackActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName:'pageTasksList' }) ]
            });
            this.props.navigation.dispatch(resetNavigation);

        } catch (error) {
            Alert.alert("Login Failed", error.message); 
        }
    }
}

const styles = StyleSheet.create({ 
container: {
    flex: 1,
    flexDirection: 'column',
},
topView: {
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40,
    paddingVertical: 20
}, 
img: {
    width: 150,
    height: 150
},
bottomView: { 
    flexDirection: 'column', 
    paddingRight: 20, 
    paddingLeft: 20
}, 
input: {
    marginBottom: 30 
},
textConteiner: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20
}, 
textRegister: {
    fontWeight: 'bold' 
}
});