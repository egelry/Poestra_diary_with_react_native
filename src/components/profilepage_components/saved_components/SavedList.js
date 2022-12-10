import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler'
import THEME_COLOR from '../../../acts/theme_color'

const { height, width } = Dimensions.get("window");


const Item = ({ title, date, sense, emoji, content, navigation }) => {

    // redux-persist
    let theme_color = THEME_COLOR()
    const style = styles()

    return (


        <View style={{ marginTop: 10 }}>
            <TouchableOpacity
                style={style.button}
                onPress={() => {
                    navigation.navigate('DayContent',
                        {

                            dateprmt: date,
                            titleprmt: title,
                            contentprmt: content,
                            senseprmt: sense,
                            savedprmt: 1,
                        })
                }}>
                <View style={style.lastDay}>
                    <View style={styles(theme_color).lastDayBox}>
                        <View style={style.horizontalItems}>
                            <View style={style.iconAndTitle}>
                                <View>
                                    <Fontisto name={emoji} size={25} color="black" />
                                </View>
                                <View style={style.title}>
                                    <Text style={style.titleText}>{title}</Text>
                                </View>
                            </View>
                            <View style={style.lastWritten}>
                                <Text style={style.titleText}>{date}</Text>


                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </View>

    );
}

const SavedList = ({ route, navigation }) => {

    const style = styles()

    // state hook
    const [savedListArr, setSavedListArr] = useState([])

    useEffect(() => {
        const { savedArr } = route.params
        setSavedListArr(savedArr)
    }, [savedListArr])

    const renderItem = ({ item }) => (
        <Item
            title={item.dayTitle}
            date={item.dayDate}
            sense={item.daySense}
            emoji={item.dayEmoji}
            content={item.dayContent}
            navigation={navigation} />
    );
    return (

        <View style={style.savedList}>
            <View style={style.appBar}>
                <View style={style.appBarBox}>

                    <TouchableOpacity
                        style={style.button}
                        onPress={() => {
                            navigation.navigate("ProfilePage");
                        }}>
                        <View style={style.popBox}>
                            <Feather name="arrow-left" size={25} color="black" />
                        </View>
                    </TouchableOpacity>

                    <View style={style.savedTextBox}>
                        <Text style={style.savedText}>
                            KAYDEDİLENLER
                        </Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={savedListArr}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    return index.toString()
                }}
            />
        </View>
    )
}

export default SavedList

const styles = (theme) => StyleSheet.create({
    savedList: {
        height: height * 1,
        backgroundColor: "white"
    },
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
    popBox: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.12,
        height: height * 0.1,
        alignItems: "flex-start"
    },
    savedTextBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    savedText: {
        fontSize: 13,
        fontFamily: 'LeagueSpartan-Medium',
        letterSpacing: 1.3
    },
    lastDay: {
        height: height * 0.1,
        alignItems: "center",
        justifyContent: "center",

    },
    lastDayBox: {
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width: width * 0.94,
        borderColor: theme,
        borderWidth: 1,
        borderRadius: 10,



    },
    horizontalItems: {
        width: width * 0.9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: height * 0.1
    },
    iconAndTitle: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    title: {
        marginLeft: 10,
    },
    titleText: {
        color: "black",
        fontFamily: 'LeagueSpartan-Light',
        letterSpacing: 1.3,
        fontSize: 14,
    },
    lastWritten: {
        alignItems: "center"
    },


})









