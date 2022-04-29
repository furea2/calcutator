import React, { useState, useEffect } from 'react';
import { View, AnimatePresence } from 'moti'
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TexViwer from '../components/TexViwer';
import ScreenViwer from '../components/ScreenViwer';
import CalcButton from '../components/CalcButton';

const gcd:any = (x:number, y:number) => {return (x % y) ? gcd(y, x % y) : y;}

const Calculator = () => {
    const init_term_list = ["Zero"];
    const init_expression:string = "0";
    const [is_initialized, setIsInitialized] = useState(true);
    const [term_list, setTermList] = useState<any>(init_term_list);
    const [expression, setExpression] = useState(init_expression);
    
    const initialize_expression = () => {
        setTermList(init_term_list);
        setExpression(init_expression);
        setIsInitialized(true);
    }
    const error_expression = () => {
        initialize_expression()
        setExpression("ERROR");
    }
    const add_char = (char:string) => {
        const prev_term_list = term_list;
        let result_term_list = prev_term_list;

        // 初期化された状態
        // 後に続くもの: 0、数字（0を除く）、演算子
        if (is_initialized) {
            if (char==="0") {
                result_term_list = ["Zero"];
            } else if (/[1-9]/.test(char)) {
                result_term_list = ["Group", 0, Number(char)];
            } else if ("\\mathbb{Z}"===char) {
                result_term_list = ["Group", 1, 0];
            } else if (["\\otimes", "\\text{Hom}"].includes(char)) {
                result_term_list = [char, prev_term_list, []];
            } else {
                error_expression();
                return;
            }
            setTermList(result_term_list);

        // 一つ前が自明群
        // 後に続くもの: 演算子
        } else if ("Zero"===prev_term_list[0]) {
            if (["\\otimes", "\\text{Hom}"].includes(char)) {
                result_term_list = [char, prev_term_list, []];
            } else if (char==="0") {
                ;
            } else if (/[1-9]/.test(char)) {
                result_term_list = ["Group", 0, Number(char)];
            } else if (char==="\\mathbb{Z}") {
                result_term_list = ["Group", 1, 0];
            } else {
                console.error("error");
                console.error("一つ前が自明群");
                error_expression();
                return;
            }
        // 一つ前が群
        } else if ("Group"===prev_term_list[0]) {
            // 一つ前が有限群
            // 後に続くもの: 数字、演算子
            if (prev_term_list[2]>0) {
                if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    if (prev_term_list[2]===1) {result_term_list=["Zero"]}
                    result_term_list = [char, prev_term_list, []];
                } else if (/[0-9]/.test(char)) {
                    result_term_list[2] = Number(prev_term_list[2].toString()+char);
                } else if (char==="\\mathbb{Z}") {
                    result_term_list = ["Group", 1, 0];
                } else {
                    console.error("error");
                    console.error("一つ前が有限群");
                    error_expression();
                    return;
                }
            // 一つ前が整数群
            // 後に続くもの: 数字、演算子
            } else if (prev_term_list[2]===0) {
                if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    result_term_list = [char, prev_term_list, []];
                } else if ("0"===char) {
                    result_term_list = ["Zero"];
                } else if (/[1-9]/.test(char)) {
                    result_term_list = ["Group", 0, Number(char)];
                } else if (char==="\\mathbb{Z}") {
                    ;
                } else {
                    console.error("error");
                    console.error("一つ前が位数2以上の群");
                    error_expression();
                    return;
                }
            } else {
                console.error("error");
                console.error("一つ前が群");
                error_expression();
                return;
            }

        // 一つ前が演算子
        // 後に続くもの: 0、数字（0を除く）、演算子
        } else if (["\\otimes", "\\text{Hom}"].includes(prev_term_list[0])) {
            // ２項目が未入力
            if (prev_term_list[2].length===0) {
                if (char==="0") {
                    result_term_list[2] = ["Zero"];
                } else if (/[1-9]/.test(char)) {
                    result_term_list[2] = ["Group", 0, Number(char)];
                } else if (char==="\\mathbb{Z}") {
                    result_term_list[2] = ["Group", 1, 0];
                } else if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    result_term_list[0] = char;
                } else {
                    console.error("error")
                    console.error("一つ前が演算子");
                    error_expression();
                    return;
                }

            // ２項目が自明群
            } else if (prev_term_list[2][0]==="Zero") {
                if (char==="0") {
                    ;
                } else if (/[1-9]/.test(char)) {
                    result_term_list[2] = ["Group", 0, Number(char)];
                } else if (char==="\\mathbb{Z}") {
                    result_term_list[2] = ["Group", 1, 0];
                } else if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    result_term_list = [char, eval_term_list(prev_term_list), []]
                } else {
                    console.error("error")
                    console.error("一つ前が演算子");
                    error_expression();
                    return;
                }

            // ２項目が有限群
            } else if (prev_term_list[2][2]>0) {
                if (/[0-9]/.test(char)) {
                    result_term_list[2][2] = Number(prev_term_list[2][2].toString()+char);
                } else if (char==="\\mathbb{Z}") {
                    result_term_list[2] = ["Group", 1, 0];
                } else if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    result_term_list = [char, eval_term_list(prev_term_list), []]
                } else {
                    console.error("error")
                    console.error("一つ前が演算子");
                    error_expression();
                    return;
                }

            // ２項目が整数群
            } else if (prev_term_list[2][2]===0) {
                if (char==="0") {
                    result_term_list[2] = ["Zero"];
                } else if (/[1-9]/.test(char)) {
                    result_term_list[2] = ["Group", 0, Number(char)];
                } else if (char==="\\mathbb{Z}") {
                    ;
                } else if (["\\otimes", "\\text{Hom}"].includes(char)) {
                    result_term_list = [char, eval_term_list(prev_term_list), []]
                } else {
                    console.error("error")
                    console.error("一つ前が演算子");
                    error_expression();
                    return;
                }

            } else {
                console.error("error");
                console.error("一つ前が演算子");
                error_expression();
                return;
            }

        } else {
            console.error("error");
            console.error("例外");
            error_expression();
            return;
        }
        setTermList(result_term_list);
        create_expression(result_term_list);
        setIsInitialized(false);
    }

    const eval_term_list = (prev_term_list:any) => {
        let _type = prev_term_list[0];
        let result:any[] = [];
        if (["\\otimes","\\text{Hom}"].includes(_type)) {
            let oper = prev_term_list[0];
            let lhs = prev_term_list[1];
            let rhs = prev_term_list[2];
            if (rhs.length===0) {
                console.error("error");
                error_expression();
                return;
            }

            if (lhs[0]==="Zero") {lhs = ["Group", 0, 1]};
            if (rhs[0]==="Zero") {rhs = ["Group", 0, 1]};

            if (oper==="\\otimes") {
                if (lhs[2]===1 || rhs[2]===1) {
                    result = ["Zero"];
                } else if (lhs[2]===0) {
                    result = rhs;
                } else if (rhs[2]===0) {
                    result = lhs;
                } else {
                    let _gcd = gcd((lhs[2]), rhs[2]);
                    if (_gcd===1) {
                        result = ["Zero"];
                    } else {
                        result = ["Group", 0, _gcd];
                    }
                }

            } else if (oper==="\\text{Hom}") {
                if (lhs[2]===1 || rhs[2]===1) {
                    result = ["Zero"];
                } else if (lhs[2]===0) {
                    result = rhs;
                } else if (rhs[2]===0) {
                    if (lhs[2]===0) {
                        result = lhs;
                    } else {
                        result = ["Zero"];
                    }
                } else {
                    let _gcd = gcd((lhs[2]), rhs[2]);
                    if (_gcd===1) {
                        result = ["Zero"];
                    } else {
                        result = ["Group", 0, _gcd];
                    }
                }
            }
        } else if (_type==="Zero") {
            result = prev_term_list;
        } else if (_type==="Group") {
            if (prev_term_list[2]===1) {
                result = ["Zero"];
            } else {
                result = prev_term_list;
            }
        } else {
            console.error("error");
            error_expression();
            return;
        }

        if (result.length!=0) {
            return result;
        } else {
            console.error("eval result undefined error");
            error_expression();
            return;
        }
    }

    const create_expression = (prev_term_list:any) => {
        if (prev_term_list.length===0) {return "\\ "}
        let result_expression:string;
        let _type:string = prev_term_list[0];
        if (["\\otimes","\\text{Hom}"].includes(_type)) {
            let oper = prev_term_list[0];
            let lhs = prev_term_list[1];
            let rhs = prev_term_list[2];    
            if (oper==="\\otimes") {
                result_expression = (
                    create_expression(lhs)
                    + "\\otimes"
                    + create_expression(rhs));
            } else if (oper==="\\text{Hom}") {
                result_expression = (
                    "\\text{Hom}("
                    + create_expression(lhs)
                    + ","
                    + create_expression(rhs)
                    + ")");
            } else {
                console.error("error");
                error_expression();
                return;
            }
        } else if (_type==="Zero") {
            result_expression = "0";
        } else if (_type==="Group") {
            if (prev_term_list[2]===0) {
                result_expression = "\\mathbb{Z}";
            } else if (prev_term_list[2]>0) {
                result_expression = "\\mathbb{Z}/"+prev_term_list[2].toString()+"\\mathbb{Z}";
            } else {
                console.error("error");
                error_expression();
                return;
            };
        } else {
            console.error("error");
            error_expression();
            return ;
        }
        setExpression(result_expression);
        return result_expression;
    }

    const handleOnPressEval = () => {
        try {
            const prev_term_list = eval_term_list(term_list);
            setTermList(prev_term_list);
            create_expression(prev_term_list);
            setIsInitialized(true);
        } catch {
            console.error("error");
            error_expression();
            return;
        }
    }

    return (<View style={styles.container}>
        {/* <View style={{flex: 1}}>
            <View style={styles.title}>
              <TexViwer expression={"\\mathrm{Tensor\\, Calculator}"}/>
            </View>
        </View> */}
        <View style={{flex: 3}}>
          <LinearGradient
            colors={['#000', '#444', '#555']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            style={styles.resultScreen}>
            <ScreenViwer expression={expression}/>
          </LinearGradient>
        </View>
        <View style={{flex: 6}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <CalcButton onPress={()=>{add_char("7")}} char={"7"}/>
                <CalcButton onPress={()=>{add_char("8")}} char={"8"}/>
                <CalcButton onPress={()=>{add_char("9")}} char={"9"}/>
                <CalcButton onPress={initialize_expression} char={"\\text{C}"}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <CalcButton onPress={()=>{add_char("4")}} char={"4"}/>
                <CalcButton onPress={()=>{add_char("5")}} char={"5"}/>
                <CalcButton onPress={()=>{add_char("6")}} char={"6"}/>
                <CalcButton onPress={()=>{add_char("\\otimes")}} char={"\\otimes"}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <CalcButton onPress={()=>{add_char("1")}} char={"1"}/>
                <CalcButton onPress={()=>{add_char("2")}} char={"2"}/>
                <CalcButton onPress={()=>{add_char("3")}} char={"3"}/>
                <CalcButton onPress={()=>{add_char("\\text{Hom}")}} char={"\\text{Hom}"}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <CalcButton onPress={()=>{add_char("0")}} char={"0"}/>
                <CalcButton char={""}/>
                <CalcButton onPress={()=>{add_char("\\mathbb{Z}")}} char={"\\mathbb{Z}"}/>
                <CalcButton onPress={handleOnPressEval} char={"\\cong"}/>
            </View>
        </View>
    </View>);
}
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
});

export default Calculator;
