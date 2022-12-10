import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import AppBar from '../components/createdaypage_components/AppBar';
import Divider from '../components/createdaypage_components/Divider'
import DayContent from '../components/createdaypage_components/DayContent';

const { height, width } = Dimensions.get("window");

const CreateDayPage = ({navigation }) => {

    return (
        <View style={styles.createDayPage}>
            <AppBar navigation={navigation} />
            <DayContent navigation={navigation} />
        </View>
    )
}

export default CreateDayPage

const styles = StyleSheet.create({
    createDayPage: {
        flex: 1,
        height: height * 1,
        backgroundColor: "white"
    }
})