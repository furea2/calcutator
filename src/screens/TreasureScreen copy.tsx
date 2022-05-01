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
const TreasureScreen = () => {
    return (<ScrollView style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
            <Text style={{fontSize: 24}}> The homotopy groups of spheres.</Text>
            <Text>{""}</Text>
            <MathJax
                mathJaxOptions={mmlOptions}
                html={`
<h3>James' exact sequence</h3>
<p>There is a sequence of group and homomorphisms</p>
<p>$$\\begin{array}{l}
\\cdots \\overset{\\Sigma}{\\longrightarrow} \\pi_{i+1}(S^{n+1})
    \\overset{H}{\\longrightarrow} \\pi_{i+1}(S^{2n+1})
        \\overset{\\Delta}{\\longrightarrow} \\pi_{i-1}(S^n) \\\\ \\ \\ \\ \\ \\ \\
\\overset{\\Sigma}{\\longrightarrow} \\pi_i(S^{n+1})
    \\overset{H}{\\longrightarrow} \\pi_i(S^{2n+1})
        \\overset{\\Delta}{\\longrightarrow} \\cdots
\\end{array}$$</p>
<p>which is exact for odd $n$ and for $i<3n-1$.</p>


<h3>・<b>Hopf fibrations</b></h3>
<p>$n$ is $1, 3$ or $7$, then $S^n \\overset{i}{\\to} S^{2n+1} \\overset{p}{\\to} S^{n+1}$ is a homotopy fiberation, $S^n$ is $H$-space and</p>
<p>$$\\Sigma\\oplus p_\\ast : \\pi_i(S^n)\\oplus\\pi_{i+1}(S^{2n+1}) \\cong \\pi_{i+1}(S^{n+1})$$</p>
<p>is equivalence for all $i$.</p>
<p>Especialy, we have $\\pi_5(S^3)\\cong\\pi_6(S^4)$ and $\\pi_i(S^3)\\cong\\pi_i(S^2)$ for all $i\\ge 3$.</p>



<h3>・<b>$\\pi_{4}(S^3)$</b></h3>
<p>$$\\begin{array}{c}
\\pi_{5}(S^5) &
    \\overset{\\Delta}{\\rightarrow} & \\pi_{3}(S^2) &
        \\overset{\\Sigma}{\\rightarrow} & \\pi_4(S^3) &
            \\overset{H}{\\rightarrow} &
                \\pi_4(S^5) \\\\
\\downarrow \\cong &
        & \\downarrow \\cong &
            & \\Arrowvert & & \\Arrowvert \\\\
\\mathbb{Z} &
    \\overset{\\times 2}{\\rightarrow} & \\mathbb{Z} &
        \\rightarrow & ? &
            \\rightarrow &
                0
\\end{array}$$</p>


<h3>・<b>$\\pi_5(S^3)$</b></h3>
<p>For the above suspension isomorphism, we heve</p>
<p>$$\\pi_4(S^3) \\overset{\\cong}{\\longrightarrow} \\pi_4(S^2).$$</p>
<p>$$\\begin{array}{c}
\\pi_{6}(S^5) &
    \\overset{\\Delta}{\\rightarrow} & \\pi_4(S^2) &
        \\overset{\\Sigma}{\\rightarrow} & \\pi_5(S^3) &
            \\overset{H}{\\rightarrow} &
                \\pi_5(S^5) \\\\
\\downarrow \\cong &
        & \\downarrow \\cong &
            & \\Arrowvert & & \\Arrowvert \\\\
\\mathbb{Z}/2\\mathbb{Z} &
    \\overset{0}{\\rightarrow} & \\mathbb{Z}/2\\mathbb{Z} &
        \\rightarrow & ? &
            \\overset{0}{\\rightarrow} &
                \\mathbb{Z}
\\end{array}$$</p>


<h3>・<b>$\\pi_6(S^4)$</b></h3>
<p>For the above suspension isomorphism, we heve</p>
<p>$$\\pi_5(S^3) \\overset{\\cong}{\\longrightarrow} \\pi_6(S^4).$$</p>
`}
            />
            <Text>{"\n\n\n"}</Text>
            <Text style={{fontSize: 11}}>&copy;2022{" furea2 presents."}</Text>        
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

export default TreasureScreen;
