import React from 'react';
import { ScrollView, View, Text } from 'moti';
import { StyleSheet, Button } from 'react-native';

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
const AboutPi_4_3 = ({navigation}) => {
    return (<ScrollView style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
            <Text style={{fontSize: 24}}> The homotopy groups of spheres.</Text>
            <Text>{""}</Text>
            <MathJax
                mathJaxOptions={mmlOptions}
                html={`
<h3>・James' exact sequence</h3>
<p>There is a exact sequence of group and homomorphisms</p>
<p>$$\\begin{array}{l}
\\cdots \\overset{\\Sigma}{\\longrightarrow} \\pi_{i+1}(S^{n+1})
    \\overset{H}{\\longrightarrow} \\pi_{i+1}(S^{2n+1})
        \\overset{\\Delta}{\\longrightarrow} \\pi_{i-1}(S^n) \\\\ \\ \\ \\ \\ \\ \\
\\overset{\\Sigma}{\\longrightarrow} \\pi_i(S^{n+1})
    \\overset{H}{\\longrightarrow} \\pi_i(S^{2n+1})
        \\overset{\\Delta}{\\longrightarrow} \\cdots
\\end{array}$$</p>
<p>which is exact for odd $n$ and for $i<3n-1$.</p>


<h3>・<b>$\\pi_{4}(S^3)$</b></h3>
<p>In the above sequence, for $i=4$ and $n=2$ and we have</p>
<p>$$\\begin{array}{c}
\\pi_{5}(S^5) &
    \\overset{\\Delta}{\\rightarrow} & \\pi_{3}(S^2) &
        \\overset{\\Sigma}{\\rightarrow} & \\pi_4(S^3) &
            \\overset{H}{\\rightarrow} &
                \\pi_4(S^5) \\\\
\\downarrow \\cong &
        & \\downarrow \\cong &
            & \\downarrow \\cong & & \\Arrowvert \\\\
\\mathbb{Z} &
    \\overset{\\times 2}{\\rightarrow} & \\mathbb{Z} &
        \\rightarrow & ? &
            \\rightarrow &
                0
\\end{array}$$</p>

<p>You can calculate by using <b>function calculator</b>.</p>
<p>Then the result group $\\pi_4(S^3)$ is $\\mathbb{Z}/2\\mathbb{Z}$.</p>
<p></p>
<p></p>
<p></p>
<p></p>

`}
            />
            <Button
                title={"Go back"}
                onPress={()=>navigation.goBack()} />
            <Text>{"\n\n\n"}</Text>
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

export default AboutPi_4_3;
