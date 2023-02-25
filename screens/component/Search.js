import { StyleSheet,TextInput, Text, View,Platform } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
export default function Search() {
  return (
    <View style={{flexDirection:'row',marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,}}>
    <Entypo name="menu" size={25} style={{margin:15,}}/>
      
            <View style={{flexDirection:'row', height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,backgroundColor:'black',}}> 
    
            <TextInput
              style={styles.searchInput}
              placeholder="Search for compatible chargers"
              placeholderTextColor="#fff"
            />
            </View>
         
          </View>
  )
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        width: '80%',
        color: '#fff',
        paddingHorizontal: 10,
        fontSize: 16,
      },
})