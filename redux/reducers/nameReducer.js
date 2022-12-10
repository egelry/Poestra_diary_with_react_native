import { SET_NAME, SET_SURNAME } from "../actios/nameActions";

const initialState = {
    name: '',
    surname : ''
}

const nameReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_NAME:
        return{...state, name : actions.payload}
        
        case SET_SURNAME:
        return{...state, surname : actions.payload}

        default:
            return state
    }
}

export default nameReducer