import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';


import Landing from './screens/Landing';
import MapScreen from './screens/MapScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
       <StatusBar backgroundColor='white'></StatusBar>
    <Stack.Navigator>
      
     
    
      <Stack.Screen name="Welcome" component={Welcome} options={{
            backBehavior: "history",
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
            },
          }}
            />
      
      <Stack.Screen name="Landing" component={Landing} options={{
          backBehavior: "history",
            headerShown: false}} />
              <Stack.Screen name="Map" component={MapScreen} options={{
          backBehavior: "history",
            headerShown: false}} />
    </Stack.Navigator>
   
    </NavigationContainer>
  );
}
