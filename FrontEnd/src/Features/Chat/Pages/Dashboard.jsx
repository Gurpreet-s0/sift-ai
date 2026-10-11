import React from 'react'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
    const { initSocket } = useChat()

    initSocket()

    return (
        <h1>Welcome to Sift Ai</h1>
    )
}

export default Dashboard