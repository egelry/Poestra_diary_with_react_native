
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import THEME_COLOR from '../../acts/theme_color'
import NAME_SURNAME from '../../acts/name_surname'

const { height, width } = Dimensions.get("window");

const HeaderContent = () => {

    let theme_color = THEME_COLOR()
    let name_surname = NAME_SURNAME()
    const style = styles()
    return (
        <View style={style.headerContent}>
            <View style={style.poestraBox}>
                <Feather name="user" size={60} color={theme_color} />

            </View>
            <View style={style.nameSurnameBox}>
                <Text style={style.nameText}>
                    {name_surname.name}
                </Text>
                <Text style={style.surnameText}>
                    {name_surname.surname}
                </Text>
            </View>
        </View>
    )
}

export default HeaderContent

const styles = (theme) => StyleSheet.create({
    headerContent: {
        height: height * 0.35,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    poestraBox: {
        height: 150,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 75
    },
    poestraText: {
        fontSize: 25,
        fontFamily: 'PlayfairDisplay-SemiBold',
        color: theme
    },
    nameSurnameBox: {
        alignItems: "center"
    },
    nameText: {
        fontSize: 23,
        fontFamily: "LeagueSpartan-Regular",
        color: "black"
    },
    surnameText: {
        fontSize: 23,
        fontFamily: "LeagueSpartan-Regular"

    }
})