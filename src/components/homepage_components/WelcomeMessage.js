import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import moment from 'moment'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'


const { height, width } = Dimensions.get("window");

const WelcomeMessage = () => {
    
    const { name } = useSelector((state) => state.nameReducer)
    const { theme } = useSelector((state) => state.themeReducer)
    let themeColor = theme === "pink" ? "#d2397e" : "#385A8C"

    let date = moment().format('DD/MM/YYYY');
    const style = styles()
    return (
        <View style={style.welcomeMessage}>
            <View style={style.messageAndDateBox}>
                <View style={style.welcomeMessageBox}>
                    <Text style={styles(themeColor).welcomeMessageText}>İyi Günler, </Text>
                    <Text style={styles(themeColor).nameText}>{name}</Text>
                    <View style={{ marginLeft: 10 }}>
                        <Fontisto name='heart' size={20} color="red" />

                    </View>
                </View>
                <View style={style.dateAndIconBox} >
                    <View style={style.iconBox}>
                        <FontAwesome name='calendar-o' size={15} color='black' />
                    </View>
                    <View style={style.dateBox}>
                        <Text style={style.todayText}>
                            BUGÜN
                        </Text>

                        <Text style={style.dateText}>
                            {date}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WelcomeMessage

const styles = (themeColor) => StyleSheet.create({
    welcomeMessage: {
        height: (height * 0.045) - 0.5,
        width: width * 1,
        alignItems: "center",
    },
    welcomeMessageBox: {
        height: height * 0.05,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"

    },
    messageAndDateBox: {
        width: width * 0.95,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    welcomeMessageText: {
        fontFamily: 'LeagueSpartan-ExtraBold',
        letterSpacing: 1.2,
        fontSize: 20,
        color: themeColor

    },
    nameText: {
        color: themeColor,
        fontFamily: 'LeagueSpartan-ExtraBold',
        letterSpacing: 1.2,
        fontSize: 20,
        textDecorationLine: 'underline'
    },

    dateBox: {
        height: height * 0.05,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    todayText: {
        fontSize: 12,
        fontFamily: "LeagueSpartan-ExtraBold"
    },
    dateText: {
        marginBottom: 3,
        fontFamily: 'LeagueSpartan-Medium',
        fontSize: 16,

    },
    dateAndIconBox: {
        flexDirection: "row",
    },
    iconBox: {
        justifyContent: "flex-end",
        paddingBottom: 5,
        paddingRight: 4
    }
})