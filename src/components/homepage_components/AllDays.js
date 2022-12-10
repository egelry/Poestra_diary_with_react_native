import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Calendar from './allday_components/Calendar'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'


const { height, width } = Dimensions.get("window");

const AllDays = ({ navigation }) => {
  const { theme } = useSelector((state) => state.themeReducer)
  let themeColor = theme === "pink" ? "#d2397e" : "#385A8C"
  const style = styles()

  return (
    <View style={style.allDays}>

      <View style={style.allDaysBox}>
        <View style={style.selectDay}>
          <Feather name='book' size={19} color="black" />
          <Text style={styles(themeColor).selectDayText}>
            BELİRLİ BİR GÜN SEÇ
          </Text>
          <Feather name='book' size={19} color="black" />
        </View>
      </View>

      <View style={style.calendar}>
        <View style={style.verticalDivider} />
        <Calendar navigation={navigation} />
        <View style={style.verticalDivider} />
      </View>

    </View>

  )
}

export default AllDays

const styles = (theme) => StyleSheet.create({
  allDays: {
    height: height * 0.46,
  },
  allDaysBox: {
    alignItems: "center",
  },
  selectDay: {
    height: height * 0.06,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.95
  },
  selectDayText: {
    fontFamily: 'LeagueSpartan-SemiBold',
    letterSpacing: 1.8,
    color: theme,
    textDecorationLine: 'underline',
    margin: 10
  },
  calendar: {
    flexDirection: "row",
    width: width * 1,
    justifyContent: "space-evenly",
  },
  verticalDivider: {
    height: height * 0.35,
    width: 1.2,
    backgroundColor: "black"
  },
})