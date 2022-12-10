import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

const { height, width } = Dimensions.get("window");

let date = moment().format('DD/MM/YYYY');;

const AppBar = ({ navigation }) => {
  return (
    <View style={styles.appBar}>
      <View style={styles.appBarBox}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("HomePage");
          }}> 
          <View style={styles.popBox}>
            <Feather name="arrow-left" size={25} color="black"/>
          </View>
        </TouchableOpacity>

        <View style={styles.dateAndIconBox}>
          <View style={styles.iconBox}>
            <FontAwesome name='calendar-o' size={15} color='black' />
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.todayText}>
              BUGÜN
            </Text>
            <Text style={styles.dateText}>
              {date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AppBar

const styles = StyleSheet.create({
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
  dateAndIconBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox: {
    justifyContent: "flex-end",
    paddingBottom: 5,
    paddingRight: 4,
    marginRight: 5
  },
  dateBox: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",

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
})