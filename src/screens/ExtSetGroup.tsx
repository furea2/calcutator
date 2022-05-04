import React, { useState } from 'react';
import { View, Text } from 'moti';
import { StyleSheet, Button } from 'react-native';
import CalcButton from '../components/CalcButton';
import TexViwer from '../components/TexViwer';

const ExtSetGroup = ({ navigation, route }) => {
  const init_term_list = ["Zero"];
  const init_expression:string = "0";
  const [term_list, setTermList] = useState<any>(init_term_list);
  const [expression, setExpression] = useState(init_expression);
  const initialize_expression = () => {
    setTermList(init_term_list);
    setExpression(init_expression);
  };
  const error_expression = () => {
      initialize_expression()
      setExpression("ERROR");
  }
  const add_char = (char:string) => {
    const prev_term_list = term_list;
    let result_term_list = prev_term_list;

    // 一つ前が自明群
    // 後に続くもの: 演算子
    if ("Zero"===prev_term_list[0]) {
        if (char==="0") {
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
            if (/[0-9]/.test(char)) {
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

    } else {
        console.error("error");
        console.error("例外");
        error_expression();
        return;
    }
    setTermList(result_term_list);
    create_expression(result_term_list);
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
  };
  const handleOnPressEval = () => {
    try {
      navigation.navigate("ExtHome", {setType:route.params.setType,term_list:term_list});
      route.params.handleOnEval(route.params.setType,term_list);
    } catch {
        console.error("error");
        error_expression();
        return;
    }
  }

  return (<View style={styles.container}>
    <View style={{flex: 3}}>
      <View style={{flex: 1.2, flexDirection: "row"}}>
        <View style={styles.calculation}>
          <Text>{route.params.setType}</Text>
        </View>
      </View>
      <View style={{flex: 6, flexDirection: "row"}}>
        <View style={styles.calculation}>
          <TexViwer expression={expression}/>
        </View>
      </View>
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
        <CalcButton char={""}/>
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalcButton onPress={()=>{add_char("1")}} char={"1"}/>
        <CalcButton onPress={()=>{add_char("2")}} char={"2"}/>
        <CalcButton onPress={()=>{add_char("3")}} char={"3"}/>
        <CalcButton char={""}/>
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalcButton onPress={()=>{add_char("0")}} char={"0"}/>
        <CalcButton char={""}/>
        <CalcButton onPress={()=>{add_char("\\mathbb{Z}")}} char={"\\mathbb{Z}"}/>
        <CalcButton onPress={handleOnPressEval} char={"ok"}/>
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

export default ExtSetGroup
;
