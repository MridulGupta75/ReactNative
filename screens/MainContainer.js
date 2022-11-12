import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { 
    View, 
    Text, 
    Image,
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    DevSettings,
} from 'react-native';

import Feed from './Feed';
import Upload from './Upload';
import Reload from './Reload';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
            position:'absolute',
            bottom:25,
            left:20,
            right:20,
            elevation:0,
            backgroundColor:'#4b0082',
            borderRadius:15,
            height:90,
         ...styles.shadow
        }
      }}
      >
       
        <Tab.Screen name={"FEED"} component={Feed} 
        options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image
                    source={require('../assets/home-icon.png')}
                    resizeMode='contain'
                    style={{
                        width:45,
                        height:45,
                        tintColor:focused ? 'white':'#94a0a6'
                    }

                    }
                    />
                    <Text style={{color:focused ? 'white':'#94a0a6',fontSize:14}}>HOME</Text>
                    
                </View>

            ),
        }

        }
        />
        <Tab.Screen name={"POST"} component={Upload} 
        options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image
                    source={require('../assets/addition.png')}
                    resizeMode='contain'
                    style={{
                        width:36,
                        height:36,
                        tintColor:focused ? 'white':'#94a0a6'
                    }

                    }
                    />
                    <Text style={{color:focused ? 'white':'#94a0a6',fontSize:14}}>POST</Text>
                    
                </View>

            ),
        }

        }
        />


<Tab.Screen name="Loggging Out..." component={Reload}
        options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image
                    source={require('../assets/logout.png')}
                    resizeMode='contain'
                    style={{
                        width:45,
                        height:37,
                        tintColor:focused ? 'white':'#94a0a6'
                    }

                    }
                    />
                    <Text style={{color:focused ? 'white':'#94a0a6',fontSize:14}}>LOGOUT</Text>
                    
                </View>

            ),
        }

        }
        />



      </Tab.Navigator>
    // </NavigationContainer>
  );
}
 
 const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#5F5454',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,

    }

 }
 
 );
 export default MainContainer;
