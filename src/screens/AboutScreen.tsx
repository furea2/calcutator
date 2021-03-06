import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutHome from './AboutHome';
import AboutPi_4_3 from './AboutPi_4_3';

const Stack = createNativeStackNavigator();

const AboutScreen = () => {
    return (<Stack.Navigator
        screenOptions={{
            animation: 'fade_from_bottom',
        }}
    >
        <Stack.Screen
            name="AboutHome"
            component={AboutHome}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="AboutPi_4_3"
            component={AboutPi_4_3}
            options={{ headerShown: false }} />
    </Stack.Navigator>);
}

export default AboutScreen;
