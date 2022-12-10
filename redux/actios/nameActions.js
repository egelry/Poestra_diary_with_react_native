export const SET_NAME = "SET_NAME"
export const SET_SURNAME = "SET_SURNAME"

export const setUserName = (name) => (dispatch)=> {
    dispatch({
        type:SET_NAME,
        payload:name
    })
}

export const setUserSurName = (surname) => (dispatch)=> {
    dispatch({
        type:SET_SURNAME,
        payload:surname
    })
}