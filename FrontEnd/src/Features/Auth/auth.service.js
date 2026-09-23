import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export async function register({ username, email, password }) {
    try {
        const res = await api.post('/api/auth/register', { username, email, password })
        return res.data
    }
    catch (error) {
        throw new Error(
            error.response?.data?.message || 'Registration failed. Please try again.'
        )
    }
}

export async function login({ email, password }) {
    try {
        const res = await api.post('/api/auth/login', { email, password })

        if (!res.data?.success) {
            throw new Error(res.data?.message || 'Invalid email or password.')
        }

        return res.data
    }
    catch (error) {
        throw new Error(
            error.response?.data?.message || 'Invalid credentials. Please check your email and password.'
        )
    }
}

export async function getme() {
    try {
        const res = await api.get('/api/auth/getme')
        return res.data
    }
    catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to retrieve user information. Please try again.'
        )
    }
}
