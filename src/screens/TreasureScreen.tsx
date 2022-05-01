import React from 'react';
import { ScrollView, View, Text } from 'moti';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

const TreasureScreen = () => {
    return (<ScrollView style={styles.container}>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <View style={styles.calculation}>
        <Text style={{fontSize: 24}}> Tensor calculator.</Text>
        <Text>{""}</Text>
        <Text style={{fontSize: 20}}> * Group.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={14} fontCache={true}>{`
    <p>A group is a set $$G$$ together with a binary operation</p><br/>
                        <p>$$ G\\times G \\to G\\,,\\ (a, b) \\mapsto a \\ast b $$</p><br/>
  <p>satisfying the following conditions;</p><br/>
    <p><b>G1:</b> (assosiativity) for all $$a, b, c \\in G$$,</p><br/>
                              <p>$$ (a \\ast b) \\ast c = a \\ast (b \\ast c);$$</p><br/>
    <p><b>G2:</b> (existance of a neutral element) there exists \n an element e ∈ G such that</p><br/><p>&nbsp;</p><br/>
                                    <p>$$ a \\ast e = a = e \\ast a$$</p><br/>
    <p>for all a ∈ G;</p><br/>
    <p><b>G3:</b> (existance of inverses) for each a ∈ G, there \n exists an a' ∈ G such that</p><br/><p>&nbsp;</p><br/>
                                  <p>$$ a \\ast a' = e = a' \\ast a.$$</p>
`}
        </MathJaxSvg>
        <Text style={{fontSize: 20}}> * Ring.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={16} fontCache={true}>{`
    <p>comming soon...</p>
`}
        </MathJaxSvg>
        <Text style={{fontSize: 20}}> * Module.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={16} fontCache={true}>{`
    <p>comming soon...</p>
`}
        </MathJaxSvg>
        <Text style={{fontSize: 20}}> * Tensor.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={16} fontCache={true}>{`
    <p>comming soon...</p>
`}
        </MathJaxSvg>
        <Text style={{fontSize: 20}}> * Homomorphism.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={16} fontCache={true}>{`
    <p>comming soon...</p>
`}
        </MathJaxSvg>
        <Text style={{fontSize: 20}}> * Image and Kernel.</Text>
        <Text>{""}</Text>
        <MathJaxSvg fontSize={16} fontCache={true}>{`
    <p>comming soon...</p>
`}
        </MathJaxSvg>

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

export default TreasureScreen;
