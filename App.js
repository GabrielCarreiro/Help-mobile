import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import Project from './src/pages/_project';
import AppProvider from './src/hooks';
import RootNavigator from './src/routes'
import './src/services/firebase';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
      <SafeAreaProvider style={{paddingTop:24}}>     
          <StatusBar style="light" backgroundColor='rgb(64,62,63)' />
            <NavigationContainer>
              < AppProvider>
                < RootNavigator/>
              </AppProvider>
            </NavigationContainer>
      </SafeAreaProvider>
    
  );
}


