import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import _DB from '../acts/db_acts/db_creation'
import CreateDayPage from './CreateDayPage'
import DayContent from './DayContent'
import Feather from 'react-native-vector-icons/Feather'
import HomePage from './HomePage'


const DayRouter = ({ navigation }) => {

  // state-hook
  // if day created => true
  // if day not created=> false
  // default => false
  const [routeVal, setRouteVal] = useState(false)

  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sense, setSense] = useState("")
  const [saved, setSaved] = useState(0)

  useEffect(() => {
    let date = moment().format('DD/MM/YYYY');


    setRouteVal(true)
    console.log("route val : " + routeVal)

    _DB.transaction(async (tx) => {
      tx.executeSql("SELECT * FROM poestra WHERE DATE=?", [date],
        (tx, result) => {

          let item = result.rows.item(0);
          if (item !== undefined) {
            console.log("AAA")


            setDate(date)
            setTitle(item["TITLE"])
            setContent(item["CONTENT"])
            setSense(item["SENSE"])
            setSaved(item["SAVED"])
            setSaved
            navigation.navigate('DayContent',
              {
                dateprmt: date,
                titleprmt: title,
                contentprmt: content,
                senseprmt: sense,
                savedprmt: saved,
              })

          }
          else {

            navigation.navigate('CreateDayPage')
          }
        })

    })
    console.log("--------------------------------------------------------------------------------")
  }, [date, title, content, sense, saved, routeVal, date])


  return (

    routeVal ? <HomePage navigation={navigation}/> : <SafeAreaView style={styles.dayRouter}>


      <Feather name='loader' size={25} color='black' />


    </SafeAreaView>


  )
}

export default DayRouter

const styles = StyleSheet.create({
  dayRouter: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
})