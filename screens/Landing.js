import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:'https://png.pngtree.com/png-vector/20220712/ourmid/pngtree-electric-car-is-charging-at-electric-charger-station-near-the-city-png-image_5931533.png'}} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
    navigation.navigate('Map')
  }} style={styles.button}>
          <Text style={styles.buttonText}>Find Chargers</Text>
        </TouchableOpacity>
        <TouchableOpacity   style={styles.button}>
          <Text style={styles.buttonText}>My Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Battery Level</Text>
          <Text style={styles.infoValue}>Gurranted</Text>
        </View>
       
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Charging Status</Text>
          <Text style={styles.infoValue}>Infinity</Text>
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoBox: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  infoTitle: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  infoValue: {
    color: '#333',
    fontSize: 20,
  },
});

export default Landing;
