import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; 
import { Login, Register, ToDoTasks, DoneTasks, App, Task, Profile, About } from '../screens/Screens';

const taskListBottomTabNavigator = createBottomTabNavigator({ 
    pageToDoTasks: { screen: ToDoTasks, title: 'To Do' },
    pageDoneTasks: { screen: DoneTasks, title: 'Done' },
    pageProfile: { screen: Profile, title: 'Profile' } 
},
{
    tabBarOptions: {
        activeTintColor: '#2C6FAD',
    } 
});

const RootStack = createStackNavigator(
{
    pageApp: { screen: App },
    pageLogin: { screen: Login }, 
    pageRegister: { screen: Register },
    pageTasksList: {
        screen: taskListBottomTabNavigator, 
        navigationOptions: {
            ...Platform.select({ 
                ios: { title: 'Task List' },
                android: { header: null }
            }) 
        }
    },
    pageTask: { screen: Task },
    pageAbout: { screen: About }
}, 
    { 
      headerMode: 'screen',
      defaultNavigationOptions: {
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2C6FAD',
        }
      } 
    }
);

export default Routes = createAppContainer(RootStack);

