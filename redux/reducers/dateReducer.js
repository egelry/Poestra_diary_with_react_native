import { SET_DATE } from "../actios/dateAction";

const initialState = {
    date: '',
}

const dateReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_DATE:
            return { ...state, date: actions.payload }

        default:
            return state
    }
}

export default dateReducer