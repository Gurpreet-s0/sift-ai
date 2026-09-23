import { register, login, getme } from "../auth.service"
import { setUser, setloading, setError } from "../auth.slice"
import { useDispatch } from "react-redux"

export default function useAuth() {
    const dispatch = useDispatch()

    async function registerHandler({username,email,password}){
        try{
            dispatch(setloading(true))
            const data = await register({username,email,password})
            dispatch(setUser(data))
        }
        catch(err){
            dispatch(setError(err.message))
        }
        finally{
            dispatch(setloading(false))
        }
    }

    async function loginHandler({email,password}){
        try{
            dispatch(setloading(true))
            dispatch(setError(null))
            const data = await login({email,password})
            dispatch(setUser(data))
            return data
        }
        catch(err){
            dispatch(setError(err.message))
            throw err
        }
        finally{
            dispatch(setloading(false))
        }
    }

    async function getmeHandler(){
        try{
            dispatch(setloading(true))
            const data = await getme()
            dispatch(setUser(data))
        }
        // catch(err){
        //     dispatch(setError(err.message))
        //     throw err
        // }
        finally{
            dispatch(setloading(false))
        }
    }

    return {registerHandler,loginHandler,getmeHandler}
}
