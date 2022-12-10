import { Dimensions, StyleSheet, View, BackHandler, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppBar from '../components/homepage_components/AppBar'
import WelcomeMessage from '../components/homepage_components/WelcomeMessage';
import Divider from '../components/homepage_components/Divider';
import AllDays from '../components/homepage_components/AllDays';
import Analysis from '../components/homepage_components/Analysis';
import BottomBar from '../components/homepage_components/BottomBar';
import _DB from '../acts/db_acts/db_creation';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get("window");

const HomePage = ({ navigation }) => {

    // on homepage pressedback action => exit 
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                BackHandler.exitApp();
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );


    return (
        <View style={styles.AndroidSafeArea}>


            <View style={styles.homePage}>
                <AppBar />
                <WelcomeMessage />
                <Analysis />
                <Divider />
                <AllDays navigation={navigation} />
                <BottomBar navigation={navigation} />
            </View>
        </View >
    )
}


const styles = StyleSheet.create({

    AndroidSafeArea: { // safe are for android notch devices
        flex: 1,
        /*  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 */
    },
    homePage: {
        height: height * 1,
        backgroundColor: "white"
    },



})


export default HomePage






















