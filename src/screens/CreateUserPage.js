import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../redux/actios/themeAction';
import { setUserName, setUserSurName } from '../../redux/actios/nameActions'
import { setAppDate } from '../../redux/actios/dateAction';
import { setUserPassword } from '../../redux/actios/passwordAction';
import _DB from '../acts/db_acts/db_creation';

//responsive design
const { height, width } = Dimensions.get("window");

const CreateUserPage = ({ navigation }) => {

  // redux-persist
  const dispatch = useDispatch()

  // redux-persist funcs
  const _setThemeColor = async (themeColor) => {
    dispatch(setTheme(themeColor))
  }
  const _setUName = async (name) => {
    dispatch(setUserName(name))
  }
  const _setUSName = async (surname) => {
    dispatch(setUserSurName(surname))
  }
  const _setDate = async () => {
    let date = new Date();
    dispatch(setAppDate(date))
  }
  const _setPassword = async (pass) => {
    dispatch(setUserPassword(pass.toString()))
  }



  // state hooks
  const [stateName, setStateName] = useState("")
  const [surName, setSurName] = useState("")
  const [password, setPassword] = useState("")
  const [color, setColor] = useState("")
  const [buttonEnabled, setButtonEnabled] = useState(false)

  //SQLite transactions
  useEffect(() => {

    // create table transaction
    _DB.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS poestra(ID INTEGER PRIMARY KEY AUTOINCREMENT , DATE VARCHAR(12), TITLE VARCHAR(100), CONTENT VARCHAR(600), SENSE VARCHAR(30), SAVED INT(3)) ",
        [],
        (tx, result) => {
          console.log('tx : ' + tx)
          console.log('result : ' + result)
        })
    })

    // button enabled
    if (color !== "" && stateName !== "" && surName !== "" && password.length === 4) {
      setButtonEnabled(true)

    }
    else {
      setButtonEnabled(false)

    }

  }, [color, stateName, surName, password])





  return (
    <SafeAreaView style={styles.createUserPage}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>
          POESTRA
        </Text>
        <Text style={styles.appBarSubText}>
          günlük uygulaması
        </Text>
      </View>
      <View style={styles.mainContent}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.nameSurnameTextBox}>
            <View>
              <Text style={styles.text}>
                adını gir
              </Text>
            </View>
            <TextInput
              style={styles.nameSurnameInput}
              placeholder="ad"
              placeholderTextColor="grey"
              maxLength={17}
              onChangeText={(text) => {
                setStateName(text)

              }}
            />
          </View>
          <View>
            <View style={styles.nameSurnameTextBox}>
              <Text style={styles.text}>
                soyadını girin
              </Text>
            </View>
            <TextInput
              style={styles.nameSurnameInput}
              placeholder="soyad"
              placeholderTextColor="grey"

              maxLength={17}
              onChangeText={(text) => {
                setSurName(text)

              }}
            />
          </View>

        </View>
        <View style={styles.textBox}>
          <Text style={styles.textOther}>
            dört haneli numerik parola belirle
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="parola"
          keyboardType='numeric'
          placeholderTextColor="grey"
          value={password}
          maxLength={4}
          secureTextEntry={true}
          returnKeyLabel="AAA"
          onChangeText={(text) => {
            //pass only can be num 
            // reg exp  : /[^0-9]/g
            const reg = new RegExp("^[0-9]+$")
            if (reg.test(text) || text === "") {
              console.log("num : " + parseInt(text))
              setPassword(text)

            }

          }}
        />
        <View style={styles.passTextBox}>
          <Text style={styles.passText}>
            parolanı unutman durumunda verilerine erişemeyeceksin*
          </Text>
        </View>
        <View style={styles.selectThemeTextBox}>
          <Text style={styles.text}>
            tema seçin
          </Text>
        </View>
        <View style={styles.selectTheme}>
          <TouchableOpacity
            onPress={() => {
              setColor("mavi")
            }}>
            {
              <View style={styles.containBlueBox}>
                <View style={color === "mavi" ? styles.selectedBlueThemeBox : styles.nonSelectedBlueThemeBox}>
                  <Text style={styles.colorText}>
                    kobalt mavi
                  </Text>
                </View>
              </View>

            }
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setColor("pembe")
            }}>
            {
              <View style={styles.containPinkBox}>
                <View style={color === "pembe" ? styles.selectedPinkThemeBox : styles.nonSelectedPinkThemeBox}>
                  <Text style={styles.colorText}>
                    thulian pembe
                  </Text>
                </View>
              </View>
            }
          </TouchableOpacity>

        </View>

        <View style={styles.saveButtonBox}>
          <Pressable
            onPress={async () => {
              await _setUName(stateName)
              await _setUSName(surName)
              await _setThemeColor(color)
              await _setPassword(password)
              await _setDate()
              await navigation.navigate("RouterPage")
            }}
            disabled={!buttonEnabled}
          >
            <View style={buttonEnabled ? styles.saveButton : styles.disabledSaveButtonBox}>
              <Text style={buttonEnabled ? styles.saveButtonText : styles.disabledSaveButtonText}>
                KAYDET
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

}

export default CreateUserPage





const styles = StyleSheet.create({
  createUserPage: {
    height: height * 1,
    backgroundColor: "white"
  },
  appBar: {
    height: height * .2,
    alignItems: "center",
    justifyContent: "center",
  },
  appBarText: {
    fontSize: 36,
    fontFamily: 'PlayfairDisplay-ExtraBold',
    color: "black"
  },
  appBarSubText: {
    fontFamily: 'LeagueSpartan-Medium',
    fontSize: 15,
    color: "grey"
  },
  mainContent: {
    height: height * 0.7,
  },
  textBox: {
    width: width * 0.92,
    alignSelf: "center",
    margin: 5
  },
  nameSurnameTextBox: {
    width: width * 0.46,
    alignSelf: "center",
    marginLeft: 5
  },
  text: {
    fontSize: 16,
    fontFamily: "LeagueSpartan-Medium",
  },
  textOther: {
    fontSize: 16,
    fontFamily: "LeagueSpartan-Medium",
    marginTop: 15
  },
  passTextBox: {
    width: width * 0.92,
    alignSelf: "center",
    marginLeft: 5
  },
  passText: {
    fontSize: 12,
    color: "grey",
    fontFamily: "LeagueSpartan-Medium"
  },
  input: {
    height: 40,
    width: width * .92,
    padding: 10,
    letterSpacing: 1.3,
    fontSize: 12,
    borderWidth: 0.7,
    alignSelf: "center",
    fontFamily: "LeagueSpartan-Medium",
  },
  nameSurnameInput: {
    height: 40,
    width: (width * (.46)) - 5,
    padding: 10,
    letterSpacing: 1.3,
    fontSize: 12,
    borderWidth: 0.7,
    alignSelf: "center",
    fontFamily: "LeagueSpartan-Medium"
  },
  selectThemeTextBox: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 5

  },
  selectTheme: {
    width: width * 0.92,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  containBlueBox: {
    height: height * 0.22,
    width: height * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "black"
  },
  nonSelectedBlueThemeBox: {
    height: height * 0.22,
    width: height * 0.22,
    backgroundColor: "#385A8C",
    alignItems: "center",
    justifyContent: "center"
  },
  selectedBlueThemeBox: {
    height: height * 0.2,
    width: height * 0.2,
    backgroundColor: "#385A8C",
    borderWidth: 1.4,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  containPinkBox: {
    height: height * 0.22,
    width: height * 0.22,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "black"
  },
  nonSelectedPinkThemeBox: {
    height: height * 0.22,
    width: height * 0.22,
    backgroundColor: "#d2397e",
    alignItems: "center",
    justifyContent: "center"
  },
  selectedPinkThemeBox: {
    height: height * 0.2,
    width: height * 0.2,
    backgroundColor: "#d2397e",
    borderWidth: 1.4,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  colorText: {
    color: "white",
    fontFamily: "LeagueSpartan-Medium",
    letterSpacing: 1.1
  },
  saveButtonBox: {
    marginTop: 30,
    height: 27,
    width: 90,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "black",
    justifyContent: "center",
    borderRadius: 2
  },

  saveButtonText: {
    fontFamily: "LeagueSpartan-Medium",
    fontSize: 12,
    letterSpacing: 1.3,
    color: "black"
  },
  disabledSaveButtonBox: {
    height: 27,
    width: 90,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#DCDCDC",
    justifyContent: "center",
    borderRadius: 2
  },

  disabledSaveButtonText: {
    fontFamily: "LeagueSpartan-Medium",
    fontSize: 12,
    letterSpacing: 1.3,
    color: '#DCDCDC'
  }

});










