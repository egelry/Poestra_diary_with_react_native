import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import THEME_COLOR from '../../acts/theme_color'


const { height, width } = Dimensions.get("window");

const Day = ({ titleprmt, contentprmt }) => {

    //redux-persist
    let theme_color = THEME_COLOR()
    const style = styles()


    return (
        <SafeAreaView style={style.day}>
            <View style={style.dayTitle}>
                <Text style={styles(theme_color).dayTitleText}>
                    {titleprmt}
                </Text>

            </View>
            <ScrollView style={style.dayContent}>
                <Text style={style.dayContentText}>
                    {contentprmt}


                </Text>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Day

const styles = (theme) => StyleSheet.create({
    day: {
        width: width * .93,
        alignSelf: "center",
        marginTop: 10,
    },
    dayTitle: {
        height: height * 0.06,
        justifyContent: "center",
    },
    dayContent: {
    },
    dayTitleText: {
        fontSize: 20,
        fontFamily: 'LeagueSpartan-SemiBold',
        letterSpacing: 1.3,
        color: theme
    },
    dayContentText: {
        fontFamily: 'LeagueSpartan-Medium',
        letterSpacing: 1.3,
        fontSize: 16,
        textAlign: "justify"

    }
})