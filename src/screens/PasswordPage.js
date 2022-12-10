import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get("window");





const PasswordPage = ({ navigation }) => {

    const [pass, setPass] = useState("")
    const [dotValue, setDotValue] = useState(0)

    const { password } = useSelector((state) => state.passwordReducer)


    const BoxItem = ({ valOne, valTwo, valThree }) => {

        return (

            <View style={styles.keyboardRow}>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        if (pass.length < 4) {
                            setPass(pass + valOne)
                            setDotValue(dotValue + 1)

                        }
                    }}>
                    <View style={styles.keyboardRowBox}>
                        <Text style={styles.keyboardNumberText}>
                            {valOne}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        if (pass.length < 4) {
                            setPass(pass + valTwo)
                            setDotValue(dotValue + 1)

                        }

                    }}>
                    <View style={styles.keyboardRowBox}>
                        <Text style={styles.keyboardNumberText}>
                            {valTwo}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        if (pass.length < 4) {
                            setPass(pass + valThree)
                            setDotValue(dotValue + 1)

                        }

                    }}>
                    <View style={styles.keyboardRowBox}>
                        <Text style={styles.keyboardNumberText}>
                            {valThree}
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }



    return (
        <View style={styles.passwordPage}>
            <View style={styles.appBar}>
                <Text style={styles.appBarText}>
                    POESTRA
                </Text>
                <Text style={styles.appBarSubText}>
                    parola girin
                </Text>


            </View>
            <View style={styles.dotCircleBox}>
                <View style={dotValue > 0 ? styles.dotCircleFilled : styles.dotCircle} />
                <View style={dotValue > 1 ? styles.dotCircleFilled : styles.dotCircle} />
                <View style={dotValue > 2 ? styles.dotCircleFilled : styles.dotCircle} />
                <View style={dotValue > 3 ? styles.dotCircleFilled : styles.dotCircle} />

            </View>

            <View style={styles.keyboardBox}>
                <BoxItem valOne={1} valTwo={2} valThree={3} />
                <BoxItem valOne={4} valTwo={5} valThree={6} />
                <BoxItem valOne={7} valTwo={8} valThree={9} />
                <View style={styles.keyboardRow}>

                    <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => {
                            let str = pass
                            str = str.slice(0, -1);
                            setPass(str)
                            if (dotValue > 0) {
                                setDotValue(dotValue - 1)
                            }
                        }}>
                        <View style={styles.keyboardRowBox}>
                            <Feather name='delete' color='black' size={24} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => {
                            if (pass.length < 4) {
                                setPass(pass + "0")
                                setDotValue(dotValue + 1)

                            }

                        }}>
                        <View style={styles.keyboardRowBox}>
                            <Text style={styles.keyboardNumberText}>
                                0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => {
                            if (pass === password) {
                                navigation.navigate('HomePage')
                            }
                            else {
                                ToastAndroid.showWithGravity(
                                    "Yanlış Şifre",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            }
                        }}>
                        <View style={styles.keyboardRowBox}>
                            <Feather name='log-in' color='black' size={24} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default PasswordPage

const styles = StyleSheet.create({

    passwordPage: {
        height: height * 1,
        backgroundColor: "white",

    },
    appBar: {
        height: height * .2,
        alignItems: "center",
        justifyContent: "center",
    },
    appBarText: {
        fontSize: 36,
        fontFamily: 'PlayfairDisplay-ExtraBold',
        color: "black"
    },
    appBarSubText: {
        fontFamily: 'LeagueSpartan-Medium',
        fontSize: 18,
        letterSpacing: 1.3
    },
    dotCircleBox: {
        height: height * 0.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    dotCircle: {
        height: width * 0.18,
        width: width * 0.18,
        borderRadius: ((width * 0.2) / 2),
        borderColor: "black",
        borderWidth: 1
    },
    dotCircleFilled: {
        height: width * 0.18,
        width: width * 0.18,
        borderRadius: ((width * 0.2) / 2),
        borderWidth: 1,
        backgroundColor: "black"
    },
    keyboardBox: {
        height: height * 0.5,
    },
    keyboardRow: {
        height: height * .125,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    keyboardRowBox: {
        width: height * .11,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 0.7,
        height: height * .11,
        borderRadius: (height * .11) / 2,

    },
    keyboardNumberText: {
        color: "black",
        fontFamily: 'LeagueSpartan-SemiBold',
        fontSize: 28
    },


})