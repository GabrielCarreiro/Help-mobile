import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Project from '../pages/_project'
import AllTasks  from '../pages/tasks';
import Chat from '../pages/chat';
/*  <Auth.Screen name="Tasks" 
                component={AllTasks } />

                 <Auth.Screen name="Tasks" 
                component={Tasks} />
            
            <Auth.Screen name="Chat" 
                component={Chat} /> */

const Auth= createMaterialTopTabNavigator();

const AppRoutes = () =>{
    return(

        <Auth.Navigator 
            initialRouteName="HELP"
            tabBarOptions={{
                style: { backgroundColor: 'rgb(64,62,63)' },
                labelStyle: { color: '#fff' },
                indicatorStyle: { backgroundColor: 'rgba(239,80,40,131)'}   
            }}>
            <Auth.Screen name="HELP" 
                component={Project} />

            <Auth.Screen name="Tasks" 
                component={AllTasks } />

            <Auth.Screen name="Chat" 
                component={Chat} /> 
           
           
                
        </Auth.Navigator>
    )
}

export default AppRoutes;