import React from 'react'
import { createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/Login';
import SignUp from '../pages/signUp'

const Auth= createStackNavigator();

const AuthRoutes = () =>{
    return(
        <Auth.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false,       
        }}>
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="SignUp" component={SignUp} />
        </Auth.Navigator>
    )
}
export default AuthRoutes;