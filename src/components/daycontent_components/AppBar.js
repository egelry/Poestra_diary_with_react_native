import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'

const { height, width } = Dimensions.get("window");

const AppBar = ({dateprmt, navigation }) => {

    let date = dateprmt
    return (
        <View style={styles.appBar}>
            <View style={styles.appBarBox}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("HomePage");
                    }}>
                    <View style={styles.popBox}>
                        <Feather name="arrow-left" size={25} color="black" />
                    </View>
                </TouchableOpacity>


                <View style={styles.profileTextBox}>
                    <Text style={styles.profileText}>
                        {date}
                    </Text>
                </View>
            </View>

        </View>

    )
}

export default AppBar

const styles = StyleSheet.create({
   
    appBar: {
        height: height * 0.1,
        width: width * 1,
        backgroundColor: "white",
        alignItems: "center"

    },
    appBarBox: {
        height: height * 0.1,
        width: width * 0.9,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between"

    },
    emojiBox: {
        height: height * 0.1,
        justifyContent: "center"
    },
    popBox: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.12,
        height: height * 0.1,
        alignItems: "flex-start"
    },
    profileTextBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    profileText: {
        fontSize: 15,
        fontFamily: 'LeagueSpartan-Medium',
        letterSpacing: 1.3
    },
   
})