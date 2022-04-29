import React from 'react';
import { View, Text } from 'moti';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Home = ({navigation}) => {
    return (<View style={styles.container}>
        <Text>Home</Text>
        <Button title="Tensor Calculator"
            onPress={()=>navigation.navigate("Tensor Calculator")} />
        <Button title="Function Calculator"
            onPress={()=>navigation.navigate("Function Calculator")} />
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "#eee",
        marginTop: 20,
    },
})

export default Home;
