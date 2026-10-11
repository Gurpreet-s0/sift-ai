import { io } from 'socket.io-client'

export function initSocket() {
    const socket = io(import.meta.env.VITE_BACKEND_URL,
        {
            withCredentials: true
        })

    socket.on("connect", () => {
        console.log("Connected with: ", socket.id)
    })
}