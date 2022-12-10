import { SET_PASSWORD } from "../actios/passwordAction";

const initialState = {
    password: '',
}

const passwordReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_PASSWORD:
        return{...state, password : actions.payload}
        

        default:
            return state
    }
}

export default passwordReducer