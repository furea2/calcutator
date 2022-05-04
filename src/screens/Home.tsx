import React from 'react';
import { View, Text } from 'moti';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Home = ({navigation}) => {
    return (<View style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <Text>Choose calculator.</Text>
        </View>
        </View>
        </View>
        <View style={{flex: 6}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <TouchableOpacity style={styles.calculation}
            onPress={()=>navigation.navigate("Tensor Calc")} >
            <Button title="Tensor Calculator"
                onPress={()=>navigation.navigate("Tensor Calc")} />
            <Text>This calculator can calculate the tensor product and morphism set between abel groups.</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        <View style={{flex: 6}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <TouchableOpacity style={styles.calculation}
            onPress={()=>navigation.navigate("Function Calc")} >
            <Button title="Function Calculator"
                onPress={()=>navigation.navigate("Function Calc")} />
            <Text>This calculator can calculate the kernel, image and cokernel of the group homomorphisms.</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        <View style={{flex: 6}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <TouchableOpacity style={styles.calculation}
            onPress={()=>navigation.navigate("Ext Calc")} >
            <Button title="Ext Calculator"
                onPress={()=>navigation.navigate("Ext Calc")} />
            <Text>This calculator can calculate the ext group of abel groups.</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "#eee",
        marginTop: 20,
    },
    calculation: {
        margin: 3,
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "white",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 42,
        opacity: .95,
    },
})

export default Home;
