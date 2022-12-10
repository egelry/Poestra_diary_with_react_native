export const SET_PASSWORD = "SET_PASSWORD"

export const setUserPassword = (password) => (dispatch)=> {
    dispatch({
        type:SET_PASSWORD,
        payload:password
    })
}

