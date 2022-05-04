import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ExtHome from './ExtHome';
import ExtSetGroup from './ExtSetGroup';

const Stack = createNativeStackNavigator();

const ExtScreen = () => {
    return (<Stack.Navigator
        screenOptions={{
            animation: 'fade_from_bottom',
        }}
    >
        <Stack.Screen
            name="ExtHome"
            component={ExtHome}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="ExtSetGroup"
            component={ExtSetGroup}
            options={{ headerShown: false }} />
    </Stack.Navigator>);
}

export default ExtScreen;
