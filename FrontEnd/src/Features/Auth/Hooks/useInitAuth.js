import { useEffect } from "react"
import useAuth from "./useAuth"

export default function useInitAuth() {
    const { getmeHandler } = useAuth()
    useEffect(() => {
        getmeHandler()
    }, [])
}

