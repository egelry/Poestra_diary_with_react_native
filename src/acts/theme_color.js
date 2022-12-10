import { useSelector} from 'react-redux'

const THEME_COLOR = () => {
    const { theme } = useSelector((state) => state.themeReducer)
    let color = theme === "pink" ? "#d2397e" : "#385A8C"
    return color
}

export default THEME_COLOR