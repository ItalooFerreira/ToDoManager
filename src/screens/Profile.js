import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { signOutOnFirebaseAsync } from '../services/FirebaseApi';
import { ActionButton, ProfileItem } from '../components/Components';
import { StackActions, NavigationActions } from 'react-navigation';
import { currentFirebaseUser, uploadImageOnFirebaseAsync } from '../services/FirebaseApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = {
    title: 'Choose Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const img = require('../assets/avatar-icon.png');
const imgProfile = require('../assets/profile-icon.png');

export default class Profile extends Component {
    static navigationOptions = { 
        tabBarLabel: 'Profile', 
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgProfile} style={[styles.icon, { tintColor }]} /> 
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            source: null,
            uploading: false,
        }
    }

    async componentDidMount() {
        const user = await currentFirebaseUser()
        const uri = user.photoURL ? { uri: user.photoURL } : img
        this.setState({ email: user.email, source: uri })
    }

    render() {
        const { email, source, uploading } = this.state;
        return (
            <View style={styles.container} >
                <View style={styles.containerImg}>
                    <TouchableOpacity onPress={() => this._onClickPickImage()}>
                        <Image style={styles.img} source={source} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemsContainer}>
                { uploading && <Text style={styles.progressText}>{`Uploading...`}</Text> }
                    <ProfileItem title="Email" description={email} />
                    <TouchableOpacity onPress={() => this._goToAbout()}>
                        <ProfileItem title="About" selectable />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <ActionButton 
                        title='Logout'
                        onPress={() => this.signOutAsync()} />
                </View>
            </View> 
        );
    } 

    async signOutAsync() {
        try {
            await signOutOnFirebaseAsync();
            const resetNavigation = StackActions.reset({ 
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'pageLogin' })] 
            });
            this.props.navigation.dispatch(resetNavigation);
        } catch (error) {
            Alert.alert("Logout Failed", error.message); 
        }
    }

    _goToAbout() {
        const { navigate } = this.props.navigation;
        navigate('pageAbout');
    }

    _onClickPickImage() {
        const { uploading } = this.state;
        if (uploading) return;
        ImagePicker.showImagePicker(options, async response => {
            if (response.didCancel) return;
            if (response.error) {
                Alert.alert("An error occured ", response.error); 
            } else {
                await this._uploadImageAsync(response.uri);
            }
        });
    }

    async _uploadImageAsync(uri) {
        const source = { uri };
        this.setState({ source, uploading: true, progress: 0 });
        try {
            await uploadImageOnFirebaseAsync(uri)
            this.setState({ uploading: false })
        } catch (error) {
            this.setState({ uploading: false })
            Alert.alert("An error occured ", error);
        }
    }
}

const styles = StyleSheet.create({ 
container: {
    flex: 1,
    paddingLeft: 10, 
    paddingRight: 10,
}, 
containerImg: {
    justifyContent: 'center',
    alignItems: 'center'
},
icon: {
    width: 26,
    height: 26 
},
img: {
    marginVertical: 20,
    borderRadius: 70,
    width: 140,
    height: 140
},
itemsContainer: {
    flex: 1,
    marginVertical: 10
}, 
buttonContainer: {
    marginVertical: 20
},
progressText: {
    alignSelf: 'center',
    color: 'gray',
    marginBottom: 10
}
});