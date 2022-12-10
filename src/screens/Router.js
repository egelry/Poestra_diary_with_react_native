import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomePage from './HomePage'
import CreateUserPage from './CreateUserPage'
import PasswordPage from './PasswordPage'

const RouterPage = ({ navigation }) => {

    const { name } = useSelector((state) => state.nameReducer)
    const { date } = useSelector((state) => state.dateReducer)
    const { theme } = useSelector((state) => state.themeReducer)
    const { password } = useSelector((state) => state.passwordReducer)

    console.log("name : " + name)
    console.log("date : " + date)
    console.log("theme : " + theme)
    console.log("password : " + password)


    if (name !== '') {
        return (
            <PasswordPage navigation={navigation} />
        )
    }
    else {
        return <CreateUserPage navigation={navigation} />
    }
}

export default RouterPage

const styles = StyleSheet.create({})