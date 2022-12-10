import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get("window");

const Divider = () => {
    return (
        <View style={styles.dividerBox}>
            <View style={styles.divider} />
        </View>
    )
}

export default Divider

const styles = StyleSheet.create({
    dividerBox: {
        height: height * 0.005,
        width: width * 1,
        alignItems: "center",
        justifyContent: "center",

    },
    divider: {
        height: 0.5,
        width: width * 0.92,
        backgroundColor: "#808080",

    }
})