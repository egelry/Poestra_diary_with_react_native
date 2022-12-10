import { SET_THEME } from "../actios/themeAction";

const initialState = {
    theme: '',

}

const themeReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_THEME:
        return{...state, theme : actions.payload}
        
        default:
            return state
    }
}

export default themeReducer