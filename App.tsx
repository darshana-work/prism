/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './app/navigation/main';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode? 'light-content' : 'dark-content'} />
        <Main/>
      </SafeAreaView>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
