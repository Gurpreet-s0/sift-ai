import {Server} from 'socket.io'

let io;
export function initSocketServer (httpServer){
    io = new Server(httpServer,{
        cors:{
            origin: process.env.FRONTEND_URL,
            credentials:true
        }
    })

    io.on("connection",(socket)=>{
        console.log("Connected with: ", socket.id)
    })
}