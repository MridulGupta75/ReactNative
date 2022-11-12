import React from 'react';
import {Text,View} from 'react-native'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Feed  from './screens/Feed';
import Upload from './screens/Upload';
import Reload from './screens/Reload';
import MainContainer from './screens/MainContainer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default  function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator screenOptions={{headerShown: false}} >       
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="MainContainer" component={MainContainer} />
      <Stack.Screen name="Reload" component={Reload}/>
    </Stack.Navigator>
      
     </NavigationContainer>
  );
}


