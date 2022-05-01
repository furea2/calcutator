import React, { useState, useEffect } from 'react';
import { View, AnimatePresence } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Button, TouchableOpacity, LogBox } from 'react-native';
import Dialog from 'react-native-dialog';
import RNPickerSelect from 'react-native-picker-select';
import FunctionScreenViwer from '../components/FunctionScreenViwer';
import CalcButton from '../components/CalcButton';
import TexViwer from '../components/TexViwer';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs([
    'Non-serializable values found in the navigation state'
])

const gcd:any = (x:number, y:number) => {return (x % y) ? gcd(y, x % y) : y;}

const create_expression = (prev_term_list:any) => {
    if (prev_term_list.length===0) {return "\\ "}
    let result_expression:string;
    let _type:string = prev_term_list[0];
    if (_type==="Zero") {
        result_expression = "0";
    } else if (_type==="Group") {
        if (prev_term_list[2]===0) {
            result_expression = "\\mathbb{Z}";
        } else if (prev_term_list[2]>0) {
            result_expression = "\\mathbb{Z}/"+prev_term_list[2].toString()+"\\mathbb{Z}";
        } else {
            console.error("error");
            return;
        };
    } else if (_type==="Integer") {
          result_expression = prev_term_list[1].toString();
      } else {
        console.error("error");
        return ;
    }
    if (result_expression) {
        return result_expression;
    } else {
        return "undefined";
    }
};

const FunctionHome = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const init_term_list:any = {
        dom:["Group",1,0],cod:["Group",1,0],gen:["Integer",1],target:["Integer",1],ker:["Zero"],im:["Group",1,0],coker:["Zero"]};
    const [term_list, setTermList] = useState<any>(init_term_list);
    const init_expression:string = (
        "\\begin{array}{rccc} "
            +"f: & "+create_expression(init_term_list.dom)+" & \\to & "+create_expression(init_term_list.cod)+" \\\\ "
            +"& "+create_expression(init_term_list.gen)+" & \\mapsto & "+create_expression(init_term_list.target)+" "
        +"\\end{array}");
    const [expression, setExpression] = useState(init_expression);

    const handleOnEval = (setType:string,target_term_list:any[]) => {
        setVisible(false)

        let prev_term_list = term_list;
        prev_term_list[setType] = target_term_list;

        // modify dom,cod,gen if needed
        if (prev_term_list["dom"][0]==="Group") {
            if (prev_term_list["dom"][2]===1) {
                prev_term_list["dom"] = ["Zero"];}}
        prev_term_list["gen"] = (prev_term_list["dom"][0]==="Zero") ?
            ["Integer", 0] : ["Integer", 1];
        if (prev_term_list["cod"][0]==="Group") {
            if (prev_term_list["cod"][2]===1) {
                prev_term_list["cod"] = ["Zero"];
                prev_term_list["target"] = ["Integer", 0];}}

        if (setType==="target") {
            if (target_term_list[1]==="") {
                if (prev_term_list["dom"][0]==="Zero") {
                    prev_term_list["target"] = ["Integer", 0];
                } else {
                    prev_term_list["target"] = ["Integer", 1];
                }
            }
        }

        // modify target if needed
        if (setType==="dom") {
            if (prev_term_list["dom"][0]==="Zero") {
                prev_term_list["target"] = ["Integer", 0];}
        } else if (setType==="cod") {
            if (prev_term_list["cod"][0]==="Zero") {
                prev_term_list["target"] = ["Integer", 0];
            } else {
                prev_term_list["target"] = ["Integer", 1];}    
        } else if (setType==="target") {
            if (prev_term_list["dom"][0]==="Zero") {
                prev_term_list["target"] = ["Integer", 0];
            } else if (prev_term_list["cod"][0]==="Group") {
                if (prev_term_list["cod"][2]>1) {
                    prev_term_list["target"][1] = (
                        target_term_list[1] % prev_term_list["cod"][2]);}
                    }
        }

        let result_ker;
        let result_im;
        let result_coker;
        result_ker = ["Integer", -1];
        result_im = ["Integer", -1];
        result_coker = ["Integer", -1];

        // dom or cod is zero
        if (prev_term_list["dom"][0]==="Zero") {
            result_ker = ["Zero"];
            result_im = ["Zero"];
            result_coker = prev_term_list["cod"];
        } else if (prev_term_list["cod"][0]==="Zero") {
            result_ker = prev_term_list["cod"];
            result_im = ["Zero"];
            result_coker = ["Zero"];

        // dom and cod are integer groups
        } else if (prev_term_list["dom"][1]===1 && prev_term_list["cod"][1]===1) {
            if (prev_term_list["target"][1]===1) {
                result_ker = ["Zero"];
                result_im = prev_term_list["cod"]
                result_coker = ["Zero"];
            } else {
                result_ker = ["Zero"];
                result_im = ["Group",1,0];
                result_coker = ["Group",0,prev_term_list["target"][1]];
            }

        // dom or cod is integer group
        } else if (prev_term_list["dom"][1]===1) {
            result_ker = ["Group",1,0];
            result_im = prev_term_list["cod"];
            result_coker = ["Zero"];
        } else if (prev_term_list["cod"][1]===1) {
            result_ker = prev_term_list["dom"];
            result_im = ["Zero"];
            result_coker = ["Zero"];

        // dom or cod is finite group
        } else {
            if (prev_term_list["target"][1]===0) {
                result_ker = prev_term_list["dom"];
                result_im = ["Zero"];
                result_coker = prev_term_list["cod"];
            } else {
                if ((prev_term_list["dom"][2]*prev_term_list["target"][1])%prev_term_list["cod"][2]!=0) {
                    result_ker = prev_term_list["dom"];
                    result_im = ["Zero"];
                    result_coker = prev_term_list["cod"];
                } else {
                    let _gcd = gcd(prev_term_list["target"][1],prev_term_list["cod"][2]);
                    result_ker = ((prev_term_list["dom"][2]*_gcd)/prev_term_list["cod"][2]!=1) ?
                        ["Group", 0, (prev_term_list["dom"][2]*_gcd)/prev_term_list["cod"][2]] : ["Zero"];
                    result_im = (prev_term_list["cod"][2]/_gcd!=1) ?
                        ["Group", 0, prev_term_list["cod"][2]/_gcd] : ["Zero"];
                    result_coker = (_gcd!=1) ? ["Group", 0, _gcd] : ["Zero"];
                }
            }
        }

        // set term_list
        prev_term_list["ker"] = result_ker;
        prev_term_list["im"] = result_im;
        prev_term_list["coker"] = result_coker;
        setTermList(prev_term_list);

        let result_expression = ("\\begin{array}{rccc} "
            + "f: & "
                +create_expression(prev_term_list.dom)
                    +" & \\to & "
                        +create_expression(prev_term_list.cod)+" \\\\ "
            +    "& "
                +create_expression(prev_term_list.gen)
                    +" & \\mapsto & "
                        +create_expression(prev_term_list.target)
            +" \\end{array}");
        setExpression(result_expression);
    }

    const TargetSelecter = () => {
        const [target_value, setTargetValue] = useState("1")
        const handleOnChangeTarget = (target:string) => {
            // let prev_term_list = term_list;
            // prev_term_list["target"] = target;
            // setTermList(prev_term_list)
            setTargetValue(target);
        }
        const handleOnPress = () => {
            setVisible(true);
        }
        return (<View style={styles.calculation}>
            <TouchableOpacity style={styles.calculation}
                onPress={handleOnPress}>
                <MathJaxSvg fontSize={25} fontCache={true}>
                    {'$$f(1)$$'}
                </MathJaxSvg>
            </TouchableOpacity>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>
                        Choose the image of 1.
                    </Dialog.Title>
                    <Dialog.Input defaultValue='1' onChangeText={handleOnChangeTarget}/>
                    <Dialog.Button label="OK" onPress={()=>{handleOnEval("target", ["Integer",target_value])}} />
                </Dialog.Container>
            </View>
        </View>)
    }

    return (<View style={styles.container}>
        <View style={{flex: 3}}>
          <LinearGradient
            colors={['#000', '#444', '#555']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            style={styles.resultScreen}>
            <FunctionScreenViwer expression={expression}/>
        </LinearGradient>
        </View>
        <View style={{flex: 6}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Ker(f)\\cong '+create_expression(term_list.ker)+'$$'}
                    </MathJaxSvg>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Im(f)\\cong '+create_expression(term_list.im)+'$$'}
                    </MathJaxSvg>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Coker(f)\\cong '+create_expression(term_list.coker)+'$$'}
                    </MathJaxSvg>
                </View>
                {/* <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Coim(f)\\cong '+term_list.coim+'$$'}
                    </MathJaxSvg>
                </View> */}
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <TouchableOpacity style={styles.calculation}
                        onPress={()=>navigation.navigate("FunctionSetGroup", {setType:"dom", handleOnEval:handleOnEval})}>
                        <MathJaxSvg fontSize={25} fontCache={true}>
                            {'$$dom(f)$$'}
                        </MathJaxSvg>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculation}>
                    <TouchableOpacity style={styles.calculation}
                        onPress={()=>navigation.navigate("FunctionSetGroup", {setType:"cod", handleOnEval:handleOnEval})}>
                        <MathJaxSvg fontSize={25} fontCache={true}>
                            {'$$cod(f)$$'}
                        </MathJaxSvg>
                    </TouchableOpacity>
                </View>
                <TargetSelecter/>
            </View>
            {/* <View style={{flex: 1, flexDirection: "row"}}>
                <CalcButton
                    onPress={handleOnPress}
                    char={"Compute!"}/>
            </View> */}
        </View>
    </View>)
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "#666",
        // marginTop: 20,
    },
    title: {
        marginRight: 3,
        marginLeft: 3,
        flex: 1,
        borderWidth: 10,
        borderColor: "#111",
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 36,
        color: "#333",
    },
    resultScreen: {
        margin: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 36,
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
});

export default FunctionHome;
