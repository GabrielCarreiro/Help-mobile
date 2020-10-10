import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../hooks/auth';

const Stack = createStackNavigator();
const RootNavigator = ()  =>{
    const {user} = useAuth();
    
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false     
        }}>
            <Stack.Screen name="Root" component={user ? AppRoutes : AuthRoutes } />
        </Stack.Navigator>
    )
}

export default RootNavigator;
