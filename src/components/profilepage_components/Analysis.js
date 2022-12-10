
import { StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import THEME_COLOR from '../../acts/theme_color'

import _DB from '../../acts/db_acts/db_creation'


const { height, width } = Dimensions.get("window");

const Analysis = () => {

    // redux-persist
    let theme_color = THEME_COLOR()
    const style = styles()

    //states
    const [mutluState, setMutluState] = useState(0)
    const [ofkeState, setOfkeState] = useState(0)
    const [kotuState, setKotuState] = useState(0)
    const [sevgiState, setSevgiState] = useState(0)
    const [load, setLoad] = useState(true)

    // compute percentile
    const [mutluPer, setMutluPerState] = useState(0)
    const [ofkePer, setOfkePerState] = useState(0)
    const [sevgiPer, setSevgiPerState] = useState(0)
    const [kotuPer, setKotuPerState] = useState(0)

    function computePercentile(mutluPar, ofkePar, sevgiPar, kotuPar, total) {
        setMutluPerState(parseInt(((mutluPar / total) * 100)))
        setOfkePerState(parseInt(((ofkePar / total) * 100)))
        setSevgiPerState(parseInt(((sevgiPar / total) * 100)))
        setKotuPerState(parseInt(((kotuPar / total) * 100)))
    }

    //use effect
    useEffect(() => {
        let mutlu = 0
        let ofke = 0
        let kotu = 0
        let sevgi = 0
        _DB.transaction((tx) => {
            tx.executeSql("SELECT * FROM poestra", [],
                (tx, result) => {
                    let count = 0
                    while (result.rows.item(count) !== undefined) {

                        let item = result.rows.item(count)
                        count++
                        switch (item.SENSE) {
                            case "MUTLU":
                                setLoad(false)
                                mutlu++
                                break;
                            case "ÖFKE":
                                setLoad(false)
                                ofke++
                                break;
                            case "SEVGİ":
                                setLoad(false)
                                sevgi++
                                break;
                            case "KÖTÜ":
                                setLoad(false)
                                kotu++
                                break;

                        }
                    }
                    let total = parseInt(ofke) + parseInt(sevgi) + parseInt(mutlu) + parseInt(kotu)

                    computePercentile(mutlu, ofke, sevgi, kotu, total)

                    if (ofkePer > 0) {
                        setOfkeState(ofkePer)
                    }

                    if (sevgiPer > 0) {
                        setSevgiState(sevgiPer)
                    }

                    if (mutluPer > 0) {
                        setMutluState(mutluPer)
                    }
                    if (kotuPer > 0) {
                        setKotuState(kotuPer)

                    }


                })


        })

    }, [ofkePer, sevgiPer, kotuPer, mutluPer])

    return (
        load ? <View style={style.analysis}>
            <View style={style.percentileTitleBox}>
                <Feather name='bar-chart' size={18} />
                <Text style={styles(theme_color).percentileTitleText}>DUYGU YÜZDELERİ</Text>
                <View style={{ transform: [{ rotateY: '180deg' }] }}>
                    <Feather name='bar-chart' size={18} />

                </View>
            </View>
            <View style={style.emojiBox}>

                <View style={style.iconBox}>
                    <Fontisto name='slightly-smile' size={44} />
                    <View style={style.emojiTextBox}>
                        <Text style={style.emojiText}>
                            MUTLU
                        </Text>
                    </View>
                    <View style={style.percentile}>
                        <Text style={style.percentileText}>
                            0%
                        </Text>
                    </View>
                </View>
                <View style={style.iconBox}>
                    <Fontisto name='rage' size={44} />
                    <View style={style.emojiTextBox}>
                        <Text style={style.emojiText}>
                            ÖFKE
                        </Text>
                    </View>
                    <View style={style.percentile}>
                        <Text style={style.percentileText}>
                            0%
                        </Text>
                    </View>
                </View>
                <View style={style.iconBox}>
                    <Fontisto name='confused' size={44} />
                    <View style={style.emojiTextBox}>
                        <Text style={style.emojiText}>
                            KÖTÜ
                        </Text>

                    </View>
                    <View style={style.percentile}>
                        <Text style={style.percentileText}>
                            0%
                        </Text>
                    </View>
                </View>
                <View style={style.iconBox}>
                    <Fontisto name='heart-eyes' size={44} />
                    <View style={style.emojiTextBox}>
                        <Text style={style.emojiText}>
                            SEVGİ
                        </Text>
                    </View>
                    <View style={style.percentile}>
                        <Text style={style.percentileText}>
                            0%
                        </Text>
                    </View>
                </View>

            </View>
        </View>
            :
            <View style={style.analysis}>
                <View style={style.percentileTitleBox}>
                    <Feather name='bar-chart' size={18} />
                    <Text style={styles(theme_color).percentileTitleText}>DUYGU YÜZDELERİ</Text>
                    <View style={{ transform: [{ rotateY: '180deg' }] }}>
                        <Feather name='bar-chart' size={18} />

                    </View>
                </View>
                <View style={style.emojiBox}>

                    <View style={style.iconBox}>
                        <Fontisto name='slightly-smile' size={44} />
                        <View style={style.emojiTextBox}>
                            <Text style={style.emojiText}>
                                MUTLU
                            </Text>
                        </View>
                        <View style={style.percentile}>
                            <Text style={style.percentileText}>
                                {mutluState}%
                            </Text>
                        </View>
                    </View>
                    <View style={style.iconBox}>
                        <Fontisto name='rage' size={44} />
                        <View style={style.emojiTextBox}>
                            <Text style={style.emojiText}>
                                ÖFKE
                            </Text>
                        </View>
                        <View style={style.percentile}>
                            <Text style={style.percentileText}>
                                {ofkeState}%
                            </Text>
                        </View>
                    </View>
                    <View style={style.iconBox}>
                        <Fontisto name='confused' size={44} />
                        <View style={style.emojiTextBox}>
                            <Text style={style.emojiText}>
                                KÖTÜ
                            </Text>

                        </View>
                        <View style={style.percentile}>
                            <Text style={style.percentileText}>
                                {kotuState}%
                            </Text>
                        </View>
                    </View>
                    <View style={style.iconBox}>
                        <Fontisto name='heart-eyes' size={44} />
                        <View style={style.emojiTextBox}>
                            <Text style={style.emojiText}>
                                SEVGİ
                            </Text>
                        </View>
                        <View style={style.percentile}>
                            <Text style={style.percentileText}>
                                {sevgiState}%
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
    )
}

export default Analysis

const styles = (theme) => StyleSheet.create({
    analysis: {
        height: height * 0.24,
        justifyContent: "center",
    },
    percentileTitleBox: {
        width: width * 1,
        height: height * 0.08,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    percentileTitleText: {
        fontFamily: 'LeagueSpartan-SemiBold',
        letterSpacing: 1.5,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        color: theme
    },
    emojiBox: {
        flexDirection: "row",
        justifyContent: "space-around",

    },
    iconBox: {
        alignItems: "center"
    },
    emojiTextBox: {
        marginTop: 3
    },
    emojiText: {
        fontFamily: "LeagueSpartan-ExtraBold",
        fontSize: 16

    },
    percentile: {
        paddingTop: 3,

    },
    percentileText: {
        fontFamily: 'LeagueSpartan-Medium'

    }
})