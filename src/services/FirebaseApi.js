import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const config = {
    apiKey: "AIzaSyAocU4M7YzV1xYM8J0k2jpUgz6Pb3lDiAU", 
    authDomain: "todomanager-a5196.firebaseapp.com", 
    databaseURL: "https://todomanager-a5196.firebaseio.com",
    projectId: "todomanager-a5196",
    storageBucket: "todomanager-a5196.appspot.com",
    messagingSenderId: "130887391750",
    appId: "1:130887391750:web:ddb267e74665ae2a"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase .auth().createUserWithEmailAndPassword(email, password); 
    return user;
}

export async function signInOnFirebaseAsync(email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user; 
}

export async function signOutOnFirebaseAsync() {
    await firebase.auth().signOut();
}

export const currentFirebaseUser = () => { 
    return new Promise((resolve, reject) => {
        var unsubscribe = null; 
        unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user === null) {
                resolve(user)
            } else {
                firebase.database().ref(user.uid).once('value', (snapshot) => {
                    var usr = { ...user, ...snapshot.val(),  }
                    resolve(usr); 
                });
            }
        }, (error) => {
            reject(error); 
        }, () => {
            unsubscribe(); 
        });
    });
}

export const writeTaskOnFirebaseAsync = async (task) => { 
    const user = await currentFirebaseUser();
    var tasksReference = firebase.database().ref(user.uid);
    const key = task.key ? task.key : tasksReference.child('tasks').push().key;

    return await tasksReference.child(`tasks/${key}`).update(task);
}

export const readTasksFromFirebaseAsync = async (listener) => { 
    const user = await currentFirebaseUser();
    var tasksReference = firebase .database().ref(user.uid).child('tasks');
    tasksReference.on('value', (snapshot) => {
        var tasks = []; 
        snapshot.forEach(function (element) {
            var task = element.val(); 
            task.key = element.key; 
            tasks.push(task);
        });
        listener(tasks); 
    });
}


export const uploadImageOnFirebaseAsync = async (uri) => { 
    const user = await currentFirebaseUser();
    return new Promise( async (resolve, reject) => {
        const ext = uri.split('.').pop();
        const fileURI = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const data = await fs.readFile(fileURI, 'base64');
        const blob = await Blob.build(data, { type: `application/octet-stream;BASE64`})
        var imageReference = firebase.storage().ref(`${user.uid}`).child(`/profile.${ext}`);
        imageReference.put(blob, { contentType: 'application/octet-stream' }).on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS || snapshot.bytesTransferred === snapshot.totalBytes) {
                imageReference.getDownloadURL().then(photoURL => {
                    writePhotoURLOnFirebaseAsync(photoURL).then(() => {
                        resolve(photoURL)
                    }).catch((error) => reject(error))
                }).catch((error) => reject(error))
            }
        }, error => {
            unsubscribe();
            reject(error)
        })
    });    
}

export const writePhotoURLOnFirebaseAsync = async (photoURL) => { 
    const user = await currentFirebaseUser();
    var userReference = firebase.database().ref(user.uid);
    return await userReference.update({ photoURL })
}

