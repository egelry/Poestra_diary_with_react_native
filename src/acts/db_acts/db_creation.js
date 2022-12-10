import sqlite from 'react-native-sqlite-storage'

const _DB = sqlite.openDatabase({
    location: "default",
    name: "PoestraDB"
}, () => {
    console.log('Ok')
}, (err) => {
    console.log('Err.: ' + err)
})

export default _DB










