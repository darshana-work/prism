// In App.js in a new project

import * as React from 'react';

import Homepage from '../screens/homepage/Homepage';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="homepage"
          component={Homepage}
          options={{headerShown: true, title: 'Prism.', headerTintColor: '#000043' ,headerStyle: {backgroundColor: 'white', borderBottomColor: '#000043'}}}
        />
      </Stack.Navigator>
    );
  };

export default function Main() {
  return <HomeStack />;
}