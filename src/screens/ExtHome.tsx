import React, { useState, useEffect } from 'react';
import { View, AnimatePresence } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Button, TouchableOpacity, LogBox } from 'react-native';
import Dialog from 'react-native-dialog';
import RNPickerSelect from 'react-native-picker-select';
import ExtScreenViwer from '../components/ExtScreenViwer';
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


const ExtHome = ({ navigation }) => {
    const init_term_list:any = {
        A:["Group",1,0],
        B:["Group",1,0],
        resolution:["Resolution",[0,["Group",1,0],0]],
        resolution2:["Resolution2",[
                ["Hom",["Group",1,0],["Zero"]],
                ["Hom",["Group",1,0],["Group",1,0]],
                ["Hom",["Group",1,0],["Zero"]],
            ],[["Zero"],["Group",1,0],["Zero"]]],
        ext:[["Group",1,0]]};
    const [term_list, setTermList] = useState<any>(init_term_list);
    const init_expression:string = (
        "\\begin{array}{rcl} "
            +"A &=& "+create_expression(term_list.A)+"\\\\ "
            +"B &=& "+create_expression(term_list.B)
        +"\\end{array}");
    const [expression, setExpression] = useState(init_expression);
    const [expression_size, setExpressionSize] = useState(28);

    const handleOnEval = (setType:string,target_term_list:any[]) => {
        let prev_term_list = term_list;

        if (prev_term_list.B[0]==="Group") {
            if (prev_term_list.B[2]===1) {
                target_term_list = ["Zero"];
            }
        }

        prev_term_list[setType] = target_term_list;
        setTermList(prev_term_list);
        setExpression(create_view("init"));
    }

    const create_view = (viewType:string) => {
        let prev_term_list = term_list;
        let result_expression:string;
        if (viewType==="init") {
            result_expression=(
                "\\begin{array}{rcl} "
                    +"A &=& "+create_expression(term_list.A)+"\\\\ "
                    +"B &=& "+create_expression(term_list.B)
                +"\\end{array}");    
        
        } else if (viewType==="resolution") {
            let target_term_list = prev_term_list.A;
    
            if (target_term_list[0]==="Zero") {
                result_expression=(
                    "0 \\xrightarrow{} 0 \\xrightarrow{} 0 \\xrightarrow{} 0");
            } else if (target_term_list[1]===1) {
                result_expression=(
                    "0 \\xrightarrow{} \\mathbb{Z} \\xrightarrow{\\cong} \\mathbb{Z} \\xrightarrow{} 0");
            } else if (target_term_list[2]===1) {
                result_expression=(
                    "0 \\xrightarrow{} 0 \\xrightarrow{} 0");
            } else if (target_term_list[2]>1) {
                result_expression=(
                    "\\mathbb{Z} \\xrightarrow{\\times "+target_term_list[2]+"} \\mathbb{Z} \\xrightarrow{} "+create_expression(target_term_list)+" \\xrightarrow{} 0");
            }

        } else if (viewType==="resolution2") {
            let source_term_list = prev_term_list.A;
            let target_term_list = prev_term_list.B;

            if (source_term_list[0]==="Zero") {
                result_expression=(
                    "\\begin{array}{cccccccl} "
                        +"\\rm{Hom}(0, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Hom}(0, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}(0, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& 0 \\\\"

                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\parallel"
                        +" & & \\\\"

                        +"0"
                        +" &\\xrightarrow{}& "
                        +"0"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}(0, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& 0"
                    +"\\end{array} ");

            } else if (source_term_list[1]===1) {
                result_expression=(
                    "\\begin{array}{cccccccl} "
                        +"\\rm{Hom}(\\mathbb{Z}, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Hom}(0, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}(\\mathbb{Z}, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& 0 \\\\"

                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\parallel"
                        +" & & \\\\"

                        +create_expression(target_term_list)
                        +" &\\xrightarrow{}& "
                        +"0"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}(\\mathbb{Z}, "+create_expression(target_term_list)+" )"
                        +" &\\xrightarrow{}& 0"
                    +"\\end{array} ");
            } else if (source_term_list[2]>1) {
                result_expression=(
                    "\\begin{array}{cccccccl} "
                        +"\\rm{Hom}( \\mathbb{Z} ,"+create_expression(target_term_list)+")"
                        +" &\\xrightarrow{\\times "+source_term_list[2]+"}& "
                        +"\\rm{Hom}( \\mathbb{Z} ,"+create_expression(target_term_list)+")"
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}("+create_expression(source_term_list)+","+create_expression(target_term_list)+")"
                        +" &\\xrightarrow{}& 0 \\\\"

                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\downarrow\\cong"
                        +" & & "
                        +"\\parallel"
                        +" & & \\\\"

                        +create_expression(target_term_list)
                        +" &\\xrightarrow{\\times "+source_term_list[2]+"}& "
                        +create_expression(target_term_list)
                        +" &\\xrightarrow{}& "
                        +"\\rm{Ext}("+create_expression(source_term_list)+","+create_expression(target_term_list)+")"
                        +" &\\xrightarrow{}& 0"
                    +"\\end{array} ");
            }
        } else if (viewType==="ext") {
            let _gcd = gcd(prev_term_list.A[2], prev_term_list.B[2]);
            let _ext = ["Zero"];
            if (_gcd>1) {_ext = ["Group",0,_gcd]}
            result_expression=(
                "\\rm{Ext}("+create_expression(prev_term_list.A)+","+create_expression(prev_term_list.B)+") \\cong "+create_expression(_ext));

        }
        if (result_expression) {
            if (viewType==="resolution2") {
                setExpressionSize(10);
            } else {
                setExpressionSize(28);
            }

            return result_expression;
        } else {
            return "undefined";
        }
    };

    return (<View style={styles.container}>
        <View style={{flex: 3}}>
          <LinearGradient
            colors={['#000', '#444', '#555']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            style={styles.resultScreen}>
            <ExtScreenViwer fontSize={expression_size} expression={expression}/>
        </LinearGradient>
        </View>
        <View style={{flex: 6}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation}
                    onPress={()=>setExpression(create_view("resolution"))}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$\\rm{The\\ resolution\\ of\\ }A.$$'}
                    </MathJaxSvg>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation}
                    onPress={()=>setExpression(create_view("resolution2"))}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$\\rm{Applying\\ }\\rm{Hom}(-,B).$$'}
                    </MathJaxSvg>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation}
                    onPress={()=>setExpression(create_view("ext"))}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$\\rm{Ext}(A,B)$$'}
                    </MathJaxSvg>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <TouchableOpacity style={styles.calculation}
                        onPress={()=>navigation.navigate("ExtSetGroup", {setType:"A", handleOnEval:handleOnEval})}>
                        <MathJaxSvg fontSize={25} fontCache={true}>
                            {'$$\\rm{Ext}(\\mathbf{A},B)$$'}
                        </MathJaxSvg>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculation}>
                    <TouchableOpacity style={styles.calculation}
                        onPress={()=>navigation.navigate("ExtSetGroup", {setType:"B", handleOnEval:handleOnEval})}>
                        <MathJaxSvg fontSize={25} fontCache={true}>
                            {'$$\\rm{Ext}(A,\\mathbf{B})$$'}
                        </MathJaxSvg>
                    </TouchableOpacity>
                </View>
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

export default ExtHome;
