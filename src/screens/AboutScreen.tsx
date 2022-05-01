import React from 'react';
import { ScrollView, View, Text } from 'moti';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';

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
const AboutScreen = () => {
    return (<ScrollView style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <Text style={{fontSize: 24}}> Tensor calculator.</Text>
        <Text>{""}</Text>
        <Button title="Tensor Calculator"
            onPress={()=>navigation.navigate("Tensor Calculator")} />
        <Text>{"  Tensor culculator is for culculating tensor product and Z-homomorphism set of a abel group."}</Text>
        <Button title="Function Calculator"
            onPress={()=>navigation.navigate("Function Calculator")} />
        <Text>{"  Function culculator is for culculating kernel, image and cokernel of a abel group."}</Text>
        <Text>{""}</Text>
        <MathJax
            mathJaxOptions={mmlOptions}
            html={`

<h3>・Tensor Product</h3>
<p>For $A$ and $B$ two abelian groups, their tensor produc $A \\otimes B$ is
 the quotient of the free abelian group on the product of their underlying sets
 $A \\times B$ by the following relations</p>
<ul>
<li>$(a_1,b)+(a_2,b)\\sim(a_1+a_2,b)$</li>
<li>$(a,b_1)+(a,b_2)\\sim(a_,b_1+b_2)$</li>
</ul>
<p>for all $a, a_1, a_2 \\in A$ and $b, b_1, b_2 \\in B$.</p>

<h3>・Homomorphisms set</h3>
<p>The homomorphisms set $Hom(f)$ of a morphism $f:A \\to B$ is the collenction
 of all homomorphisms from $A$ to $B$.</p>

<h3>・Kernel</h3>
<p>The kernel of a morphism $f:A \\to B$ is that part of its domain which is sent to zero.</p>

<h3>・Image</h3>
<p>The image of a morphism $f:A \\to B$ is the subset of $B$ consisting of all those elements $b \\in B$ that are form $f(a)$ for some $a \\in A$.</p>

<h3>・Cokernel</h3>
<p>The cokernel of a morphism $f:A \\to B$ is the quotient of $B$ by the image of $f$.</p>

<h3>・Example 1</h3>
<p>Now we begin considering about $f:\\mathbb{Z} \\to \\mathbb{Z}, 1\\mapsto 2$.</p>

<p>The kernel of $f$ is subset of $\\mathbb{Z}$ which elents is sent to zero;</p>
<p>$$Ker(f) = \\{n|2n=0\\} = \\{0\\}.$$</p>

<p>Then the result set has only one element zero. Next, The image of $f$ is subset of $\\mathbb{Z}$ which elents has the form $f(a)$ for some element $a \\in \\mathbb{Z}$;</p>
<p>$$Im(f) = \\{n|n=f(m) \\text{ for some }m \\in \\mathbb{Z} \\} = 2\\mathbb{Z} \\cong \\mathbb{Z}.$$</p>

<p>Finally the cokernel of $f$ is the quotient of $\\mathbb{Z}$ by $Im(f)=2\\mathbb{Z}$;</p>
<p>$$ Coker(f) = \\mathbb{Z}/Im(f) \\cong \\mathbb{Z}/\\mathbb{Z}.$$</p>

<h3>・Example 2</h3>
<p>Considering that $f:\\mathbb{Z}/4\\mathbb{Z} \\to \\mathbb{Z}/6\\mathbb{Z}, 1\\mapsto 3$.</p>

<p>$$Ker(f) = \\{n\\in \\mathbb{Z}/4\\mathbb{Z}|3n=0\\text{ mod }6\\} \\\\
  = 2\\mathbb{Z}/4\\mathbb{Z} \\cong \\mathbb{Z}/2\\mathbb{Z}.$$</p>
<p>$$Im(f) = \\{n\\in \\mathbb{Z}/6\\mathbb{Z}|n=f(m)\\ \\exists m \\in \\mathbb{Z}/4\\mathbb{Z} \\} \\\\
  = 3\\mathbb{Z}/6\\mathbb{Z} \\cong \\mathbb{Z}/2\\mathbb{Z}.$$</p>
<p>$$ Coker(f) = (\\mathbb{Z}/6\\mathbb{Z})/Im(f) = (\\mathbb{Z}/6\\mathbb{Z})/(3\\mathbb{Z}/6\\mathbb{Z}) \\\\
  \\cong \\mathbb{Z}/3\\mathbb{Z}.$$</p>
`}
        />
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

export default AboutScreen;
