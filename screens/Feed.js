import { View, Text ,Image,StyleSheet,TouchableOpacity,FlatList,ScrollView,ActivityIndicator,DevSettings,BackHandler,Alert} from 'react-native'
import React ,{useState,useEffect}from 'react';
import { database, firebase} from '../firebase';
import { getDatabase, ref, set,onValue, child,update } from "firebase/database";
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
var x=0;
var array=[];

export default function Feed({navigation}) {
  const [value,setvalue]=useState([]);
  const[userLike,setLike]=useState(false);
  
   function hello()
   {
    
      array=[];
      x=0;
      navigation.navigate('Login')
      
   }

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit You will Be sign Out?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () =>hello()},
                      
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);



    function userfun(useridtosearch)
    {
      console.log(array);
      for(let i=0;i<array.length;i++)
      {
        if(useridtosearch.localeCompare(array[i])==0)
        return false;
        
      }
      return true;
    }


  function readData(){
     const k=ref( database,'users/')
     onValue(k, (snapshot) => {
     var main=[];
      snapshot.forEach((child)=>{
       console.log(child.val().profile_picture);
        main.push({
         key:child.val().profile_picture,
         userId:child.val().userId,
          like:child.val().count,
          likeBut:false
         })
     })
     setvalue(main);
     main.sort((a,b)=>b.like-a.like)
   });
   }
   useEffect(()=>{
     readData();
     
     },[]);
     const renderItem =({item})=>(
       <View>
      <Image
          style={{width: 400, height:240,marginTop:60,borderRadius:30}}
          source={{uri:item.key}}
          />
   <TouchableOpacity onPress={()=>{
    const db = getDatabase();
    if(userfun(item.userId)){
     setLike(false);
    if(!userLike)
    {
      array[x]=item.userId;
      x=x+1;
    update(ref(db, 'users/'+item.userId), {
      count:item.like+1,
    }).then(()=>{
     console.log("data updatated");
     console.log(array);
     setLike(true);
    })
    .catch((error)=>{
      alert(error);
     })
    }
  }
 }}
 >
    <Image
      source={require('../assets/like.png')}
      resizeMode='contain'
      style={{
      width:40,
      height:30,
      marginLeft:30,
      marginTop:9,
      tintColor:'black',
      }

      }
      />
      </TouchableOpacity>
      <Text style={{marginLeft:25,fontWeight:"bold",fontSize:14}}
      >{item.like} Likes</Text>
      </View>

     );


  return (
    <View style={{flex:1,alignItems:"center",alignContent:"center",justifyContent:"center"}}>
        <View style={{}}>
          <Text style={{fontSize:40,fontStyle:"oblique",fontWeight:"bold",marginTop:5}}
            >
            IMAGES
          </Text>
          <Text style={{color:'red'}}>Double tap on Like Button</Text>
        </View>

      <FlatList
      data={value}
     renderItem={renderItem}
     showsVerticalScrollIndicator ={false}
    showsHorizontalScrollIndicator={false}
     keyExtractor={(item)=>item.key}
     ListFooterComponent={()=>(
        <View style={{marginBottom:150}}
        ></View>
     )
    }
      />
    
    </View>
  )
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