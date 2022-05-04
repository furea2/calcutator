import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Calculator from './src/screens/Calculator';
import Function from './src/screens/Function';
import ExtScreen from './src/screens/ExtScreen';
// import JourneyScreen from './src/screens/JourneyScreen';
import AboutScreen from './src/screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="Tensor Calc"
          component={Calculator}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Ionicons name="calculator" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="Function Calc"
          component={Function}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <MaterialCommunityIcons name="function" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="Ext Calc"
          component={ExtScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Text>Ext</Text>
              // <Ionicons name="ios-rocket" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Entypo name="text-document" size={size} color={color} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

