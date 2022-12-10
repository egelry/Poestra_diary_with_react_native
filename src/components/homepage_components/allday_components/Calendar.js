import { StyleSheet, Text, View, Dimensions, ToastAndroid } from 'react-native'
import React from 'react'

import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';

import moment from 'moment'
import 'moment/locale/tr'

import dateReducer from '../../../../redux/reducers/dateReducer';
import { useSelector, useDispatch } from 'react-redux'

import _DB from '../../../acts/db_acts/db_creation';


const { height, width } = Dimensions.get("window");



const Calendar = ({ navigation }) => {

    //
    const { date } = useSelector((state) => state.dateReducer)
    console.log(date)


    //date localde indirdiği zaman tutulucak ve calendar'ın minDate özelliği olarak belirlenecek
    //maxDate içerisinde bulunduğu gün olucak
    const now = new Date()

    // there is a click transaction on calendar
    const onDateChanged = (d) => {
        _DB.transaction((tx) => {
            tx.executeSql("SELECT * FROM poestra WHERE DATE=?", [d.format('DD/MM/YYYY')],
                (tx, result) => {

                    //day was created
                    if (result.rows.item(0) !== undefined) {
                        navigation.navigate('DayContent',
                            {
                                dateprmt: result.rows.item(0)["DATE"],
                                titleprmt: result.rows.item(0)["TITLE"],
                                contentprmt: result.rows.item(0)["CONTENT"],
                                senseprmt: result.rows.item(0)["SENSE"],
                                savedprmt: result.rows.item(0)["SAVED"],
                            })
                    }


                    //day undefined(result.rows.item(0) returns undefined)
                    else {
                        ToastAndroid.showWithGravity(
                            "Gün İçeriği Bulunamadı",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }


                })

        })
    }


    return (
        <View style={styles.calendar}>
            <CalendarPicker
                nextTitle="Sonraki"
                previousTitle="Önceki"
                weekdays={['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Pzr']}
                months={['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']}
                textStyle={{
                    fontFamily: 'LeagueSpartan-Medium',
                    color: "black"
                }}
                selectedDayColor="white"
                todayBackgroundColor="white"
                width={350}
                selectMonthTitle="Ay Seç - "
                selectYearTitle="Yıl Seç"
                dayShape="square"
                //minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)}
                minDate={date}
                maxDate={new Date()}
                onDateChange={(d) => {

                    onDateChanged(d)

                }}

            />
        </View>
    )
}

export default Calendar

const styles = StyleSheet.create({
    calendar: {
        height: height * 0.12,





    }
})
