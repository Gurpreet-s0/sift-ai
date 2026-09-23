import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Protected = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth)

    if(loading){
        return <Loading/>
    }

    if(!user){
        return <Navigate to="/login" replace />
    }
    console.log(user)

    return children
}

export default Protected
