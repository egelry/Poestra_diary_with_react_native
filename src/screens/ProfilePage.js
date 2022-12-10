import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import AppBar from '../components/profilepage_components/AppBar';
import HeaderContent from "../components/profilepage_components/HeaderContent";
import Analysis from "../components/profilepage_components/Analysis";
import Saved from '../components/profilepage_components/Saved';

const { height, width } = Dimensions.get("window");

const ProfilePage = ({ navigation }) => {
  return (
    <View style={styles.profilePage}>
      <AppBar navigation={navigation} />
      <HeaderContent />
      <Analysis />
      <Saved navigation={navigation} />
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  profilePage: {
    height: height * 1,
    backgroundColor: "white"
  }
})