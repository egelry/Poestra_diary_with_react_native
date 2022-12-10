import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomePage from './src/screens/HomePage';
import moment from 'moment'
import 'moment/locale/tr'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from './src/screens/ProfilePage';
import CreateDayPage from './src/screens/CreateDayPage';
import SavedList from './src/components/profilepage_components/saved_components/SavedList';
import DayContent from './src/screens/DayContent';
import CreateUserPage from './src/screens/CreateUserPage';
import { Provider } from 'react-redux';
import RouterPage from './src/screens/Router';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import DayRouter from './src/screens/DayRouter';

const Stack = createStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <NavigationContainer>
          <StatusBar
            backgroundColor="white"
            animated={true}
            barStyle='dark-content' />
          <Stack.Navigator initialRouteName="RouterPage" >
            <Stack.Screen options={{ headerShown: false }} name="RouterPage" component={RouterPage} />
            <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
            <Stack.Screen options={{ headerShown: false }} name="CreateDayPage" component={CreateDayPage} />
            <Stack.Screen options={{ headerShown: false }} name="ProfilePage" component={ProfilePage} />
            <Stack.Screen options={{ headerShown: false }} name="SavedList" component={SavedList} />
            <Stack.Screen options={{ headerShown: false }} name="DayContent" component={DayContent} />
            <Stack.Screen options={{ headerShown: false }} name="CreateUserPage" component={CreateUserPage} />

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>

    </Provider>

  );
}


