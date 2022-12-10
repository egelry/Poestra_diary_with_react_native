export const SET_THEME = "SET_THEME"

export const setTheme = (theme) => (dispatch)=> {
    dispatch({
        type:SET_THEME,
        payload:theme
    })
}

