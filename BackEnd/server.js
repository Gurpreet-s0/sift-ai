import "dotenv/config";
import app from "./src/app.js";
import connectedToDb from "./src/config/database.js";
import { initSocketServer } from "./src/Sockets/server.socket.js";
import http from 'http'
// test()
const httpServer = http.createServer(app)
initSocketServer(httpServer)
connectedToDb()
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});