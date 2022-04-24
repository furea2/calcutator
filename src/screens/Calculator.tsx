import React, { useState, useEffect } from 'react';
import { MotiView, AnimatePresence } from 'moti'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

// import TexViwer from '../components/TexViwerWeb';
import TexViwer from '../components/TexViwerIos';

const gcd:any = (x:number, y:number) => {return (x % y) ? gcd(y, x % y) : y;}

const Calculator = () => {
    const [is_initialized, setIsInitialized] = useState(true);
    const [term_list, setTermList] = useState<string[][]>([["0"],]);
    const [expression, setExpression] = useState("0");

    const init_expression = () => {
        let prev_term_list:[[string]] = [["0"],];
        setTermList(prev_term_list);
        setExpression(prev_term_list.join(" "));
        setIsInitialized(true);
    }
    const error_expression = () => {
        init_expression()
        setExpression("ERROR");
    }
    const add_char = (char:string) => {
        let prev_term_list = term_list;
        let prev_last_term = prev_term_list[prev_term_list.length-1];
        if (["\\otimes", "\\oplus"].includes(char) && prev_term_list.length===3) {
            prev_term_list = eval_expression();
            prev_last_term = prev_term_list[prev_term_list.length-1];
        }

        // 初期化された状態
        // 後に続くもの: 0、数字（0を除く）、演算子
        if (is_initialized) {
            if (char==="0") {
                ;
            } else if (/[0-9]/.test(char)) {
                prev_term_list[0] = ["\\mathbb{Z}/", char, "\\mathbb{Z}"];
                setTermList(prev_term_list);
            } else if (["\\otimes", "\\oplus"].includes(char)) {
                prev_term_list.push([char]);
                setTermList(prev_term_list);
            } else {
                error_expression();
                return;
            }

        // 一つ前が群
        } else if (["\\mathbb{Z}/", "0"].includes(prev_last_term[0])) {
            // 一つ前が自明群
            // 後に続くもの: 演算子
            if (prev_last_term[0]==="0") {
                if (["\\otimes", "\\oplus"].includes(char)) {
                    prev_term_list.push([char]);
                    setTermList(prev_term_list);
                } else if (char==="0") {
                    ;
                } else if (/[0-9]/.test(char)) {
                    prev_term_list[prev_term_list.length-1] = ["\\mathbb{Z}/", char, "\\mathbb{Z}"];
                    setTermList(prev_term_list);
                } else {
                    console.error("error");
                    console.error("一つ前が自明群");
                    error_expression();
                    return;
                }

            // 一つ前が位数2以上の群
            // 後に続くもの: 数字、演算子
            } else if (prev_last_term[0]==="\\mathbb{Z}/") {
                if (["\\otimes", "\\oplus"].includes(char)) {
                    prev_term_list.push([char]);
                    setTermList(prev_term_list);
                } else if (/[0-9]/.test(char)) {
                    prev_last_term[1]+=char;
                    setTermList(prev_term_list);
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
        // 後に続くもの: 0、数字（0を除く）
        } else if (["\\otimes", "\\oplus"].includes(prev_last_term[0])) {
            if (char==="0") {
                prev_term_list.push([char]);
                setTermList(prev_term_list);
            } else if (/[0-9]/.test(char)) {
                prev_term_list.push(["\\mathbb{Z}/", char, "\\mathbb{Z}"]);
                setTermList(prev_term_list);
            } else if (["\\otimes", "\\oplus"].includes(char)) {
                prev_term_list[prev_term_list.length-1] = [char];
                setTermList(prev_term_list);
            } else {
                console.error("error")
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
        // console.log("result_term_list:",prev_term_list);
        let result_expression = (prev_term_list.map((l:string[])=>(l.join(" ")))).join(" ");
        setExpression(result_expression);
        setIsInitialized(false);
    }
    const eval_expression = () => {        
        let prev_term_list = term_list;
        if (term_list.length===1) {
            if (term_list[0][1]==="1") {prev_term_list = [["0"]];}
            setTermList(prev_term_list);
            setExpression((prev_term_list.map((l:string[])=>(l.join(" ")))).join(" "));
        } else if (term_list.length===3) {
            const first_term_nat_num:number = Number(term_list[0][1]) || 1;
            const target_oper:string = term_list[1][0];
            const second_term_nat_num:number = Number(term_list[2][1]) || 1;
            let eval_result:string = "";
            if (target_oper==="\\otimes") {
                eval_result = gcd(first_term_nat_num,second_term_nat_num).toString();
            } else if (target_oper==="\\oplus") {
                eval_result = (first_term_nat_num * second_term_nat_num).toString();
            } else {
                console.error("error");
                error_expression();
                return;
            }

            prev_term_list = eval_result==="1" ? [["0"]] : [["\\mathbb{Z}/",eval_result,"\\mathbb{Z}"]];
            setTermList(prev_term_list);
            setIsInitialized(true);
        } else {
            console.error("error");
            error_expression();
            return;
        }
        return prev_term_list;
    }
    const eval_expression_as_canonical = () => {
        // console.log("result_term_list:",term_list);
        let prev_term_list = term_list;
        let prev_last_term = prev_term_list[prev_term_list.length-1];
    }

    const handleOnPressEval = () => {
        try {
            const prev_term_list = eval_expression();
            let result_expression = (prev_term_list.map((l:string[])=>(l.join(" ")))).join(" ");
            setExpression(result_expression);
        } catch {
            console.error("error");
            error_expression();
            return;
        }
    }

    return (<View style={styles.container}>
        <View style={{flex: 1}}>
            <View style={styles.title}><TexViwer expression={"\\mathrm{Tensor Calculator}"}/></View>
        </View>
        <View style={{flex: 3}}>
            <View style={styles.resultScreen}>
                <TexViwer expression={expression} />
            </View>
        </View>
        <View style={{flex: 6}}>
            {/* <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.calculation}></View>
                <View style={styles.calculation}></View>
                <View style={styles.calculation}></View>
                <View style={styles.calculation}></View>
            </View> */}
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("7")}}>
                    <TexViwer expression={"7"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("8")}}>
                    <TexViwer expression={"8"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("9")}}>
                    <TexViwer expression={"9"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={init_expression}>
                <TexViwer expression={"\\text{C}"}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("4")}}>
                    <TexViwer expression={"4"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("5")}}>
                    <TexViwer expression={"5"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("6")}}>
                    <TexViwer expression={"6"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("\\otimes")}}>
                    <TexViwer expression={"\\otimes"}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("1")}}>
                    <TexViwer expression={"1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("2")}}>
                    <TexViwer expression={"2"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("3")}}>
                    <TexViwer expression={"3"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("\\oplus")}}>
                    <TexViwer expression={"\\oplus"}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.calculation} onPress={()=>{add_char("0")}}>
                    <TexViwer expression={"0"}/>
                </TouchableOpacity>
                <View style={styles.calculation}></View>
                <View style={styles.calculation}></View>
                {/* <AnimatePresence> */}
                    {/* <MotiView
                        from={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        style={styles.calculation}
                    /> */}
                {/* </AnimatePresence> */}
                {/* <MotiView
                    from={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    style={styles.calculation}
                /> */}
                {/* <TouchableOpacity style={styles.calculation} onPress={eval_expression_as_canonical}>
                    <TexViwer expression={"\\cong"}/>
                    <Text>標準形</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.calculation} onPress={handleOnPressEval}>
                    <TexViwer expression={"\\cong"}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        // borderColor: "white",
        backgroundColor: "#666",
        backgroundImage: "linear-gradient(45deg, #333, #444, #888)",
    },
    title: {
        margin: 3,
        flex: 1,
        borderWidth: 2,
        borderColor: "white",
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
        backgroundImage: "linear-gradient(45deg, #000, #111, #222 50%, #444)",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 36,
        color: "white",
    },
    calculation: {
        margin: 3,
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "white",
        backgroundColor: "#fff",
        backgroundImage: "linear-gradient(45deg, #25aae1, #4481eb, #3f86ed)",
        backgroundSize: "300% 100%",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 42,
        opacity: .95,
        // color: "var(--glow-color)",
        // boxShadow: "0 4px 15px 0 rgba(65, 132, 234, 0.75)",
        color: "#fff",
        // transition: "all 0.3s",
        // boxShadow: "0 0.625em 1em 0 rgba(30, 143, 255, 0.35)",
    },
});

export default Calculator;
