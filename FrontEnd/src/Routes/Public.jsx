import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
const Public = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth)

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Public