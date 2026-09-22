import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})

export async function register({username,email,password}) {
    try{
        const res = await api.post('/api/auth/register',{username,email,password})
        return res.data
    }
    catch(error){
        console.log(error);
    }
}

export async function login({email,password}) {
    try{
        const res = await api.post('/api/auth/login',{email,password})
        return res.data
    }
    catch(error){
        console.log(error);
    }
}

export async function getme() {
    try{
        const res = await api.get('/api/auth/getme')
        return res.data
    }
    catch(error){
        console.log(error);
    }
}