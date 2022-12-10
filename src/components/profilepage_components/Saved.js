import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import THEME_COLOR from '../../acts/theme_color'
import _DB from '../../acts/db_acts/db_creation'

const { height, width } = Dimensions.get("window");



const Saved = ({ navigation }) => {

    const [savedArr, setSavedArr] = useState([])
    const [lastSaved, setLastSaved] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        let tempArr = []
        _DB.transaction((tx) => {
            tx.executeSql("SELECT * FROM poestra WHERE SAVED=1", [],
                (tx, result) => {

                    let count = 0
                    while (result.rows.item(count) !== undefined) {
                        let item = result.rows.item(count)
                        switch (item.SENSE) {
                            case "MUTLU":
                                setLoad(false)
                                tempArr.push(
                                    {
                                        dayTitle: item.TITLE,
                                        dayContent: item.CONTENT,
                                        dayDate: item.DATE,
                                        daySense: item.SENSE,
                                        dayText: "MUTLU",
                                        dayEmoji: "slightly-smile"
                                    }
                                )
                                break

                            case "ÖFKE":
                                setLoad(false)
                                tempArr.push(
                                    {
                                        dayTitle: item.TITLE,
                                        dayContent: item.CONTENT,
                                        dayDate: item.DATE,
                                        daySense: item.SENSE,
                                        dayText: "ÖFKE",
                                        dayEmoji: "rage"
                                    }
                                )
                                break

                            case "KÖTÜ":
                                setLoad(false)
                                tempArr.push(
                                    {
                                        dayTitle: item.TITLE,
                                        dayContent: item.CONTENT,
                                        dayDate: item.DATE,
                                        daySense: item.SENSE,
                                        dayText: "KÖTÜ",
                                        dayEmoji: "confused"
                                    }
                                )
                                break
                            case "SEVGİ":
                                setLoad(false)
                                tempArr.push(
                                    {
                                        dayTitle: item.TITLE,
                                        dayContent: item.CONTENT,
                                        dayDate: item.DATE,
                                        daySense: item.SENSE,
                                        dayText: "SEVGİ",
                                        dayEmoji: "heart-eyes"
                                    }
                                )
                                break


                        }

                        count++
                    }



                    setSavedArr(tempArr)

                    let lastSavedTemp = []

                    lastSavedTemp.push(savedArr[savedArr.length - 1]["dayTitle"])
                    lastSavedTemp.push(savedArr[savedArr.length - 1]["dayEmoji"])
                    lastSavedTemp.push(savedArr[savedArr.length - 1]["dayContent"])
                    lastSavedTemp.push(savedArr[savedArr.length - 1]["dayDate"])
                    lastSavedTemp.push(savedArr[savedArr.length - 1]["daySense"])


                    setLastSaved(lastSavedTemp)


                })

        })
    }, [savedArr, lastSaved])



    let theme_color = THEME_COLOR()
    const style = styles()
    return (
        load ? <View style={{
            height: height * 0.31,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={{
                fontFamily: "LeagueSpartan-Medium",
                fontSize: 13,
                letterSpacing: 1.3
            }}
            >KAYDEDİLENLER BURADA GÖZÜKÜR
            </Text>

        </View> :

            <View style={style.saved}>
                <View style={style.savedTextBox}>
                    <Feather name='bookmark' size={18} />
                    <Text style={styles(theme_color).savedText}>KAYDEDİLENLER</Text>
                    <View style={{ transform: [{ rotateY: '180deg' }] }}>
                        <Feather name='bookmark' size={18} />

                    </View>
                </View>


                <View style={style.lastDay}>
                    <View style={styles(theme_color).lastDayBox}>


                        <TouchableOpacity
                            style={style.button}

                            onPress={() => {

                                navigation.navigate('DayContent',
                                    {

                                        dateprmt: lastSaved[3],
                                        titleprmt: lastSaved[0],
                                        contentprmt: lastSaved[2],
                                        senseprmt: lastSaved[4],
                                        savedprmt: 1,
                                    })


                            }}>
                            <View style={style.horizontalItems}>
                                <View style={style.iconAndTitle}>
                                    <View>
                                        <Fontisto name={lastSaved[1]} size={25} color="black" />
                                    </View>
                                    <View style={style.title}>
                                        <Text style={style.titleText}>{lastSaved[0]}</Text>
                                    </View>
                                </View>
                                <View style={style.lastWritten}>
                                    <Text style={style.titleText}>Son</Text>
                                    <Text style={style.titleText}>Kaydedilen</Text>
                                    <View style={style.iconBoxPen}>
                                        <Feather name='edit-2' size={13} color="black" />

                                    </View>

                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => {
                        console.log("saved arr : " + savedArr)
                        navigation.navigate("SavedList",
                            {
                                savedArr: savedArr
                            });
                    }}>
                    <View style={style.iconBox}>
                        <Fontisto name='angle-dobule-down' size={20} />

                    </View>
                </TouchableOpacity>
            </View>
    )
}



export default Saved

const styles = (theme) => StyleSheet.create({
    saved: {
        height: height * 0.31,
    },
    savedTextBox: {
        width: width * 1,
        height: height * 0.08,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    savedText: {
        fontFamily: 'LeagueSpartan-SemiBold',
        letterSpacing: 1.5,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        color: theme
    },
    iconBox: {
        width: width * 1,
        alignItems: "center",
        marginTop: 20
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
    iconBoxPen: {
        marginTop: 5
    },
    emptyTextBox: {
        alignItems: "center"
    },
    emptyText: {
        fontFamily: 'LeagueSpartan-Medium',
        fontSize: 12,
        color: "black",
        letterSpacing: 1.2
    }

})