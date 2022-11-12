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
    ActivityIndicator,
    state,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { database, firebase} from '../firebase';
import { getDatabase, ref, set} from "firebase/database";
import {LinearGradient} from 'expo-linear-gradient';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export default function Upload({navigation}) {


   const [isLoading,setisLoading]=useState(false);

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

    function writeUserData(userId,imageUrl) {
      const db = getDatabase();
      
      set(ref(db, 'users/' + userId), {
        userId:userId,
        profile_picture : imageUrl,
        count:0,
      }).then(()=>{
       console.log("data updatated");
      })
      .catch((error)=>{
        alert(error);
       })
      return
    };
  



    const uploadImage = async () => {
         setisLoading( true );

        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);
        })
        let uuuid=uuidv4();
        const ref = firebase.storage().ref().child(uuuid)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setImage(url)
               writeUserData(uuuid,url);
               setisLoading(false);
              Alert.alert(
                "SUCCESS",
                "You have successfully Posted",
                [
                    {
        
                        text: "Ok",
                        onPress: () => navigation.navigate('FEED', { screen: 'Feed' }),
                      style: "Ok"
                    }
                ]
              );
              blob.close()
              return url
            })
          }
         
          )
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
              onPress={uploadImage}
             >
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
            <ActivityIndicator size="large" animating={isLoading} />
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