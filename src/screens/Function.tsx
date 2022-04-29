import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FunctionHome from './FunctionHome';
import FunctionSetGroup from './FunctionSetGroup';

const Stack = createNativeStackNavigator();

const Function = () => {
    return (<Stack.Navigator
        screenOptions={{
            animation: 'fade_from_bottom',
        }}
    >
        <Stack.Screen
            name="FunctionHome"
            component={FunctionHome}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="FunctionSetGroup"
            component={FunctionSetGroup}
            options={{ headerShown: false }} />
    </Stack.Navigator>);
}

export default Function;
