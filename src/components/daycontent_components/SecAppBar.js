import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import THEME_COLOR from '../../acts/theme_color'

import _DB from '../../acts/db_acts/db_creation';


const { height, width } = Dimensions.get("window");

const SecAppBar = ({ senseprmt, dateprmt, savedprmt }) => {

    //state hooks
    const [saved, setSaved] = useState(false)
    const [sense, setSense] = useState("")

    const [load, setLoad] = useState(true)
    //redux-persist - theme color
    let theme_color = THEME_COLOR()


    function setSavedFunc() {
        let value = 0
        if (!saved) {
            value = 1
        }
        else {
            value = 0
        }
        _DB.transaction((tx) => {
            tx.executeSql("UPDATE poestra SET SAVED=? WHERE DATE=?", [value, dateprmt],
                (tx, result) => {

                })

        })
    }

    useEffect(() => {

        console.log("SAVED PARAMETER " + savedprmt)
        if (savedprmt === 0) {
            setSaved(false)

        }
        else if (savedprmt === 1) {
            setSaved(true)

        }



        switch (senseprmt) {
            case "MUTLU":
                setLoad(false)
                setSense("slightly-smile")
                break

            case "ÖFKE":
                setLoad(false)
                setSense("rage")
                break

            case "KÖTÜ":
                setLoad(false)
                setSense("confused")
                break
            case "SEVGİ":
                setLoad(false)
                setSense("heart-eyes")
                break

        }


    }, [savedprmt, senseprmt])

    return (
        load ? <View style={{ alignItems: "center", justifyContent: "center" }}>

            <Feather name='loader' size={25} color='black' />

        </View> : <View style={styles.secAppBar}>

            <View style={styles.iconAndFeelBox}>
                <View style={styles.emojiBox}>

                    <Fontisto name={sense} size={40} />
                </View>
                <View style={styles.feelTextBox}>
                    <Text style={styles.feelText}>{senseprmt}</Text>
                </View>
            </View>
            <View style={styles.savedBox}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setSaved(!saved)
                        setSavedFunc()

                    }}>
                    <View style={styles.savedIconBox}>
                        <Fontisto
                            name={saved ? 'bookmark-alt' : 'bookmark'}
                            size={28}
                            color={theme_color} />

                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default SecAppBar

const styles = StyleSheet.create({

    secAppBar: {
        flexDirection: "row",
        width: width * 0.93,
        alignSelf: "center",
        justifyContent: "space-between",
    },
    iconAndFeelBox: {
        flexDirection: "row"
    },
    feelTextBox: {
        height: height * .1,
        justifyContent: "center",
        marginLeft: 10
    },
    feelText: {
        letterSpacing: 6,
        fontSize: 18,
        fontFamily: 'LeagueSpartan-SemiBold',
        textDecorationLine: 'underline'
    },
    savedBox: {
        height: height * .1,
        justifyContent: "center",
    },
    savedIconBox: {
        height: height * .1,
        width: width * 0.1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    emojiBox: {
        height: height * 0.1,
        justifyContent: "center"
    },
})