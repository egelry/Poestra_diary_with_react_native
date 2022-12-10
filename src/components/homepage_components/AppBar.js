import { StyleSheet, Text, View, Dimensions, } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get("window");

const AppBar = () => {
   
    return (
        <View style={styles.appBar}>
            <Text style={styles.poestraText}>POESTRA</Text>
        </View>
    )
}

export default AppBar

const styles = StyleSheet.create({
    appBar: {
        width: width * 1,
        height: height * 0.07,
        alignItems: "center",
        justifyContent: "center",

        
    },
    poestraText: {
        color : "#000",
        fontFamily: 'PlayfairDisplay-Black',
        letterSpacing: 2.6,
        fontSize: 23,

    }
})