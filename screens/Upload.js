import React ,{useState,useEffect}from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    TextInput,
    Platform,
    Button,
    StyleSheet ,
    Alert,
    StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import { firebase} from '../firebase';
import {LinearGradient} from 'expo-linear-gradient';
export default function Upload() {


    const [image, setImage] = useState(null);
    const[uploading,setUploading]=useState(false)
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 4],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    const uploadImage = async () =>{
        const response=fetch(image);
        const blob=await response(blob);
        const filename=image.substring(image.lastIndexOf('/')+1);
        var ref=firebase.storage().ref().child(filename).put(blob);

        try{
            await ref;

        }catch(e){
         console.log(e);
        }
        setUploading(false);
        Alert.alert("photo Uploaded..");
        setImage(null);
    };



    const uploadCall=()=>{
   
        Alert.alert(
            "SUCCESS",
            "Image Successfull Uploaded To Firebase..",
            [
                {
    
                    text: "Ok",
                   
                  style: "Ok"
                }
            ]
          );
        
      
    }



    return (
      <View style={{top:100}}>
         <TouchableOpacity
              onPress={pickImage}>
              <View style={styles.button}>
                <LinearGradient
                   colors={['purple', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>PICK IMAGE</Text>
                </LinearGradient>
                </View>
            </TouchableOpacity>
       <View style={{border:3,top:30,bottom:30,alignItems:'center'}}>
        {image && <Image source={{ uri: image}} style={{ width: 300, height: 300 ,borderRadius:9,borderColor:'Blue'}} />}
       </View>
        <View style={{top:10}}>
        <TouchableOpacity
              onPress={uploadCall}>
              <View style={styles.button}>
                <LinearGradient
                   colors={['purple', '#01ab9d']}
                    style={styles.signIn}
                >   
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Upload</Text>
                </LinearGradient>
                </View>
            </TouchableOpacity>
      </View>
      </View>
    );
}

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