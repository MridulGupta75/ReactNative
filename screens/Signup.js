

import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebaseConfig } from '../firebase';
import {getAuth,createUserWithEmailAndPassword}from "firebase/auth";
import { initializeApp } from "firebase/app";

const Login = ({navigation}) => {
  const { colors } = useTheme();
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirmpass:'',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword:true,
});
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const handelsignup =()=>{
    if(data.confirmpass.localeCompare(data.password)==0)
    {
    createUserWithEmailAndPassword(auth,data.username,data.confirmpass)
    .then(userCredentials => {
      const user = userCredentials.user;
      Alert.alert(
        "Welcome",
        "You have successfully registered to SunshineIT",
        [
            {

                text: "Ok",
                onPress: () => navigation.navigate('Login'),
              style: "Ok"
            }
        ]
      );
      console.log('Registered with:', user.email);
    })
    .catch(error => alert(error.message))
  }
  else
  {
    Alert.alert(
        "Password Error",
        "Password doesn't match",
        
    );
  }

}

const textInputChange = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });
  }
}
const handlePasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
  }
}
const handleconfirmPasswordChange = (val) => {
  if( val.trim().localeCompare(data.password)==0) {
      setData({
          ...data,
          confirmpass: val,
          isValidConfirmPassword: true
      });
  } else {
      setData({
          ...data,
          confirmpass: val,
          isValidConfirmPassword: false
      });
  }
}
const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}
const updateConfirmSecureTextEntry = () => {
  setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
  });
}
  

    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#4b0082' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
          <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
            <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                  <Ionicons name="checkmark-circle-outline" color="green" size={20}/>
                    
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
          
          <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Ionicons name="eye-off" color="grey" size={20}/>
                    :
                    <Ionicons name="eye" color="grey" size={20}/>
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }




          <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleconfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    
                </TouchableOpacity>
            </View>
            { data.isValidConfirmPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password doesn't match</Text>
            </Animatable.View>
            }


            <TouchableOpacity
            onPress={handelsignup}>
              <View style={styles.button}>
                <LinearGradient
                   colors={['purple', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
               
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={[styles.signIn, {
                        borderColor: '#4b0082',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#4b0082'
                    }]}>Sign IN</Text>
                </TouchableOpacity>
          
         
          </Animatable.View>
            
            
          </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#4b0082'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });