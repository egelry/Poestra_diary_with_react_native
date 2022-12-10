export const SET_DATE = "SET_DATE"

export const setAppDate = (date) => (dispatch)=> {
    dispatch({
        type:SET_DATE,
        payload:date
    })
}

