import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, View , TouchableOpacity,Platform, Text,Image,TextInput, ToastAndroid } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
import { Constants, takeSnapshotAsync } from 'expo';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import marker from "../assets/icons8-marker.png";
import * as Location from "expo-location";
import { FAB } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import Search from './component/Search';
import * as Sharing from "expo-sharing";
import * as Permissions from 'expo-permissions';
import { ImageManipulator } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [pickpoints, handlepickpoints] = useState("- Your Location -");
  const [mypoints, handlemypoints] = useState([]);
 
//   const captureAndShareScreenshot = async () => {
//     try {
//       const { status } = await Permissions.getAsync(Permissions.CAMERA);
//       if (status !== 'granted') {
//         throw new Error('Permission to media library was not granted');
//       }
  
//       const uri = await captureRef(viewShot, {
//         format: 'webm',
//         quality: 0.8,
//       });
  
      
//       const { uri: resizedUri } = await manipulateAsync(
//         uri,
//         [
//           { rotate: 90 },
//           { flip: FlipType.Vertical },
//         ],
//         { compress: 1, format: SaveFormat.PNG } // or need add this
//       );
//       const asset = await MediaLibrary.createAssetAsync(resizedUri);
//       await MediaLibrary.createAlbumAsync('Expo Screenshots', asset, false);
//       console.log('Screenshot saved to Expo Screenshots album');
  
//       await Sharing.shareAsync(asset.uri);
//       console.log('Screenshot shared');
//     } catch (error) {
//       console.error('Error while capturing and sharing screenshot:', error);
//     }
//   };
  const captureAndShareScreenshot =  async () => {
       viewShot.current.capture().then((uri) => {
       console.log("do something with ", uri);
        Sharing.shareAsync("file://" + uri)
       ToastAndroid('Captured')
       }),
       (error) => console.error("Oops, snapshot failed", error);
       };
  useEffect(() => {
    (async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
          }
     
  
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    
    
    
      })();
  
  }, []);
  const onRegionChange = (region) => {
    setRegion(region);
    handlemypoints([region.latitude, region.longitude]);
  };
  const chargersData = require('./chargers.json');

  const viewShot = useRef(null);
  // const handleScreenshot = async () => {
  //   const uri = await mapRef.current.capture({ format: 'webm' });
  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri,
  //     type: 'image/webp',
  //     name: 'map-screenshot.webp',
  //   });
  //   const response = await axios.post(
  //     'http://3.7.20.173:8503/api/upload/',
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //   );
  //   console.log(response.data);
  // };
  const handleScreenshot = async () => {
    const uri = await viewShot.current.capture();
    
    console.log(uri); // the URI of the captured screenshot
  };
  
  return (
   
   
    <ViewShot ref={viewShot}  options={{ format: "jpg", quality: 0.9 }} style={{ flex: 1, marginTop:60 }}  >

<Search />
    <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChange}
          showsUserLocation={true} //to show user current location when given access
          loadingEnabled={true} //to show loading while map loading
          showsMyLocationButton={true}
          showCompass={true} 
						rotateEnabled={true}
            
            />
       <View  style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        
      <View style={{padding:5}}>
        <View style={{backgroundColor:'black',borderRadius:20,padding:10,width:"50%",position:'absolute',bottom:30,left:5,}}>
        {chargersData.chargers.map((charger) => (
       
        <View >
          {charger.id == 'a001' &&(
             <View key={charger.id}>
              <View style={{flexDirection:'row',padding:5}}>
          <Text style={{color:'white',fontWeight:'800',fontSize:14}}>{ charger.name.split(' - ')[0]}...</Text>
          <Image style={{tintColor:'red',height:20,width:20 ,marginLeft:5}} source={{uri:"https://cdn-icons-png.flaticon.com/128/253/253802.png"}}></Image>
          </View>
          <View style={{flexDirection:'row',}}>
          <Text style={{color:'silver',fontWeight:'800',fontSize:12}}>{charger.address}{" "}
          <Text style={{color:'red',}}>{charger.distance} {charger.distance_metrics}</Text></Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{color:'green',fontWeight:'900',fontSize:12}}>SUPPORTED CONNECTIONS</Text>
            </View>
            <View>
            {charger.connector_types.map(connector => (
              <View style={{flexDirection:'column',}}>
<View style={{flexDirection:'row',padding:10}} key={connector.type}>
<Image source={{ uri: connector.icon }} style={{ width: 20, height: 20,tintColor:'white' }} />
<Text style={{color:'white',fontWeight:'800',fontSize:14,marginLeft:10}}>{connector.type}</Text>
</View>
<Text style={{color:'green',fontWeight:'800',fontSize:14,marginLeft:10}}>{connector.FastCharge}</Text>

</View>

))}
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9536/9536065.png" }} style={{marginTop:10, width: 25, height: 25,tintColor:'white' }} />
            </View>
          </View>
          
          )}
         
        </View>
     
      ))}
      </View>
      <View style={{backgroundColor:'black',borderRadius:20,padding:10,width:"50%",position:'absolute',bottom:25,left:215,}}>
        {chargersData.chargers.map((charger) => (
       
        <View >
          {charger.id == 'a002' &&(
             <View key={charger.id}>
              <View style={{flexDirection:'row',padding:5}}>
          <Text style={{color:'white',fontWeight:'800',fontSize:14}}>{ charger.name.split(' - ')[0]}...</Text>
          <Image style={{tintColor:'red',height:20,width:20 ,marginLeft:5}} source={{uri:"https://cdn-icons-png.flaticon.com/128/253/253802.png"}}></Image>
          </View>
          <View style={{flexDirection:'row',}}>
          <Text style={{color:'silver',fontWeight:'800',fontSize:12}}>{charger.address}{" "}
          <Text style={{color:'red',}}>{charger.distance} {charger.distance_metrics}</Text></Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{color:'green',fontWeight:'900',fontSize:12}}>SUPPORTED CONNECTIONS</Text>
            </View>
            <View>
            {charger.connector_types.map(connector => (
              <View style={{flexDirection:'column',}}>
<View style={{flexDirection:'row',padding:10}} key={connector.type}>
<Image source={{ uri: connector.icon }} style={{ width: 20, height: 20,tintColor:'white' }} />
<Text style={{color:'white',fontWeight:'800',fontSize:14,marginLeft:10}}>{connector.type}</Text>
</View>
<Text style={{color:'green',fontWeight:'800',fontSize:14,marginLeft:10}}>{connector.FastCharge}</Text>

</View>

))}
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9536/9536065.png" }} style={{marginTop:10, width: 25, height: 25,tintColor:'white' }} />
            </View>
          </View>
          
          )}
         
        </View>
     
      ))}
      </View>
      </View>
        <TouchableOpacity
          style={{flex:0 }}
          activeOpacity={0.7}
        // onPress={handleScreenshot}
        onPress={captureAndShareScreenshot}
        >
          <FAB
            small
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
              borderRadius: 30,
              backgroundColor:"red"
            }}
            icon="camera"
          color='white'
          />
        </TouchableOpacity>
      </ViewShot>
     

    
  )
      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  markerFixed1: {
    left: "20%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "20%",
  },
  marker: {
    height: 40,
    width: 40,
    tintColor:'red'
  },
  map: {
    flex: 1,
  },
  linearGradient: {
   
  },
  searchInput: {
    height: 40,
    width: '80%',
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});