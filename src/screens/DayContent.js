import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Divider from '../components/daycontent_components/Divider'
import AppBar from '../components/daycontent_components/AppBar'
import SecAppBar from '../components/daycontent_components/SecAppBar'
import Day from '../components/daycontent_components/Day'

const { height, width } = Dimensions.get("window");

const DayContent = ({ route, navigation }) => {
    const { dateprmt, titleprmt, contentprmt, senseprmt, savedprmt } = route.params;
    console.log("dateprmt : " + dateprmt)

    return (
        <View style={styles.dayContent}>
            <AppBar navigation={navigation} dateprmt={dateprmt} />
            <SecAppBar senseprmt={senseprmt}  dateprmt={dateprmt} savedprmt={savedprmt}/>
            <Divider />
            <Day titleprmt={titleprmt} contentprmt={contentprmt} />

        </View>
    )
}

export default DayContent

const styles = StyleSheet.create({
    dayContent: {
        height: height * 1,
        backgroundColor: "white",
    },

})