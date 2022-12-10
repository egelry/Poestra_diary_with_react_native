import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import _DB from '../../acts/db_acts/db_creation';
import { useSelector } from 'react-redux'
import moment from 'moment';

//responsive design
const { height, width } = Dimensions.get("window");
const BottomBar = ({ navigation }) => {

  //redux-persist
  const { theme } = useSelector((state) => state.themeReducer)
  let themeColor = theme === "pink" ? "#d2397e" : "#385A8C"
  const style = styles()

  //date
  let date = moment().format('DD/MM/YYYY');


  return (
    <View style={style.bottomBar}>
      <View style={style.bottomBarBox}>
        <View style={style.iconBoxLeftAndRight}>
          <TouchableOpacity
            style={style.button}
            onPress={() => {

            /*navigation.navigate('DayContent',
                {
                  dateprmt: "14/07/2022",
                  titleprmt: "AA",
                  contentprmt: "BB",
                  senseprmt: "MUTLU",
                  savedprmt: 1,
                }) */

              /* _DB.transaction((tx) => {
                tx.executeSql("INSERT INTO poestra(DATE, TITLE, CONTENT, SENSE, SAVED) VALUES(?,?,?,?,?)",
                  ["18/07/2022", "13 temmuz title", "13 temmuz content", "MUTLU", 0],
                  (tx, result) => {
                    console.log('tx : ' + tx)
                    console.log('result : ' + result)
                  })
              })  */
           /* _DB.transaction((tx) => {
               tx.executeSql("DELETE FROM poestra WHERE DATE=(?)", ["18/07/2022"],
                 (tx, result) => {
                   console.log(result.rows.item(0))
                 })
             })   */ 
            }}
          >

            <Feather name='home' size={25} color={themeColor} />
          </TouchableOpacity>
        </View>
        <View style={style.iconBoxCenter}>
          <TouchableOpacity
            style={style.button}
            onPress={() => {

              // poestra button onpress
              _DB.transaction((tx) => {
                tx.executeSql("SELECT * FROM poestra WHERE DATE=(?)", [date],
                  (tx, result) => {

                    //if today is not created => go create today
                    if (result.rows.item(0) === undefined) {
                      navigation.navigate("CreateDayPage");

                    }

                    //if today is created => go show today
                    else {
                      navigation.navigate('DayContent',
                        {
                          dateprmt: result.rows.item(0)["DATE"],
                          titleprmt: result.rows.item(0)["TITLE"],
                          contentprmt: result.rows.item(0)["CONTENT"],
                          senseprmt: result.rows.item(0)["SENSE"],
                          savedprmt: result.rows.item(0)["SAVED"],
                        })
                    }
                  })
              })
            }}
          >
            <View style={styles(themeColor).poestraBox}>


              <Text style={styles(themeColor).poestraText}>P</Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={style.iconBoxLeftAndRight}>
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              navigation.navigate("ProfilePage");
            }}
          >
            <Feather name='user' size={25} color={themeColor} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default BottomBar

const styles = (themeColor) => StyleSheet.create({
  bottomBar: {
    height: height * 0.085,
    width: width * 1,

  },
  bottomBarBox: {
    flexDirection: "row",
    width: width * 1,

  },
  iconBoxLeftAndRight: {
    width: width * 0.33,
    height: height * 0.085,
    alignItems: "center",
    justifyContent: "center"
  },
  iconBoxCenter: {
    width: width * 0.34,
    alignItems: "center",

  },
  poestraBox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: themeColor,
    width: 44,
    height: 44,
    borderRadius: 44 / 2
  },
  poestraText: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Black',
    color: themeColor
  }
})

/*
 */