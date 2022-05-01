import React from 'react';
import { ScrollView, View, Text } from 'moti';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';

// import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import MathJax from 'react-native-mathjax';
const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
      processEscapes: true,
    },
    TeX: {
      extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "noErrors.js",
        "noUndefined.js",
      ],
    },
  };
const InfoScreen = () => {
    return (<ScrollView style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <Text style={{fontSize: 24}}> Tensor calculator.</Text>
        <Text>{""}</Text>
        <Text style={{fontSize: 20}}> * Group.</Text>
        <MathJax
            mathJaxOptions={mmlOptions}
            html={`
<p>A group is a set $G$ together with a binary operation</p>
<p>$$ G\\times G \\to G\\,,\\ (a, b) \\mapsto a \\ast b $$</p>
<p>satisfying the following conditions;</p>
<p><b>G1:</b> (assosiativity) for all $a, b, c \\in G$,</p>
<p>$$ (a \\ast b) \\ast c = a \\ast (b \\ast c);$$</p>
<p><b>G2:</b> (existance of a neutral element) there exists an element $e \\in G$ such that</p>
<p>$$ a \\ast e = a = e \\ast a$$</p>
<p>for all a ∈ G;</p>
<p><b>G3:</b> (existance of inverses) for each $a \\in G$, there exists an $a' \\in G$ such that</p>
<p>$$ a \\ast a' = e = a' \\ast a.$$</p>
`}
        />
        <Text style={{fontSize: 20}}> * Ring.</Text>
        {/* <Button title="Tensor Calculator"
            onPress={()=>navigation.navigate("Tensor Calculator")} />
        <Button title="Function Calculator"
            onPress={()=>navigation.navigate("Function Calculator")} /> */}
        <Text>{"\n\n\n"}</Text>
        <Text style={{fontSize: 11}}>&copy;2022{" furea2 presents."}</Text>        
        <Text>{""}</Text>
        </View>
        </View>
        </View>
    </ScrollView>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "#eee",
        // marginTop: 20,
    },
    calculation: {
        margin: 3,
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "white",
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: 'center',
        fontSize: 42,
        opacity: .95,
    },
})

export default InfoScreen;
