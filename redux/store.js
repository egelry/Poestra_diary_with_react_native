import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import themeReducer from './reducers/themeReducer'
import nameReducer from './reducers/nameReducer'
import dateReducer from './reducers/dateReducer';
import passwordReducer from './reducers/passwordReducer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const primary = {
    key: 'rootOne',
    storage: AsyncStorage,
    whitelist: [
        'name',
    ],
};


const secondary = {
    key: 'rootTwo',
    storage: AsyncStorage,
    whitelist: [
        'theme',
    ],
};

const tertiary = {
    key: 'rootThree',
    storage: AsyncStorage,
    whitelist: [
        'date',
    ],
};

const quaternary = {
    key: 'routFour',
    storage: AsyncStorage,
    whitelist: [
        'password',
    ],
};


const rootReducer = combineReducers({
    nameReducer: persistReducer(primary, nameReducer),
    themeReducer: persistReducer(secondary, themeReducer),
    dateReducer: persistReducer(tertiary, dateReducer),
    passwordReducer: persistReducer(quaternary, passwordReducer),
})


export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);