import React from 'react';

import { View, AnimatePresence } from 'moti'
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import TexViwer from '../components/TexViwer';


type CalcButtonProps = {
  char: string,
  onPress?: any,
}
const CalcButton = (props:CalcButtonProps) => {
    if (props.char.length>0) {
        return (<TouchableOpacity style={styles.calculation} onPress={props.onPress}>
            <TexViwer expression={props.char}/>
        </TouchableOpacity>);
    } else {
        return (<View style={styles.calculation}></View>)
    }
};

const styles = StyleSheet.create({
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
});

export default CalcButton;
