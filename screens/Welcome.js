import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Welcome({navigation}) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace('Landing')
        },5000);
   
    }, [])
    
  return (
    <View style={styles.container}>
    <Image source={{uri:'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-electric-car-connected-to-power-station-charger-on-white-background-png-image_4907507.png'}} style={styles.logo} />
    <Text style={styles.title}>EV Car Charging</Text>
    <Text style={styles.subtitle}>Free To Glance</Text>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
},
logo: {
  width: "100%",
  height: 200,
  marginBottom: 24,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: 8,
},
subtitle: {
  fontSize: 16,
  fontWeight: 'normal',
  color: '#666666',
},
});