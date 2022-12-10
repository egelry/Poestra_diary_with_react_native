import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import VerticalText from 'react-native-vertical-text';
import _DB from '../../acts/db_acts/db_creation';
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window");

const Analysis = () => {

    //redux-persist => theme
    const { theme } = useSelector((state) => state.themeReducer)
    let themeColor = theme === "pink" ? "#d2397e" : "#385A8C"
    const style = styles()

    //state hooks
    const [days, setFuckingDays] = useState([])
    const [daysDays, setdaysDays] = useState([])
    const [daysMonths, setdaysMonths] = useState([])


    // set vertical text color
    function setVerticalTextColor(sense) {
        switch (sense) {
            case "TENHA":
                return "grey"

            case "ÖFKE":
                return "#f00518"

            case "MUTLU":
                return "#241ee3"

            case "KÖTÜ":
                return "black"

            case "SEVGİ":
                return "#eb34ba"

            default:

        }

    }

    //use effect
    useEffect(() => {
        if (daysDays.length < 10) {
            let tempDays = []
            _DB.transaction((tx) => {
                tx.executeSql("SELECT * FROM poestra", [],
                    (tx, result) => {
                        let resultLen = result.rows.length - 1

                        for (let i = 0; i < 7; i++) {
                            let item = result.rows.item(resultLen - i)

                            if (item === undefined) {
                                tempDays.push(
                                    {
                                        dayDate: "00/00/0000",
                                        daySense: "NULL",
                                        dayText: "TENHA",
                                        dayEmoji: "expressionless"
                                    }
                                )
                            }
                            else {
                                switch (item.SENSE) {
                                    case "MUTLU":
                                        tempDays.push(
                                            {
                                                dayDate: item.DATE,
                                                daySense: item.SENSE,
                                                dayText: "MUTLU",
                                                dayEmoji: "slightly-smile"
                                            }
                                        )
                                        break

                                    case "ÖFKE":
                                        tempDays.push(
                                            {
                                                dayDate: item.DATE,
                                                daySense: item.SENSE,
                                                dayText: "ÖFKE",
                                                dayEmoji: "rage"
                                            }
                                        )
                                        break

                                    case "KÖTÜ":
                                        tempDays.push(
                                            {
                                                dayDate: item.DATE,
                                                daySense: item.SENSE,
                                                dayText: "KÖTÜ",
                                                dayEmoji: "confused"
                                            }
                                        )
                                        break
                                    case "SEVGİ":
                                        tempDays.push(
                                            {
                                                dayDate: item.DATE,
                                                daySense: item.SENSE,
                                                dayText: "SEVGİ",
                                                dayEmoji: "heart-eyes"
                                            }
                                        )
                                        break


                                }
                            }

                        }


                        //days = tempdays
                        setFuckingDays(tempDays)

                        // set days
                        for (let i = 0; i < 7; i++) {

                            //null
                            if (days[i]["dayDate"][0] === "0" && days[i]["dayDate"][1] === "0") {
                                setdaysDays(daysDays => [...daysDays, "—"]);

                            }

                            //first letter equlas "0"
                            else if (days[i]["dayDate"][0] === "0") {
                                setdaysDays(daysDays => [...daysDays, days[i]["dayDate"][1]]);

                            }

                            //first letter not equals "0"
                            else {
                                setdaysDays(daysDays => [...daysDays, (days[i]["dayDate"][0] + days[i]["dayDate"][1])]);

                            }
                        }


                        // set months
                        for (let i = 0; i < 7; i++) {
                            let monthFirstLetter = days[i]["dayDate"][3]
                            let monthSecondLetter = days[i]["dayDate"][4]
                            let monthWithNum = monthFirstLetter + monthSecondLetter

                            switch (monthWithNum) {

                                //null
                                case "00":
                                    setdaysMonths(daysDays => [...daysDays, "—"]);
                                    break
                                //...
                                case "01":
                                    setdaysMonths(daysDays => [...daysDays, "Ocak"]);
                                    break
                                case "02":
                                    setdaysMonths(daysDays => [...daysDays, "Şubat"]);

                                    break
                                case "03":
                                    setdaysMonths(daysDays => [...daysDays, "Mart"]);
                                    break
                                case "04":
                                    setdaysMonths(daysDays => [...daysDays, "Nisan"]);
                                    break
                                case "05":
                                    setdaysMonths(daysDays => [...daysDays, "Mayıs"]);
                                    break
                                case "06":
                                    setdaysMonths(daysDays => [...daysDays, "Haziran"]);
                                    break
                                case "07":
                                    setdaysMonths(daysDays => [...daysDays, "Temmuz"]);
                                    break
                                case "08":
                                    setdaysMonths(daysDays => [...daysDays, "Ağustos"]);
                                    break
                                case "09":
                                    setdaysMonths(daysDays => [...daysDays, "Eylül"]);
                                    break
                                case "10":
                                    setdaysMonths(daysDays => [...daysDays, "Ekim"]);
                                    break
                                case "11":
                                    setdaysMonths(daysDays => [...daysDays, "Kasım"]);
                                    break
                                case "12":
                                    setdaysMonths(daysDays => [...daysDays, "Aralık"]);
                                    break

                            }

                        }

                    })
            })

        }

    }, [days])


    return (
        <View style={style.analysis}>
            <View style={style.analysisBox}>
                <View style={style.analysisTextBox}>
                    <Fontisto name='bar-chart' size={19} color="black" />
                    <Text style={styles(themeColor).analysisText}>HAFTALIK DUYGU DURUM</Text>
                    <View style={{ transform: [{ rotateY: '180deg' }] }}>

                        <Fontisto name='bar-chart' size={19} color="black" />
                    </View>
                </View>

                <View style={style.iconAndContentBox}>
                    <View style={style.iconBox}>
                        <View>
                            <Fontisto name='slightly-smile' size={25} color='black' />
                        </View>
                        <View style={style.rageIcon}>
                            <Fontisto name='rage' size={25} color='black' />
                        </View>
                        <View style={style.confusedIcon}>
                            <Fontisto name='confused' size={25} color='black' />
                        </View>
                        <View>
                            <Fontisto name='heart-eyes' size={25} color='black' />
                        </View>
                    </View>
                    <View style={style.verticalDivider} />
                    {
                        daysMonths.length !== 0 ?
                            <View style={style.contentBox}>

                                <View >
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[0]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[0]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>

                                        <Fontisto name={days[0]["dayEmoji"]} size={25} color='black' />

                                    </View>

                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[0]}

                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[0]}
                                        </Text>
                                    </View>

                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[1]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[1]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>
                                        <Fontisto name={days[1]["dayEmoji"]} size={25} color='black' />

                                    </View>
                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[1]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[1]}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[2]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[2]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>
                                        <Fontisto name={days[2]["dayEmoji"]} size={25} color='black' />
                                    </View>
                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[2]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[2]}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[3]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[3]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>
                                        <Fontisto name={days[3]["dayEmoji"]} size={25} color='black' />
                                    </View>
                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[3]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[3]}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[4]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[4]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>
                                        <Fontisto name={days[4]["dayEmoji"]} size={25} color='black' />
                                    </View>
                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[4]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[4]}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[5]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[5]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>
                                        <Fontisto name={days[5]["dayEmoji"]} size={25} color='black' />

                                    </View>

                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[5]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[5]}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={style.iconTextBox}>
                                        <VerticalText text={days[6]["dayText"]} style={{
                                            fontSize: 12,
                                            fontFamily: 'LeagueSpartan-Medium',
                                            color: setVerticalTextColor(days[6]["dayText"])
                                        }} />

                                    </View>
                                    <View style={style.iconContain}>

                                        <Fontisto name={days[6]["dayEmoji"]} size={25} color='black' />

                                    </View>
                                    <View style={style.dateBox}>
                                        <Text style={style.dayText}>
                                            {daysDays[6]}
                                        </Text>
                                        <Text style={style.monthText}>
                                            {daysMonths[6]}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            : <View style={style.loader}>
                                <Feather name='loader' size={25} color='black' />

                            </View>
                    }

                </View>
            </View>

        </View>
    )
}

export default Analysis

const styles = (theme) => StyleSheet.create({
    analysis: {
        width: width * 1,
        alignItems: "center",
        height: height * 0.3,
        justifyContent: "center",
    },
    analysisBox: {
        width: width * 0.95,
    },
    analysisTextBox: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    analysisText: {
        fontFamily: 'LeagueSpartan-SemiBold',
        color: theme,
        letterSpacing: 1.8,
        fontSize: 16,
        textDecorationLine: 'underline',
        margin: 10
    },
    verticalDivider: {
        height: 130,
        width: 1.5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "black"
    },
    iconBox: {
    },
    rageIcon: {
        paddingBottom: 10,
        paddingTop: 10,
    },
    confusedIcon: {
        paddingBottom: 10,
    },
    iconAndContentBox: {
        flexDirection: "row"
    },
    contentBox: {
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.95 - 36.5,
        flexDirection: "row",
    },
    iconTextBox: {
        height: height * 0.125,
        alignItems: "center"
    },
    iconText: {
        fontSize: 9,
        fontFamily: 'LeagueSpartan-Medium'
    },
    dateBox: {
        alignItems: "center",
    },
    dayText: {
        marginTop: 5,
        fontSize: 9,
        fontFamily: 'LeagueSpartan-Medium',
    },
    monthText: {
        fontSize: 9,
        fontFamily: 'LeagueSpartan-Medium',
    },
    iconContain: {
        alignItems: "center"
    },
    loader: {
        alignItems: "center",
        width: width * 0.95 - 36.5,
        alignSelf: "center",
        justifyContent: "center"
    }
})