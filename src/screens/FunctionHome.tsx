import React, { useState, useEffect } from 'react';
import { View, AnimatePresence } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import FunctionScreenViwer from '../components/FunctionScreenViwer';
import CalcButton from '../components/CalcButton';
import TexViwer from '../components/TexViwer';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import { NavigationContainer } from '@react-navigation/native';

const FunctionHome = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false);
    const init_term_list:any = {
        dom:"0",cod:"0",gen:"0",target:"0",ker:"0",im:"0",coker:"0",coim:"0"};
    const init_expression:string = (
        "\\begin{array}{rccc} f: & "+init_term_list.dom+" & \\to & "+init_term_list.cod+" \\\\ & "+init_term_list.gen+" & \\mapsto & "+init_term_list.target+" \\end{array}");
    const [term_list, setTermList] = useState<any>(init_term_list);
    // const [expression, setExpression] = useState(init_expression);

    const handleOnEval = (setType:string,target_term_list:any[]) => {
        setVisible(false)
        
        let prev_term_list = term_list;
        let target_term_list_expression = create_expression(target_term_list);
        prev_term_list[setType] = target_term_list_expression;
        prev_term_list["gen"] = "1";
        // let prev_term_list:any = {
        //     dom:"\\mathbb{Z}",cod:"\\mathbb{Z}",gen:"1",target:"2",ker:"0",im:"2\\mathbb{Z}",coker:"\\mathbb{Z}/2\\mathbb{Z}",coim:"\\mathbb{Z}/2\\mathbb{Z}"};
        setTermList(prev_term_list);
        // let result_expression = (
        //     "\\begin{array}{rccc} f: & "+prev_term_list.dom+" & \\to & "+prev_term_list.cod+" \\\\ & "+prev_term_list.gen+" & \\mapsto & "+prev_term_list.target+" \\end{array}");
        // console.error(result_expression);
        // setExpression(result_expression);
    }
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
            result_expression = prev_term_list[1];
        } else {
          console.error("error");
          return ;
      }
      return result_expression;
    };

    return (<View style={styles.container}>
        <View style={{flex: 3}}>
          <LinearGradient
            colors={['#000', '#444', '#555']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            style={styles.resultScreen}>
            {/* <ScreenViwer expression={expression}/> */}
            {/* <Text>{"¥n"}</Text> */}
            <FunctionScreenViwer expression={`
            \\begin{array}{rccc}
                f: & `+term_list.dom+` & \\to     & `+term_list.cod+` \\\\
                   & `+term_list.gen+` & \\mapsto & `+term_list.target+`
            \\end{array}`}/>
        </LinearGradient>
        </View>
        <View style={{flex: 6}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Ker(f)\\cong '+term_list.ker+'$$'}
                    </MathJaxSvg>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Im(f)\\cong '+term_list.im+'$$'}
                    </MathJaxSvg>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}>
                    <MathJaxSvg fontSize={25} fontCache={true}>
                        {'$$Coker(f)\\cong '+term_list.coker+'$$'}
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
                <View style={styles.calculation}>
                    <TouchableOpacity style={styles.calculation}
                        onPress={()=>setVisible(true)}>
                        <MathJaxSvg fontSize={25} fontCache={true}>
                            {'$$f(1)$$'}
                        </MathJaxSvg>
                    </TouchableOpacity>
                    <View>
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>
                                Choose the image of 1.
                                {/* <MathJaxSvg fontSize={25} fontCache={true}>
                                    {'$$f(1)$$'}
                                </MathJaxSvg> */}
                            </Dialog.Title>
                            {/* <Dialog.Description style={{alignItems:"center"}}>
                                Choose the image of 1.
                            </Dialog.Description> */}
                            <Dialog.Input />
                            <Dialog.Button label="OK" onPress={()=>{handleOnEval("target", ["Integer","2"])}} />

                            {/* <Dialog.Input /> */}

                        </Dialog.Container>
                    </View>
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

export default FunctionHome;
