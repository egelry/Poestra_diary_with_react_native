import { useSelector} from 'react-redux'

const NAME_SURNAME = () => {
    const { name, surname } = useSelector((state) => state.nameReducer)
    return {name,surname}
}

export default NAME_SURNAME