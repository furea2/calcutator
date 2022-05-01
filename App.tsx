import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Calculator from './src/screens/Calculator';
import Function from './src/screens/Function';
import TreasureScreen from './src/screens/TreasureScreen';
import InfoScreen from './src/screens/InfoScreen';

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
          name="Tensor Calculator"
          component={Calculator}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Ionicons name="calculator" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="Function Calculator"
          component={Function}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <MaterialCommunityIcons name="function" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="Treasure"
          component={TreasureScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color,size }) => (
              <Ionicons name="ios-rocket" size={size} color={color} />
            )
          }} />
        <Tab.Screen
          name="About"
          component={InfoScreen}
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

