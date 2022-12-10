import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable

} from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import THEME_COLOR from '../../acts/theme_color'
import Divider from './Divider'
import _DB from '../../acts/db_acts/db_creation'
import moment from 'moment'

const { height, width } = Dimensions.get("window");

function saveInputs(dayTopic, dayContent, daySense) {

    let dayDate = moment().format('DD/MM/YYYY');;
    _DB.transaction((tx) => {
        tx.executeSql("INSERT INTO poestra(DATE, TITLE, CONTENT, SENSE, SAVED) VALUES(?,?,?,?,?)",
            [dayDate, dayTopic, dayContent, daySense, 0],
            (tx, result) => {
                console.log('result : ' + result)
            })
    })

}


const DayContent = ({ navigation }) => {

    //state hooks
    const [dayContent, setDayContent] = useState("");
    const [dayTopic, setDayTopic] = useState("")
    const [emoji, setEmoji] = useState("")
    const [buttonEnabled, setButtonEnabled] = useState(false)

    useEffect(() => {
        if (dayTopic !== "" && dayContent !== "" && emoji !== "") {
            setButtonEnabled(true)

        }
        else{
            setButtonEnabled(false)
            
        }
    }, [buttonEnabled, dayTopic, dayContent, emoji])

    //redux-persist
    let theme_color = THEME_COLOR()
    const style = styles()
    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ flex: 1 }} behaviour='padding'>
                <SafeAreaView >
                    <View>
                        <View>
                            <View style={style.daySummary}>
                                <View style={style.daySummaryBox}>
                                    <View style={style.daySummaryTextBox}>
                                        <Text style={styles(theme_color).daySummaryText}>
                                            Bugün Ne Hissettin?
                                        </Text>

                                    </View>
                                    <View style={style.emojiSelectBox}>
                                        <TouchableOpacity
                                            style={style.button}
                                            onPress={() => {
                                                setEmoji("MUTLU")
                                            }}
                                        >
                                            <View style={style.iconBox}>
                                                <Fontisto name='slightly-smile' size={44}
                                                    color={emoji == "MUTLU" ? "#e0dede" : "black"} />
                                                <View style={style.emojiTextBox}>
                                                    <Text style={emoji == "MUTLU" ? style.selectedEmojiText : style.emojiText}>
                                                        MUTLU
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setEmoji("ÖFKE")
                                            }}
                                        >
                                            <View style={style.iconBox}>
                                                <Fontisto name='rage' size={44}
                                                    color={emoji == "ÖFKE" ? "#e0dede" : "black"} />
                                                <View style={style.emojiTextBox}>
                                                    <Text style={emoji == "ÖFKE" ? style.selectedEmojiText : style.emojiText}>
                                                        ÖFKE
                                                    </Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            onPress={() => {
                                                setEmoji("KÖTÜ")

                                            }}
                                        >

                                            <View style={style.iconBox}>
                                                <Fontisto name='confused' size={44}
                                                    color={emoji == "KÖTÜ" ? "#e0dede" : "black"} />
                                                <View style={style.emojiTextBox}>
                                                    <Text style={emoji == "KÖTÜ" ? style.selectedEmojiText : style.emojiText}>
                                                        KÖTÜ
                                                    </Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setEmoji("SEVGİ")


                                            }}
                                        >
                                            <View style={style.iconBox}>
                                                <Fontisto name='heart-eyes' size={44}
                                                    color={emoji == "SEVGİ" ? "#e0dede" : "black"} />
                                                <View style={style.emojiTextBox}>
                                                    <Text style={emoji == "SEVGİ" ? style.selectedEmojiText : style.emojiText}>
                                                        SEVGİ
                                                    </Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                            <Divider />

                            <View style={style.dayTopic}>
                                <View style={style.dayTopicBox}>
                                    <View style={style.topicTextBox}>
                                        <View style={style.topicTextBox2}>
                                            <Text style={styles(theme_color).topicText}>
                                                Bugün Neler Yaptın

                                            </Text>
                                            <View style={style.iconBoxSun}>
                                                <Feather name='sun' size={24} color="orange" />
                                            </View>
                                        </View>

                                        <Pressable
                                            onPress={() => {

                                                saveInputs(dayTopic, dayContent, emoji)
                                                navigation.navigate("HomePage")


                                            }}
                                            disabled={!buttonEnabled}
                                        >
                                            <View style={buttonEnabled ? styles(theme_color).saveBox : styles(theme_color).disabledSaveBox}>
                                                <Text style={buttonEnabled ? styles(theme_color).saveText : styles(theme_color).disabledSaveText }>Kaydet</Text>
                                            </View>
                                        </Pressable >

                                    </View>
                                    <View>
                                        <TextInput
                                            style={style.topicInput}
                                            placeholder="Başlık"
                                            maxLength={35}
                                            onChangeText={(text) => {
                                                setDayTopic(text)
                                                console.log("Day Topic : " + text)
                                            }}
                                        />
                                    </View>
                                </View>

                            </View>
                            {/* Day Content  */}
                            <View style={style.dayContent}>
                                <View style={style.dayContentBox}>
                                    <TextInput
                                        multiline
                                        style={style.contentInput}
                                        numberOfLines={40}
                                        placeholder="Bugün..."
                                        onChangeText={(text) => {
                                            setDayContent(text)
                                            console.log("Day Content : " + text)
                                        }}
                                    />

                                </View>
                            </View>
                        </View>
                    </View >

                </SafeAreaView>
            </KeyboardAvoidingView>

        </ScrollView>
    )
}

export default DayContent

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    daySummary: {
        marginBottom: 10
    },

    emojiSelectBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: height * 0.1
    },
    daySummaryText: {
        fontFamily: 'LeagueSpartan-SemiBold',
        letterSpacing: 2,
        fontSize: 24,
        margin: 10,
        color: theme
    },
    daySummaryTextBox: {
        height: height * 0.08,
        width: width * .9,
        alignSelf: "center",
    },

    iconBox: {
        alignItems: "center"
    },
    emojiTextBox: {
        marginTop: 3
    },
    emojiText: {
        fontFamily: "LeagueSpartan-ExtraBold",
        color: "black",
        fontSize: 16

    },
    selectedEmojiText: {
        fontFamily: "LeagueSpartan-ExtraBold",
        color: "#e0dede",
        fontSize: 16

    },
    dayTopic: {
        marginTop: 10,

    },
    dayTopicBox: {
        alignItems: "center",

    },
    topicTextBox: {
        height: height * 0.06,
        width: width * .94,
        alignItems: "center",
        flexDirection: "row",

    },
    topicTextBox2: {
        height: height * 0.06,
        width: width * .74,
        alignItems: "center",
        flexDirection: "row",
    },
    topicText: {
        fontFamily: 'LeagueSpartan-SemiBold',
        letterSpacing: 2,
        fontSize: 22,
        color: theme
    },
    iconBoxSun: {
        marginTop: 6,
        marginLeft: 10,
        height: height * .06,
        justifyContent: "center"
    },
    topicInput: {
        height: 40,
        width: width * .92,
        padding: 10,
        fontFamily: "LeagueSpartan-Medium",
        letterSpacing: 1.3,
        fontSize: 20,
    },
    saveBox: {
        borderWidth: 1,
        borderColor: theme,
        borderRadius: 10,
        width: width * 0.2,
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.04,
        marginTop: 4


    },
    saveText: {
        fontFamily: "LeagueSpartan-SemiBold",
        color: theme

    },
    disabledSaveBox: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        width: width * 0.2,
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.04,
        marginTop: 4


    },
    disabledSaveText: {
        fontFamily: "LeagueSpartan-SemiBold",

    },
    dayContent: {
        marginTop: 10
    },
    dayContentBox: {
        alignItems: "center"
    },
    contentInput: {
        width: width * .92,
        padding: 10,
        fontFamily: "LeagueSpartan-Medium",
        letterSpacing: 1.3,
        textAlignVertical: 'top',
        fontSize: 16,
    },
})