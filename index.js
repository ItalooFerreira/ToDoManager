/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';
import Routes from './src/routes/Routes';
import { initializeFirebaseApi } from './src/services/FirebaseApi';

const wrappedRoutes = () => {
    return (
        <Routes />
    );
}

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseApi();
    return wrappedRoutes
});
